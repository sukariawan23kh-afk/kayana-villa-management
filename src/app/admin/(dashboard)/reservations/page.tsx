import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { ReservationsManager } from "@/components/admin/ReservationsManager";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const where = status ? { status } : {};
  const [reservations, counts] = await Promise.all([
    db.reservation.findMany({
      where,
      include: { villa: { select: { name: true, location: true, image: true } } },
      orderBy: { createdAt: "desc" },
      take: 300,
    }),
    db.reservation.groupBy({ by: ["status"], _count: true }),
  ]);
  const countMap: Record<string, number> = {};
  counts.forEach((c) => (countMap[c.status] = c._count));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
          Bookings
        </p>
        <h1 className="mt-1 font-serif-display text-3xl font-medium text-charcoal">
          Reservations
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Guest booking requests from the website. Confirm or cancel pending requests.
        </p>
      </header>

      <ReservationsManager
        initialReservations={reservations as any}
        counts={countMap}
        activeStatus={status || "all"}
      />
    </div>
  );
}
