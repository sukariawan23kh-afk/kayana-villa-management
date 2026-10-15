import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ContactPayload {
  fullName?: string;
  whatsappNumber?: string;
  email?: string;
  villaName?: string;
  villaLocation?: string;
  bedrooms?: string;
  propertyStatus?: string;
  bookingChannels?: string | string[];
  managementState?: string;
  objective?: string;
  message?: string;
}

function normalize(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value.join(", ");
  return value?.toString().trim() || undefined;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const fullName = (body.fullName || "").toString().trim();
  const whatsappNumber = (body.whatsappNumber || "").toString().trim();
  const email = (body.email || "").toString().trim();

  if (!fullName || !whatsappNumber || !email) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please provide your full name, WhatsApp number, and email.",
      },
      { status: 422 }
    );
  }

  // Basic email sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 422 }
    );
  }

  try {
    const lead = await db.lead.create({
      data: {
        fullName,
        whatsappNumber,
        email,
        villaName: normalize(body.villaName),
        villaLocation: normalize(body.villaLocation),
        bedrooms: normalize(body.bedrooms),
        propertyStatus: normalize(body.propertyStatus),
        bookingChannels: normalize(body.bookingChannels),
        managementState: normalize(body.managementState),
        objective: normalize(body.objective),
        message: normalize(body.message),
        source: "website",
      },
    });

    return NextResponse.json({
      ok: true,
      id: lead.id,
      message:
        "Thank you. Your consultation request has been received — our team will be in touch shortly.",
    });
  } catch (err) {
    console.error("[api/contact] failed to persist lead:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while submitting your request. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "KAYANA contact API" });
}
