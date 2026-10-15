/**
 * Quick database connection + basic integrity check.
 * Run before first deploy or after env var changes:
 *
 *   bun run db:check        # uses .env
 *   DATABASE_URL=... bun run db:check   # override on the fly
 *
 * Exits 0 on success, 1 on failure.
 */
import { db } from "../src/lib/db";

async function main() {
  console.log("Connecting to database...");
  console.log("Provider:", process.env.DATABASE_PROVIDER || "(not set)");
  const url = process.env.DATABASE_URL || "";
  console.log(
    "URL:",
    url.startsWith("file:")
      ? url
      : url.replace(/:[^:@]+@/, ":****@") // hide password
  );

  try {
    // Lightweight query that works on both SQLite and Postgres.
    await db.$queryRaw`SELECT 1`;
    console.log("✅ Connection OK");

    const counts = await Promise.all([
      db.lead.count(),
      db.villa.count(),
      db.faq.count(),
      db.testimonial.count(),
      db.siteSetting.count(),
    ]);
    console.log("Tables:");
    console.log("  leads        :", counts[0]);
    console.log("  villas       :", counts[1]);
    console.log("  faqs         :", counts[2]);
    console.log("  testimonials :", counts[3]);
    console.log("  siteSettings :", counts[4]);

    if (counts[4] === 0) {
      console.log("\n⚠️  SiteSetting row missing — run `bun run db:seed`");
    }
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Connection failed:");
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
