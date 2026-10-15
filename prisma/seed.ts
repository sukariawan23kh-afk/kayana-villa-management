/**
 * Seed the CMS tables (Villa, Faq, Testimonial, SiteSetting) with the
 * current default content so the admin has something to manage on first run.
 *
 * Run with: bun run db:seed
 */
import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding CMS content...");

  /* ---------------- SiteSetting (singleton) ---------------- */
  const existingSetting = await db.siteSetting.findUnique({
    where: { id: "default" },
  });
  if (!existingSetting) {
    await db.siteSetting.create({
      data: {
        id: "default",
        whatsappNumber: "6281234567890",
        whatsappDisplay: "+62 812 3456 7890",
        email: "hello@kayanavilla.com",
        location: "Bali, Indonesia",
        locationLabelEn: "Bali, Indonesia",
        locationLabelId: "Bali, Indonesia",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
      },
    });
    console.log("✓ SiteSetting created");
  } else {
    console.log("• SiteSetting already exists, skipping");
  }

  /* ---------------- Villas ---------------- */
  const villaCount = await db.villa.count();
  if (villaCount === 0) {
    await db.villa.createMany({
      data: [
        { name: "KAYANA Residence", location: "Umalas, Bali", bedrooms: 3, type: "Private Pool Villa", order: 1, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cfb2b38ab9e4.jpg", descriptionEn: "Contemporary tropical residence with open-plan living, lush gardens and a calm private pool.", descriptionId: "Residensi tropis kontemporer dengan ruang hidup terbuka, taman rimbun, dan kolam pribadi yang tenang.", pricePerNight: 450, currency: "USD", maxGuests: 6 },
        { name: "The Berawa Pavilion", location: "Berawa, Bali", bedrooms: 4, type: "Pavilion Villa", order: 2, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/54f183983d89.jpg", descriptionEn: "Light-filled pavilion living overlooking a sunlit pool, steps from Berawa's beach and cafés.", descriptionId: "Hidup paviliun yang penuh cahaya dengan view kolam bercahaya, berdekatan dengan pantai dan kafe Berawa.", pricePerNight: 520, currency: "USD", maxGuests: 8 },
        { name: "Canggu Garden Villa", location: "Canggu, Bali", bedrooms: 2, type: "Garden Villa", order: 3, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1159ad5563fe.jpg", descriptionEn: "Intimate two-bedroom villa wrapped in tropical greenery with a relaxed outdoor lounge.", descriptionId: "Villa dua kamar yang intim, dikelilingi hijaunya tropis dengan ruang luar yang santai.", pricePerNight: 320, currency: "USD", maxGuests: 4 },
        { name: "Seminyak Suite Villa", location: "Seminyak, Bali", bedrooms: 5, type: "Luxury Villa", order: 4, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0c858682603b.jpg", descriptionEn: "Spacious five-bedroom retreat with designer interiors, infinity pool and sunset rooftop access.", descriptionId: "Retret lima kamar yang luas dengan interior desainer, kolam infinity, dan akses atap sunset.", pricePerNight: 780, currency: "USD", maxGuests: 10 },
        { name: "Pererenan Retreat", location: "Pererenan, Bali", bedrooms: 3, type: "Retreat Villa", order: 5, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fa50c0f3aa3.jpg", descriptionEn: "Serene retreat villa blending warm timber, natural stone and an expansive outdoor pavilion.", descriptionId: "Villa retret yang tenang, memadukan kayu hangat, batu alam, dan paviliun luar yang luas.", pricePerNight: 410, currency: "USD", maxGuests: 6 },
        { name: "Ubud Riverside Villa", location: "Ubud, Bali", bedrooms: 4, type: "Jungle Villa", order: 6, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ff9df85e6919.jpg", descriptionEn: "Riverside jungle villa with panoramic greenery, a curved infinity pool and quiet luxury interiors.", descriptionId: "Villa tepi sungai di hutan dengan hijaunya panorama, kolam infinity melengkung, dan interior kemewahan yang tenang.", pricePerNight: 560, currency: "USD", maxGuests: 8 },
      ],
    });
    console.log("✓ Villas created");
  } else {
    console.log(`• Villas already exist (${villaCount}), skipping`);
  }

  /* ---------------- Villa Gallery Images ---------------- */
  const imageCount = await db.villaImage.count();
  if (imageCount === 0) {
    const allVillas = await db.villa.findMany();
    const galleryMap: Record<string, string[]> = {
      "KAYANA Residence": [
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d300f48a4e6f.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0c858682603b.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a7d1c9587030.png",
      ],
      "The Berawa Pavilion": [
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e1cda6caa8f0.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fa50c0f3aa3.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ff9df85e6919.jpg",
      ],
      "Canggu Garden Villa": [
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c50da3dfbf69.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1a87d9998c8c.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b2d0adb0fcde.jpg",
      ],
      "Seminyak Suite Villa": [
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e9007456cca3.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fbe7d011cbc4.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0951f458965a.jpg",
      ],
      "Pererenan Retreat": [
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b2d0adb0fcde.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e1cda6caa8f0.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fa50c0f3aa3.jpg",
      ],
      "Ubud Riverside Villa": [
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ff9df85e6919.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a725f0f33038.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c50da3dfbf69.jpg",
      ],
    };
    for (const v of allVillas) {
      const imgs = galleryMap[v.name] || [];
      if (imgs.length === 0) continue;
      await db.villaImage.createMany({
        data: imgs.map((url, i) => ({ villaId: v.id, url, order: i + 1 })),
      });
    }
    console.log("✓ Villa gallery images created");
  } else {
    console.log(`• Villa images already exist (${imageCount}), skipping`);
  }

  /* ---------------- FAQs ---------------- */
  const faqCount = await db.faq.count();
  if (faqCount === 0) {
    const faqs = [
      { qEn: "What does villa management include?", qId: "Apa saja yang termasuk dalam manajemen villa?", aEn: "KAYANA manages reservations, revenue and pricing, guest communication, housekeeping, maintenance coordination, property inspections and owner reporting — covering the full operational and commercial life of your villa.", aId: "KAYANA mengelola reservasi, pendapatan dan harga, komunikasi tamu, housekeeping, koordinasi perawatan, inspeksi properti, dan pelaporan pemilik — mencakup seluruh kehidupan operasional dan komersial villa Anda." },
      { qEn: "How does KAYANA manage Airbnb, Booking.com and Agoda?", qId: "Bagaimana KAYANA mengelola Airbnb, Booking.com, dan Agoda?", aEn: "We operate your listings directly or as a co-host, optimizing content, pricing, availability and messaging across each channel while keeping calendars synchronized to prevent conflicts.", aId: "Kami mengoperasikan listing Anda secara langsung atau sebagai co-host, mengoptimalkan konten, harga, ketersediaan, dan pesan di setiap saluran sambil menjaga kalender tetap tersinkronisasi untuk mencegah konflik." },
      { qEn: "How do you prevent double bookings?", qId: "Bagaimana Anda mencegah pemesanan ganda?", aEn: "Through a synchronized calendar and channel manager approach. Availability is updated across all connected platforms in real time, with reservation handling procedures that add a human verification layer.", aId: "Melalui kalender yang tersinkronisasi dan pendekatan channel manager. Ketersediaan diperbarui di seluruh platform yang terhubung secara real-time, dengan prosedur penanganan reservasi yang menambah lapisan verifikasi manusia." },
      { qEn: "How is villa pricing determined?", qId: "Bagaimana harga villa ditentukan?", aEn: "Pricing is built from market research, seasonal demand, local events, comparable properties and your occupancy goals. We apply dynamic pricing and review it regularly rather than using a fixed rate year-round.", aId: "Harga dibangun dari riset pasar, permintaan musiman, event lokal, properti pembanding, dan target okupansi Anda. Kami menerapkan harga dinamis dan meninjaunya secara berkala, bukan tarif tetap sepanjang tahun." },
      { qEn: "How often will I receive owner reports?", qId: "Seberapa sering saya menerima laporan pemilik?", aEn: "Owners receive structured monthly reports covering revenue, occupancy, expenses and operational status. Reporting scope and detail scale with the management package you select.", aId: "Pemilik menerima laporan bulanan terstruktur mencakup pendapatan, okupansi, pengeluaran, dan status operasional. Cakupan dan detail pelaporan menyesuaikan paket manajemen yang Anda pilih." },
      { qEn: "Can I still use my villa personally?", qId: "Apakah saya masih bisa menggunakan villa saya sendiri?", aEn: "Yes. Your villa remains yours. We simply block the calendar for your personal use dates so they are never booked, and we coordinate preparation and reactivation around your visits.", aId: "Tentu. Villa tetap milik Anda. Kami hanya memblokir kalender pada tanggal penggunaan pribadi agar tidak dipesan, dan mengoordinasikan persiapan serta reaktivasi di sekitar kunjungan Anda." },
      { qEn: "Who handles maintenance?", qId: "Siapa yang menangani perawatan?", aEn: "Our operations team coordinates preventive and reactive maintenance with trusted local vendors — covering AC, pool, garden, electrical and plumbing — and oversees emergency response.", aId: "Tim operasional kami mengoordinasikan perawatan preventif dan reaktif dengan vendor lokal terpercaya — mencakup AC, kolam, taman, listrik, dan perpipaan — serta mengawasi tanggapan darurat." },
      { qEn: "Who handles guest communication?", qId: "Siapa yang menangani komunikasi tamu?", aEn: "KAYANA manages guest communication across channels, from pre-arrival messages through check-in, on-site support and check-out, including review management and issue resolution.", aId: "KAYANA mengelola komunikasi tamu di seluruh saluran, dari pesan pra-kedatangan hingga check-in, dukungan saat di lokasi, dan check-out, termasuk manajemen ulasan dan penyelesaian masalah." },
      { qEn: "How are housekeeping and laundry managed?", qId: "Bagaimana housekeeping dan laundry dikelola?", aEn: "Through scheduled cleaning, linen and laundry coordination with quality inspections after each turnover, plus deep cleaning programs to keep the villa in premium condition.", aId: "Melalui jadwal pembersihan, koordinasi linen dan laundry dengan inspeksi mutu setiap pergantian, plus program pembersihan menyeluruh agar villa tetap dalam kondisi prima." },
      { qEn: "What happens in an emergency?", qId: "Apa yang terjadi saat darurat?", aEn: "We coordinate 24/7 emergency response for guests and the property. Our team assesses the situation, dispatches the appropriate vendor and keeps the owner informed of anything significant.", aId: "Kami mengoordinasikan tanggapan darurat 24/7 untuk tamu dan properti. Tim kami menilai situasi, mengirim vendor yang sesuai, dan terus memberi tahu pemilik untuk hal-hal penting." },
      { qEn: "How does the management fee work?", qId: "Bagaimana biaya manajemen bekerja?", aEn: "Management solutions are customized to your property and goals. After an assessment, we prepare a transparent proposal covering scope, fee structure and reporting — with no obligation to proceed.", aId: "Solusi manajemen disesuaikan dengan properti dan tujuan Anda. Setelah asesmen, kami menyiapkan proposal transparan mencakup cakupan, struktur biaya, dan pelaporan — tanpa kewajiban untuk melanjutkan." },
      { qEn: "Can KAYANA manage villas outside Bali?", qId: "Apakah KAYANA bisa mengelola villa di luar Bali?", aEn: "Our operational base and local networks are in Bali. If you have a property elsewhere, we are happy to discuss whether our model can be adapted to your situation.", aId: "Basis operasional dan jaringan lokal kami berada di Bali. Jika Anda memiliki properti di tempat lain, kami senang membahas apakah model kami dapat disesuaikan dengan situasi Anda." },
      { qEn: "How do I start working with KAYANA?", qId: "Bagaimana saya mulai bekerja dengan KAYANA?", aEn: "Begin by requesting a consultation through the contact form or WhatsApp. We'll learn about your property, assess it, and prepare a tailored management proposal for your review.", aId: "Mulailah dengan meminta konsultasi melalui formulir kontak atau WhatsApp. Kami akan memahami properti Anda, mengasesmenya, dan menyiapkan proposal manajemen yang disesuaikan untuk Anda tinjau." },
    ];
    await db.faq.createMany({
      data: faqs.map((f, i) => ({
        questionEn: f.qEn,
        questionId: f.qId,
        answerEn: f.aEn,
        answerId: f.aId,
        order: i + 1,
        published: true,
      })),
    });
    console.log("✓ FAQs created");
  } else {
    console.log(`• FAQs already exist (${faqCount}), skipping`);
  }

  /* ---------------- Testimonials ---------------- */
  const tCount = await db.testimonial.count();
  if (tCount === 0) {
    await db.testimonial.createMany({
      data: [
        { order: 1, published: false, quoteEn: "[Owner testimonial will be added here. When a verified owner testimonial is available, it will replace this placeholder — including the owner's name, property location, and a short account of their experience working with KAYANA.]", quoteId: "[Testimoni pemilik akan ditambahkan di sini. Saat testimoni pemilik yang terverifikasi tersedia, ia akan menggantikan placeholder ini — termasuk nama pemilik, lokasi properti, dan cerita singkat pengalaman bekerja dengan KAYANA.]", nameEn: "Owner name", nameId: "Nama pemilik", locationEn: "Property location", locationId: "Lokasi properti" },
        { order: 2, published: false, quoteEn: "[Owner testimonial will be added here. KAYANA does not publish fabricated reviews or unverified performance claims. Real testimonials appear once owners have agreed to share their experience.]", quoteId: "[Testimoni pemilik akan ditambahkan di sini. KAYANA tidak mempublikasikan ulasan fiktif atau klaim kinerja yang tidak terverifikasi. Testimoni nyata akan tampil setelah pemilik menyetujui untuk berbagi pengalaman mereka.]", nameEn: "Owner name", nameId: "Nama pemilik", locationEn: "Property location", locationId: "Lokasi properti" },
        { order: 3, published: false, quoteEn: "[Owner testimonial will be added here. Each testimonial is published only with the owner's explicit consent, alongside their villa location and a brief summary of the management relationship.]", quoteId: "[Testimoni pemilik akan ditambahkan di sini. Setiap testimoni dipublikasikan hanya dengan persetujuan eksplisit pemilik, beserta lokasi villa dan ringkasan singkat hubungan manajemen.]", nameEn: "Owner name", nameId: "Nama pemilik", locationEn: "Property location", locationId: "Lokasi properti" },
      ],
    });
    console.log("✓ Testimonials created");
  } else {
    console.log(`• Testimonials already exist (${tCount}), skipping`);
  }

  console.log("\nSeed complete ✅");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
