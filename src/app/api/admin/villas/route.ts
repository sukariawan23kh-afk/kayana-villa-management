import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const villas = await db.villa.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ ok: true, villas });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { name, location, bedrooms, type, descriptionEn, descriptionId, image, order, published, pricePerNight, currency, maxGuests, images } = body;
  if (!name || !location || !type || !image) {
    return NextResponse.json(
      { ok: false, error: "name, location, type and image are required." },
      { status: 422 }
    );
  }
  const villa = await db.villa.create({
    data: {
      name,
      location,
      bedrooms: Number(bedrooms) || 0,
      type,
      descriptionEn: descriptionEn || "",
      descriptionId: descriptionId || "",
      image,
      order: Number(order) || 0,
      published: published !== false,
      pricePerNight: pricePerNight === "" || pricePerNight == null ? null : Number(pricePerNight),
      currency: currency || "USD",
      maxGuests: Number(maxGuests) || 6,
      ...(images && Array.isArray(images) && images.length > 0
        ? { images: { create: images.map((url: string, i: number) => ({ url, order: i + 1 })) } }
        : {}),
    },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ ok: true, villa });
}
