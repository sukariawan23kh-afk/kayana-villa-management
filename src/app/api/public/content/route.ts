import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** Public: returns published villas, faqs, testimonials for the live site. */
export async function GET() {
  const [villas, faqs, testimonials] = await Promise.all([
    db.villa.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { images: { orderBy: { order: "asc" } } },
    }),
    db.faq.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    db.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);
  return NextResponse.json({ ok: true, villas, faqs, testimonials });
}
