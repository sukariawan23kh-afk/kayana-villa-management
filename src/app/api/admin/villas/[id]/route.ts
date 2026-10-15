import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { name, location, bedrooms, type, descriptionEn, descriptionId, image, order, published, pricePerNight, currency, maxGuests, images } = body;

  // If images array is provided, do a full sync: delete old → create new.
  const imagesOp =
    images !== undefined && Array.isArray(images)
      ? {
          deleteMany: {},
          create: images
            .filter((url: string) => typeof url === "string" && url.trim())
            .map((url: string, i: number) => ({ url: url.trim(), order: i + 1 })),
        }
      : undefined;

  const villa = await db.villa.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(location !== undefined && { location }),
      ...(bedrooms !== undefined && { bedrooms: Number(bedrooms) }),
      ...(type !== undefined && { type }),
      ...(descriptionEn !== undefined && { descriptionEn }),
      ...(descriptionId !== undefined && { descriptionId }),
      ...(image !== undefined && { image }),
      ...(order !== undefined && { order: Number(order) }),
      ...(published !== undefined && { published: !!published }),
      ...(pricePerNight !== undefined && { pricePerNight: pricePerNight === "" || pricePerNight == null ? null : Number(pricePerNight) }),
      ...(currency !== undefined && { currency }),
      ...(maxGuests !== undefined && { maxGuests: Number(maxGuests) || 6 }),
      ...(imagesOp && { images: imagesOp }),
    },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ ok: true, villa });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await db.villa.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
