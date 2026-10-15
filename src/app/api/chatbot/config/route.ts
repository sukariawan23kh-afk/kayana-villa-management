import { NextResponse } from "next/server";

/**
 * Public config for the chatbot widget (no LLM call, no DB).
 * Lets the widget know if the bot is active, the schedule, and welcome text.
 */
export async function GET() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const wita = new Date(utcMs + 8 * 60 * 60 * 1000);
  const hour = wita.getHours();
  const active = hour >= 22 || hour < 8;

  return NextResponse.json({
    ok: true,
    active,
    schedule: {
      startHour: 22,
      endHour: 8,
      timezone: "Asia/Makassar (WITA, UTC+8)",
      label: "10 PM – 8 AM (Bali time)",
    },
    welcome: {
      en: "👋 Hi! I'm the KAYANA virtual assistant. How can I help you tonight — villas, booking, or owner questions?",
      id: "👋 Halo! Saya asisten virtual KAYANA. Ada yang bisa saya bantu malam ini — soal villa, booking, atau pertanyaan pemilik?",
    },
    offline: {
      en: "🌙 Our virtual assistant is available from 10 PM to 8 AM (Bali time). For now, please leave a message via the contact form or WhatsApp — our team responds during business hours.",
      id: "🌙 Asisten virtual kami tersedia pukul 22.00 – 08.00 waktu Bali. Saat ini, silakan tinggalkan pesan via formulir kontak atau WhatsApp — tim kami akan merespons pada jam kerja.",
    },
  });
}
