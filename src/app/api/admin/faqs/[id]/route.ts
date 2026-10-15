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
  const { questionEn, questionId, answerEn, answerId, order, published } = body;
  const faq = await db.faq.update({
    where: { id },
    data: {
      ...(questionEn !== undefined && { questionEn }),
      ...(questionId !== undefined && { questionId }),
      ...(answerEn !== undefined && { answerEn }),
      ...(answerId !== undefined && { answerId }),
      ...(order !== undefined && { order: Number(order) }),
      ...(published !== undefined && { published: !!published }),
    },
  });
  return NextResponse.json({ ok: true, faq });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await db.faq.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
