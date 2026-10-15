import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { FaqsManager } from "@/components/admin/FaqsManager";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await requireAdmin();
  const faqs = await db.faq.findMany({ orderBy: { order: "asc" } });
  return <FaqsManager initialFaqs={faqs} />;
}
