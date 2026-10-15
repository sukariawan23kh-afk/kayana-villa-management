"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail, MessageCircle, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { whatsappLink } from "@/lib/site";
import { formatDate, formatDateTime } from "@/lib/format-date";
import { cn } from "@/lib/utils";

interface Reservation {
  id: string;
  villaId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number | null;
  currency: string;
  status: string;
  notes: string | null;
  createdAt: string;
  villa: { name: string; location: string; image: string };
}

const STATUSES = ["all", "pending", "confirmed", "cancelled"] as const;

const STATUS_META: Record<string, { icon: any; cls: string; label: string }> = {
  pending: { icon: Clock, cls: "bg-bronze/15 text-bronze", label: "Pending" },
  confirmed: { icon: CheckCircle2, cls: "bg-tropical/15 text-tropical", label: "Confirmed" },
  cancelled: { icon: XCircle, cls: "bg-red-100 text-red-600", label: "Cancelled" },
};

export function ReservationsManager({
  initialReservations,
  counts,
  activeStatus,
}: {
  initialReservations: Reservation[];
  counts: Record<string, number>;
  activeStatus: string;
}) {
  const router = useRouter();
  const [reservations, setReservations] = React.useState(initialReservations);
  const [busy, setBusy] = React.useState<string | null>(null);

  async function setStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast.success(`Marked as ${status}`);
      router.refresh();
    } catch (e) {
      toast.error("Failed to update status");
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this reservation permanently?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setReservations((prev) => prev.filter((r) => r.id !== id));
      toast.success("Reservation deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => {
          const count = s === "all" ? reservations.length : counts[s] || 0;
          const isActive = activeStatus === s;
          return (
            <a
              key={s}
              href={s === "all" ? "/admin/reservations" : `/admin/reservations?status=${s}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
                isActive
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-stone/70 text-muted-foreground hover:border-charcoal/30 hover:text-charcoal"
              )}
            >
              {s}
              <span className={cn("rounded-full px-1.5 text-[0.6rem]", isActive ? "bg-ivory/20" : "bg-sand")}>
                {count}
              </span>
            </a>
          );
        })}
      </div>

      {reservations.length === 0 ? (
        <div className="rounded-2xl border border-stone/70 bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No reservations in this view. When guests book a villa, they will appear here.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {reservations.map((r) => {
            const meta = STATUS_META[r.status] ?? STATUS_META.pending;
            const StatusIcon = meta.icon;
            const nights = Math.max(
              1,
              Math.round(
                (new Date(r.checkOut).getTime() - new Date(r.checkIn).getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            );
            return (
              <li
                key={r.id}
                className="overflow-hidden rounded-2xl border border-stone/70 bg-card"
              >
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif-display text-lg font-medium text-charcoal">
                        {r.guestName}
                      </h3>
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide", meta.cls)}>
                        <StatusIcon className="size-3" />
                        {r.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(r.createdAt)}
                      </span>
                      <span className="rounded-full bg-sand px-2 py-0.5 text-[0.6rem] font-medium text-bronze">
                        #{r.id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <a href={`mailto:${r.guestEmail}`} className="inline-flex items-center gap-1 hover:text-tropical">
                        <Mail className="size-3" /> {r.guestEmail}
                      </a>
                      <a
                        href={whatsappLink(`Hello ${r.guestName}, regarding your booking for ${r.villa.name}.`,)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-tropical"
                      >
                        <MessageCircle className="size-3" /> {r.guestPhone}
                      </a>
                      <span>👥 {r.guests} guests</span>
                    </div>
                    <div className="mt-3 rounded-lg bg-sand/40 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-serif-display text-base font-medium text-charcoal">
                            {r.villa.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{r.villa.location}</p>
                        </div>
                        {r.totalAmount != null && (
                          <p className="text-right">
                            <span className="font-serif-display text-lg font-medium text-tropical">
                              ${r.totalAmount.toLocaleString()}
                            </span>
                            <span className="ml-1 text-xs text-muted-foreground">{r.currency}</span>
                          </p>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal/80">
                        <span>
                          <span className="text-muted-foreground">Check-in:</span>{" "}
                          {formatDate(r.checkIn)}
                        </span>
                        <span>
                          <span className="text-muted-foreground">Check-out:</span>{" "}
                          {formatDate(r.checkOut)}
                        </span>
                        <span className="rounded-full bg-ivory px-2 py-0.5 text-bronze">
                          {nights} night{nights > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    {r.notes && (
                      <p className="mt-2 rounded-lg border border-stone/60 p-2.5 text-xs italic text-muted-foreground">
                        &ldquo;{r.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <select
                      value={r.status}
                      onChange={(e) => setStatus(r.id, e.target.value as any)}
                      disabled={busy === r.id}
                      className="h-9 rounded-lg border border-stone/70 bg-background px-2 text-xs font-medium capitalize text-charcoal focus:border-bronze focus:outline-none"
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                    <button
                      onClick={() => remove(r.id)}
                      disabled={busy === r.id}
                      aria-label="Delete reservation"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-stone/70 text-muted-foreground transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      {busy === r.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
