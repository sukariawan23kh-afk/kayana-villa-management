import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const testimonials = await db.testimonial.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, testimonials });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { quoteEn, quoteId, nameEn, nameId, locationEn, locationId, published, order } = body;
  if (!quoteEn || !quoteId) {
    return NextResponse.json(
      { ok: false, error: "quoteEn and quoteId are required." },
      { status: 422 }
    );
  }
  const t = await db.testimonial.create({
    data: {
      quoteEn,
      quoteId,
      nameEn: nameEn || "Owner name",
      nameId: nameId || "Nama pemilik",
      locationEn: locationEn || "Property location",
      locationId: locationId || "Lokasi properti",
      published: !!published,
      order: Number(order) || 0,
    },
  });
  return NextResponse.json({ ok: true, testimonial: t });
}
