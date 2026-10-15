import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { VillasManager } from "@/components/admin/VillasManager";

export const dynamic = "force-dynamic";

export default async function AdminVillasPage() {
  await requireAdmin();
  const villas = await db.villa.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return <VillasManager initialVillas={villas} />;
}
