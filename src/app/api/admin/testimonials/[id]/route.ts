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
  const { quoteEn, quoteId, nameEn, nameId, locationEn, locationId, published, order } = body;
  const t = await db.testimonial.update({
    where: { id },
    data: {
      ...(quoteEn !== undefined && { quoteEn }),
      ...(quoteId !== undefined && { quoteId }),
      ...(nameEn !== undefined && { nameEn }),
      ...(nameId !== undefined && { nameId }),
      ...(locationEn !== undefined && { locationEn }),
      ...(locationId !== undefined && { locationId }),
      ...(published !== undefined && { published: !!published }),
      ...(order !== undefined && { order: Number(order) }),
    },
  });
  return NextResponse.json({ ok: true, testimonial: t });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await db.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
