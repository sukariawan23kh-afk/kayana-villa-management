import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const where = status ? { status } : {};
  const reservations = await db.reservation.findMany({
    where,
    include: { villa: { select: { name: true, location: true, image: true } } },
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  return NextResponse.json({ ok: true, reservations });
}
