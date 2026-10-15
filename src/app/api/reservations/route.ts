import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Public booking endpoint — creates a reservation (status: pending).
 * Also re-checks availability at write time to prevent double-booking.
 *
 * Body: { villaId, guestName, guestEmail, guestPhone, checkIn (YYYY-MM-DD),
 *         checkOut (YYYY-MM-DD), guests, notes? }
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const villaId = String(body.villaId || "");
  const guestName = String(body.guestName || "").trim();
  const guestEmail = String(body.guestEmail || "").trim();
  const guestPhone = String(body.guestPhone || "").trim();
  const checkInStr = String(body.checkIn || "");
  const checkOutStr = String(body.checkOut || "");
  const guests = Number(body.guests) || 2;
  const notes = body.notes ? String(body.notes).trim() : null;

  if (!villaId || !guestName || !guestEmail || !guestPhone || !checkInStr || !checkOutStr) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 422 });
  }

  const checkIn = new Date(checkInStr + "T12:00:00");
  const checkOut = new Date(checkOutStr + "T12:00:00");
  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()) || checkOut <= checkIn) {
    return NextResponse.json(
      { ok: false, error: "Invalid or non-chronological dates." },
      { status: 422 }
    );
  }

  // Verify villa exists, is published, and supports the guest count.
  const villa = await db.villa.findUnique({ where: { id: villaId } });
  if (!villa || !villa.published) {
    return NextResponse.json({ ok: false, error: "Villa not found." }, { status: 404 });
  }
  if (guests > villa.maxGuests) {
    return NextResponse.json(
      { ok: false, error: `This villa accommodates up to ${villa.maxGuests} guests.` },
      { status: 422 }
    );
  }

  // Re-check availability at write time (race protection).
  const conflict = await db.reservation.findFirst({
    where: {
      villaId,
      status: { not: "cancelled" },
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } },
      ],
    },
    select: { id: true },
  });
  if (conflict) {
    return NextResponse.json(
      { ok: false, error: "Those dates are no longer available. Please choose other dates." },
      { status: 409 }
    );
  }

  const nights = Math.max(
    1,
    Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  );
  const totalAmount = villa.pricePerNight ? villa.pricePerNight * nights : null;
  const currency = villa.currency || "USD";

  const reservation = await db.reservation.create({
    data: {
      villaId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      currency,
      status: "pending",
      notes,
      source: "website",
    },
  });

  return NextResponse.json({
    ok: true,
    reservation,
    summary: {
      nights,
      pricePerNight: villa.pricePerNight,
      totalAmount,
      currency,
    },
  });
}
