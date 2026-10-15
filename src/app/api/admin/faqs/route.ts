import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const faqs = await db.faq.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, faqs });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { questionEn, questionId, answerEn, answerId, order, published } = body;
  if (!questionEn || !questionId || !answerEn || !answerId) {
    return NextResponse.json(
      { ok: false, error: "All question/answer fields are required." },
      { status: 422 }
    );
  }
  const faq = await db.faq.create({
    data: {
      questionEn,
      questionId,
      answerEn,
      answerId,
      order: Number(order) || 0,
      published: published !== false,
    },
  });
  return NextResponse.json({ ok: true, faq });
}
