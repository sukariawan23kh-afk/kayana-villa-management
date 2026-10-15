import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";

/**
 * Chatbot endpoint — active 22:00–08:00 Asia/Makassar (WITA, UTC+8).
 *
 * Builds a context prompt from live DB data (villas, FAQs, settings) so the
 * LLM can answer questions about KAYANA's services, villas, pricing,
 * booking process, owner inquiries, etc.
 *
 * Body: { message: string, history?: Array<{role, content}>, lang?: "en"|"id" }
 */
export const runtime = "nodejs";
export const maxDuration = 30;

// Schedule: active 22:00–08:00 WITA (UTC+8).
const ACTIVE_START_HOUR = 22; // 10 PM
const ACTIVE_END_HOUR = 8; // 8 AM

/** Is the chatbot active right now (WITA)? */
function isChatbotActive(): boolean {
  // WITA = UTC+8. Compute the current hour in WITA.
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const wita = new Date(utcMs + 8 * 60 * 60 * 1000);
  const hour = wita.getHours();
  // Active from 22:00 (inclusive) through 08:00 (exclusive, next day).
  return hour >= ACTIVE_START_HOUR || hour < ACTIVE_END_HOUR;
}

/** Fetch live context from the DB to feed the LLM. */
async function buildContext(lang: "en" | "id"): Promise<string> {
  const [villas, faqs, settings] = await Promise.all([
    db.villa.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
    }),
    db.faq.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 13,
    }),
    db.siteSetting.findUnique({ where: { id: "default" } }),
  ]);

  const isId = lang === "id";

  const villaLines = villas
    .map((v) => {
      const desc = isId ? v.descriptionId || v.descriptionEn : v.descriptionEn;
      const price = v.pricePerNight
        ? `$${v.pricePerNight} ${v.currency}/night`
        : "Price on request";
      return `- ${v.name} (${v.location}, ${v.bedrooms} bedrooms, max ${v.maxGuests} guests, ${v.type}, ${price}): ${desc}`;
    })
    .join("\n");

  const faqLines = faqs
    .map((f) => {
      const q = isId ? f.questionId || f.questionEn : f.questionEn;
      const a = isId ? f.answerId || f.answerEn : f.answerEn;
      return `Q: ${q}\nA: ${a}`;
    })
    .join("\n\n");

  const contact = settings
    ? `WhatsApp: ${settings.whatsappDisplay} (${settings.whatsappNumber})\nEmail: ${settings.email}\nLocation: ${settings.location}`
    : "Contact details: see the website contact section.";

  return `KAYANA Villa Management — Bali. Professional villa management company.
Services: revenue & reservation management (Airbnb, Booking.com, Agoda), guest experience, housekeeping & quality control, maintenance & property care, marketing & distribution, owner reporting & financial control.
Management packages: Essential, Professional, Full.
Contact: ${contact}

VILLAS IN PORTFOLIO:
${villaLines || "No villas currently listed."}

FREQUENTLY ASKED QUESTIONS:
${faqLines || "No FAQs available."}

BOOKING PROCESS: Guests browse the Portfolio, click "Book Now", select check-in/out dates, see live availability + estimated total, submit a booking request. Requests are reviewed and confirmed by the KAYANA team. Direct payment is not yet integrated; final pricing is confirmed by the team.`;
}

const SYSTEM_PROMPT_EN = `You are the KAYANA Villa Management virtual assistant, active during off-hours (10 PM – 8 AM Bali time). You represent KAYANA, a professional villa management company in Bali.

Your role:
- Answer questions about KAYANA's services, villas, pricing, booking process, owner inquiries, and general company info.
- Be helpful, professional, concise, and warm — reflecting a premium hospitality brand.
- Help BOTH villa owners (operational questions, management packages, reporting) AND guests (booking, availability, villa details).
- If a guest wants to book, guide them to the Portfolio section, click "Book Now" on a villa, select dates and submit.
- If someone wants to contact a human (especially villa owners needing a consultation), point them to the contact form or WhatsApp.
- Never invent prices, availability, or performance figures that are not in the provided context.
- If you don't know something, say so and suggest contacting the team via WhatsApp or the contact form.
- Keep responses short (2-4 sentences usually). Use bullet points for lists.`;

const SYSTEM_PROMPT_ID = `Anda adalah asisten virtual KAYANA Villa Management, aktif di luar jam kerja (22.00 – 08.00 waktu Bali). Anda mewakili KAYANA, perusahaan manajemen villa profesional di Bali.

Peran Anda:
- Menjawab pertanyaan tentang layanan KAYANA, villa, harga, proses booking, pertanyaan pemilik, dan info umum perusahaan.
- Bersikap membantu, profesional, singkat, dan hangat — mencerminkan brand hospitality premium.
- Membantu PEMILIK VILLA (pertanyaan operasional, paket manajemen, pelaporan) DAN TAMU (booking, ketersediaan, detail villa).
- Jika tamu ingin booking, arahkan ke bagian Portfolio, klik "Book Now" pada villa, pilih tanggal dan kirim.
- Jika seseorang ingin menghubungi manusia (terutama pemilik villa yang butuh konsultasi), arahkan ke formulir kontak atau WhatsApp.
- Jangan mengarang harga, ketersediaan, atau angka kinerja yang tidak ada di konteks yang diberikan.
- Jika tidak tahu, katakan begitu dan sarankan menghubungi tim via WhatsApp atau formulir kontak.
- Tetap singkat (biasanya 2-4 kalimat). Gunakan poin-poin untuk daftar.`;

export async function POST(req: NextRequest) {
  // Schedule check — bot only active 22:00–08:00 WITA.
  if (!isChatbotActive()) {
    return NextResponse.json(
      {
        ok: false,
        offline: true,
        message:
          "Our virtual assistant is available from 10 PM to 8 AM (Bali time). Please leave a message via the contact form or WhatsApp, and our team will respond during business hours.",
      },
      { status: 200 }
    );
  }

  let body: { message?: string; history?: Array<{ role: string; content: string }>; lang?: "en" | "id" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const userMessage = (body.message || "").toString().trim();
  if (!userMessage) {
    return NextResponse.json({ ok: false, error: "Message is required." }, { status: 422 });
  }

  const lang: "en" | "id" = body.lang === "id" ? "id" : "en";

  // Build context from DB (villas, FAQs, settings).
  let context: string;
  try {
    context = await buildContext(lang);
  } catch (err) {
    console.error("[chatbot] failed to build context:", err);
    // Fallback: answer without DB context.
    context = "KAYANA Villa Management — professional villa management in Bali.";
  }

  const systemPrompt = `${lang === "id" ? SYSTEM_PROMPT_ID : SYSTEM_PROMPT_EN}\n\n--- COMPANY CONTEXT (live data) ---\n${context}`;

  // Compose messages: system prompt + recent history (last 6) + new message.
  const history = (body.history || []).slice(-6);
  const messages: Array<{ role: string; content: string }> = [
    { role: "assistant", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage },
  ];

  try {
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: messages as any,
      thinking: { type: "disabled" },
    });
    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error("Empty response from model");
    }
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chatbot] LLM call failed:", err);
    const fallback =
      lang === "id"
        ? "Maaf, saya sedang mengalami kendala teknis. Silakan hubungi tim kami via WhatsApp atau formulir kontak."
        : "Sorry, I'm having a technical issue right now. Please reach our team via WhatsApp or the contact form.";
    return NextResponse.json({ ok: true, reply: fallback });
  }
}
