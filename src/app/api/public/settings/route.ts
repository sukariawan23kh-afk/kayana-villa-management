import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** Public: returns the editable site settings (whatsapp, email, socials). */
export async function GET() {
  const setting = await db.siteSetting.findUnique({ where: { id: "default" } });
  return NextResponse.json({ ok: true, setting });
}
