import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding villas (debug)...");
  console.log("DATABASE_PROVIDER:", process.env.DATABASE_PROVIDER || "(unset → sqlite)");
  const url = process.env.DATABASE_URL || "";
  console.log("DATABASE_URL:", url.startsWith("postgres") ? url.replace(/:[^:@]+@/, ":***@").slice(0, 70) : url);

  // Clear villas first so this is idempotent.
  await db.villa.deleteMany({});
  console.log("Cleared existing villas.");

  try {
    const created = await db.villa.createMany({
      data: [
        { name: "KAYANA Residence", location: "Umalas, Bali", bedrooms: 3, type: "Private Pool Villa", order: 1, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cfb2b38ab9e4.jpg", descriptionEn: "Contemporary tropical residence with open-plan living, lush gardens and a calm private pool.", descriptionId: "Residensi tropis kontemporer dengan ruang hidup terbuka, taman rimbun, dan kolam pribadi yang tenang.", pricePerNight: 450, currency: "USD", maxGuests: 6 },
        { name: "The Berawa Pavilion", location: "Berawa, Bali", bedrooms: 4, type: "Pavilion Villa", order: 2, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/54f183983d89.jpg", descriptionEn: "Light-filled pavilion living overlooking a sunlit pool, steps from Berawa's beach and cafés.", descriptionId: "Hidup paviliun yang penuh cahaya dengan view kolam bercahaya, berdekatan dengan pantai dan kafe Berawa.", pricePerNight: 520, currency: "USD", maxGuests: 8 },
        { name: "Canggu Garden Villa", location: "Canggu, Bali", bedrooms: 2, type: "Garden Villa", order: 3, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1159ad5563fe.jpg", descriptionEn: "Intimate two-bedroom villa wrapped in tropical greenery with a relaxed outdoor lounge.", descriptionId: "Villa dua kamar yang intim, dikelilingi hijaunya tropis dengan ruang luar yang santai.", pricePerNight: 320, currency: "USD", maxGuests: 4 },
        { name: "Seminyak Suite Villa", location: "Seminyak, Bali", bedrooms: 5, type: "Luxury Villa", order: 4, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0c858682603b.jpg", descriptionEn: "Spacious five-bedroom retreat with designer interiors, infinity pool and sunset rooftop access.", descriptionId: "Retret lima kamar yang luas dengan interior desainer, kolam infinity, dan akses atap sunset.", pricePerNight: 780, currency: "USD", maxGuests: 10 },
        { name: "Pererenan Retreat", location: "Pererenan, Bali", bedrooms: 3, type: "Retreat Villa", order: 5, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fa50c0f3aa3.jpg", descriptionEn: "Serene retreat villa blending warm timber, natural stone and an expansive outdoor pavilion.", descriptionId: "Villa retret yang tenang, memadukan kayu hangat, batu alam, dan paviliun luar yang luas.", pricePerNight: 410, currency: "USD", maxGuests: 6 },
        { name: "Ubud Riverside Villa", location: "Ubud, Bali", bedrooms: 4, type: "Jungle Villa", order: 6, published: true, image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ff9df85e6919.jpg", descriptionEn: "Riverside jungle villa with panoramic greenery, a curved infinity pool and quiet luxury interiors.", descriptionId: "Villa tepi sungai di hutan dengan hijaunya panorama, kolam infinity melengkung, dan interior kemewahan yang tenang.", pricePerNight: 560, currency: "USD", maxGuests: 8 },
      ],
    });
    console.log("✓ Villas created:", created.count);
  } catch (err: any) {
    console.error("\n❌ ERROR creating villas:");
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    if (err.meta) console.error("Meta:", JSON.stringify(err.meta));
    process.exit(1);
  }

  const after = await db.villa.findMany({ select: { name: true, pricePerNight: true, maxGuests: true } });
  console.log("\nVillas in DB now:");
  after.forEach((v) => console.log(`  ${v.name} — $${v.pricePerNight} — max ${v.maxGuests}`));
  await db.$disconnect();
}

main();
