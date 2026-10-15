import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  checkPassword,
  createSessionToken,
  COOKIE_NAME,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const password = (body.password || "").toString();
  if (!password) {
    return NextResponse.json({ ok: false, error: "Password required." }, { status: 422 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "KAYANA admin login" });
}
