"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { whatsappLink } from "@/lib/site";
import { formatDateTime } from "@/lib/format-date";

interface Lead {
  id: string;
  fullName: string;
  whatsappNumber: string;
  email: string;
  villaName: string | null;
  villaLocation: string | null;
  bedrooms: string | null;
  propertyStatus: string | null;
  bookingChannels: string | null;
  managementState: string | null;
  objective: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

const STATUSES = ["all", "new", "contacted", "closed"] as const;

export function LeadsManager({
  initialLeads,
  counts,
  activeStatus,
}: {
  initialLeads: Lead[];
  counts: Record<string, number>;
  activeStatus: string;
}) {
  const router = useRouter();
  const [leads, setLeads] = React.useState(initialLeads);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  async function setStatus(id: string, status: "new" | "contacted" | "closed") {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
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
    if (!confirm("Delete this lead permanently?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete lead");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => {
          const count = s === "all" ? leads.length : counts[s] || 0;
          const isActive = activeStatus === s;
          return (
            <a
              key={s}
              href={s === "all" ? "/admin/leads" : `/admin/leads?status=${s}`}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                isActive
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-stone/70 text-muted-foreground hover:border-charcoal/30 hover:text-charcoal"
              }`}
            >
              {s}
              <span className={`rounded-full px-1.5 text-[0.6rem] ${isActive ? "bg-ivory/20" : "bg-sand"}`}>
                {count}
              </span>
            </a>
          );
        })}
      </div>

      {/* Leads list */}
      {leads.length === 0 ? (
        <div className="rounded-2xl border border-stone/70 bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No leads in this view.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="overflow-hidden rounded-2xl border border-stone/70 bg-card"
            >
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif-display text-lg font-medium text-charcoal">
                      {lead.fullName}
                    </h3>
                    <span className="rounded-full bg-sand px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                      {lead.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(lead.createdAt)}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 hover:text-tropical">
                      <Mail className="size-3" /> {lead.email}
                    </a>
                    <a
                      href={whatsappLink(`Hello ${lead.fullName}, thank you for your consultation request regarding ${lead.villaName || "your villa"}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-tropical"
                    >
                      <MessageCircle className="size-3" /> {lead.whatsappNumber}
                    </a>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground sm:grid-cols-3">
                    {lead.villaName && <div><span className="text-charcoal/50">Villa:</span> {lead.villaName}</div>}
                    {lead.villaLocation && <div><span className="text-charcoal/50">Location:</span> {lead.villaLocation}</div>}
                    {lead.bedrooms && <div><span className="text-charcoal/50">Beds:</span> {lead.bedrooms}</div>}
                    {lead.propertyStatus && <div><span className="text-charcoal/50">Status:</span> {lead.propertyStatus}</div>}
                    {lead.managementState && <div><span className="text-charcoal/50">Mgmt:</span> {lead.managementState}</div>}
                    {lead.objective && <div><span className="text-charcoal/50">Goal:</span> {lead.objective}</div>}
                  </div>
                  {lead.message && (
                    <p className="mt-3 rounded-lg bg-sand/50 p-3 text-sm text-charcoal/80">
                      &ldquo;{lead.message}&rdquo;
                    </p>
                  )}
                  {expanded === lead.id && lead.bookingChannels && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      <span className="text-charcoal/50">Booking channels:</span> {lead.bookingChannels}
                    </p>
                  )}
                </div>

                <div className="flex flex-shrink-0 flex-col items-end gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => setStatus(lead.id, e.target.value as "new" | "contacted" | "closed")}
                    disabled={busy === lead.id}
                    className="h-9 rounded-lg border border-stone/70 bg-background px-2 text-xs font-medium capitalize text-charcoal focus:border-bronze focus:outline-none"
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="closed">closed</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                      className="text-xs text-tropical hover:underline"
                    >
                      {expanded === lead.id ? "Less" : "More"}
                    </button>
                    <button
                      onClick={() => remove(lead.id)}
                      disabled={busy === lead.id}
                      aria-label="Delete lead"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-stone/70 text-muted-foreground transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      {busy === lead.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
