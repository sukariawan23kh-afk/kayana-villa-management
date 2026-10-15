import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const status = body.status as string | undefined;
  if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
  }
  const updated = await db.reservation.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true, reservation: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await db.reservation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
