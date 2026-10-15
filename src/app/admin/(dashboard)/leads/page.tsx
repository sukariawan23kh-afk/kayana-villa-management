import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { LeadsManager } from "@/components/admin/LeadsManager";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const where = status ? { status } : {};
  const [leads, counts] = await Promise.all([
    db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    db.lead.groupBy({ by: ["status"], _count: true }),
  ]);
  const countMap: Record<string, number> = {};
  counts.forEach((c) => (countMap[c.status] = c._count));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
          Consultation Requests
        </p>
        <h1 className="mt-1 font-serif-display text-3xl font-medium text-charcoal">
          Leads Inbox
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Villa owners who requested a consultation through the website.
        </p>
      </header>

      <LeadsManager initialLeads={leads} counts={countMap} activeStatus={status || "all"} />
    </div>
  );
}
