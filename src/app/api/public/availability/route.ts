import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Check villa availability for a date range.
 * Query: ?villaId=...&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
 * Returns { available: boolean, conflictingReservationId?: string, nights: number }
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const villaId = url.searchParams.get("villaId");
  const checkInStr = url.searchParams.get("checkIn");
  const checkOutStr = url.searchParams.get("checkOut");

  if (!villaId || !checkInStr || !checkOutStr) {
    return NextResponse.json(
      { ok: false, error: "villaId, checkIn, and checkOut are required." },
      { status: 422 }
    );
  }

  const checkIn = new Date(checkInStr + "T12:00:00");
  const checkOut = new Date(checkOutStr + "T12:00:00");

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return NextResponse.json({ ok: false, error: "Invalid date format." }, { status: 422 });
  }
  if (checkOut <= checkIn) {
    return NextResponse.json(
      { ok: false, error: "Check-out must be after check-in." },
      { status: 422 }
    );
  }

  // Find any overlapping reservation that is NOT cancelled.
  // Overlap: existing.checkIn < new.checkOut AND existing.checkOut > new.checkIn
  const conflict = await db.reservation.findFirst({
    where: {
      villaId,
      status: { not: "cancelled" },
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } },
      ],
    },
    select: { id: true, checkIn: true, checkOut: true },
  });

  const nights = Math.max(
    0,
    Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  );

  return NextResponse.json({
    ok: true,
    available: !conflict,
    conflictingReservationId: conflict?.id ?? null,
    nights,
  });
}
