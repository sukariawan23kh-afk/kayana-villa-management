import Link from "next/link";
import { Inbox, Home, HelpCircle, Quote, ArrowRight, CalendarCheck } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { formatDate } from "@/lib/format-date";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [leadCount, newLeadsCount, villaCount, faqCount, testimonialCount, publishedTestimonials, reservationCount, pendingReservations, recentLeads] =
    await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: "new" } }),
      db.villa.count(),
      db.faq.count(),
      db.testimonial.count(),
      db.testimonial.count({ where: { published: true } }),
      db.reservation.count(),
      db.reservation.count({ where: { status: "pending" } }),
      db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Total Leads", value: leadCount, sub: `${newLeadsCount} new`, icon: Inbox, href: "/admin/leads" },
    { label: "Reservations", value: reservationCount, sub: `${pendingReservations} pending`, icon: CalendarCheck, href: "/admin/reservations" },
    { label: "Villas", value: villaCount, sub: "in portfolio", icon: Home, href: "/admin/villas" },
    { label: "FAQs", value: faqCount, sub: "published", icon: HelpCircle, href: "/admin/faqs" },
    { label: "Testimonials", value: testimonialCount, sub: `${publishedTestimonials} live`, icon: Quote, href: "/admin/testimonials" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-tropical">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif-display text-3xl font-medium text-charcoal">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Manage your villa portfolio, leads, FAQs, testimonials and site settings.
        </p>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-2xl border border-stone/70 bg-card p-5 transition-all hover:border-charcoal/20 hover:shadow-[0_20px_50px_-40px_rgba(28,26,23,0.5)]"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-sand text-tropical">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-serif-display text-3xl font-medium text-charcoal">
                {s.value}
              </p>
              <p className="text-sm font-medium text-charcoal">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent leads */}
      <section className="rounded-2xl border border-stone/70 bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif-display text-xl font-medium text-charcoal">
            Recent Consultation Requests
          </h2>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1 text-sm font-medium text-tropical hover:underline"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No leads yet. When villa owners submit the contact form, they will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-stone/70">
            {recentLeads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-charcoal">
                    {lead.fullName}{" "}
                    <span className="font-normal text-muted-foreground">
                      · {lead.email}
                    </span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {lead.villaName || "No villa name"} ·{" "}
                    {lead.villaLocation || "No location"}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <span className="rounded-full bg-sand px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                    {lead.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
