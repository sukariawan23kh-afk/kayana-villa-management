import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  Home,
  HelpCircle,
  Quote,
  Settings,
  CalendarCheck,
  ExternalLink,
} from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/admin/villas", label: "Villas", icon: Home },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-stone/70 bg-ivory lg:flex">
          <div className="border-b border-stone/70 px-6 py-5">
            <span className="flex flex-col leading-none">
              <span className="font-serif-display text-lg font-semibold tracking-[0.18em]">
                KAYANA
              </span>
              <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.42em] text-muted-foreground">
                Admin CMS
              </span>
            </span>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sand hover:text-charcoal"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-2 border-t border-stone/70 p-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone/70 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-charcoal/30 hover:text-charcoal"
            >
              <ExternalLink className="size-3.5" />
              View website
            </Link>
            <LogoutButton />
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-stone/70 bg-ivory/90 px-4 py-3 backdrop-blur lg:hidden">
          <span className="font-serif-display text-sm font-semibold tracking-[0.18em]">
            KAYANA <span className="text-muted-foreground">Admin</span>
          </span>
          <div className="flex items-center gap-1">
            <nav className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-sand hover:text-charcoal"
                    title={item.label}
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </nav>
            <LogoutButton />
          </div>
        </div>

        {/* Main content */}
        <main className="min-h-screen flex-1 lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:px-10 lg:pt-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
