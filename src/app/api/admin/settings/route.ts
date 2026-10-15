import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const setting = await db.siteSetting.findUnique({ where: { id: "default" } });
  return NextResponse.json({ ok: true, setting });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const fields = [
    "whatsappNumber",
    "whatsappDisplay",
    "email",
    "location",
    "locationLabelEn",
    "locationLabelId",
    "instagram",
    "facebook",
    "linkedin",
  ];
  const data: Record<string, string> = {};
  for (const f of fields) {
    if (typeof body[f] === "string") data[f] = body[f];
  }
  const setting = await db.siteSetting.upsert({
    where: { id: "default" },
    update: data,
    create: {
      id: "default",
      whatsappNumber: data.whatsappNumber ?? "6281234567890",
      whatsappDisplay: data.whatsappDisplay ?? "+62 812 3456 7890",
      email: data.email ?? "hello@kayanavilla.com",
      location: data.location ?? "Bali, Indonesia",
      locationLabelEn: data.locationLabelEn ?? "Bali, Indonesia",
      locationLabelId: data.locationLabelId ?? "Bali, Indonesia",
      instagram: data.instagram ?? "",
      facebook: data.facebook ?? "",
      linkedin: data.linkedin ?? "",
      ...data,
    },
  });
  return NextResponse.json({ ok: true, setting });
}
