"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { CTA } from "./CTA";
import { LangToggle } from "./LangToggle";
import { useLanguage } from "./LanguageProvider";
import { useLiveSettings } from "@/lib/cms-hooks";

function KayanaMark({ className }: { className?: string }) {
  const { t, lang } = useLanguage();
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-serif-display text-xl font-semibold tracking-[0.18em] sm:text-[1.35rem]">
        KAYANA
      </span>
      <span className="mt-0.5 text-[0.55rem] font-medium uppercase tracking-[0.42em] text-muted-foreground sm:text-[0.6rem]">
        {lang === "id" ? "Manajemen Villa" : "Villa Management"}
      </span>
    </span>
  );
}

const NAV_ITEMS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "howWeWork", href: "#process" },
  { key: "portfolio", href: "#portfolio" },
  { key: "booking", href: "#portfolio" },
  { key: "forOwners", href: "#owners" },
  { key: "insights", href: "#insights" },
] as const;

export function Navbar() {
  const { t, lang } = useLanguage();
  const live = useLiveSettings();
  const waNumber = live?.whatsappNumber ?? "6281234567890";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("#home");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  React.useEffect(() => {
    const sections = NAV_ITEMS.map((l) => l.href)
      .map((href) => document.querySelector(href))
      .filter(Boolean) as Element[];

    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-stone/70 bg-ivory/85 py-2.5 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#home"
          aria-label="KAYANA Villa Management — home"
          className={cn(
            "transition-colors",
            scrolled ? "text-charcoal" : "text-charcoal"
          )}
        >
          <KayanaMark />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active === link.href
                    ? "text-charcoal"
                    : "text-muted-foreground hover:text-charcoal"
                )}
              >
                {t.nav[link.key]}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-bronze transition-transform duration-300",
                    active === link.href ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:inline-flex" />
          <CTA
            href="#contact"
            variant="solid"
            withArrow={false}
            className="hidden h-10 px-5 sm:inline-flex"
          >
            {t.nav.requestConsultation}
          </CTA>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.openMenu}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory lg:hidden"
            )}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ivory shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-stone px-6 py-5">
            <KayanaMark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6 slim-scroll">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-stone/60 py-3.5 font-serif-display text-2xl text-charcoal transition-colors hover:text-tropical"
                    style={{
                      transitionDelay: open ? `${i * 40}ms` : "0ms",
                    }}
                  >
                    {t.nav[link.key]}
                    <span className="text-xs font-sans font-medium text-bronze">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {lang === "id" ? "Bahasa" : "Language"}
              </span>
              <LangToggle />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-stone px-6 py-6">
            <CTA href="#contact" variant="solid" className="w-full" onClick={() => setOpen(false)}>
              {t.nav.requestConsultation}
            </CTA>
            <a
              href={whatsappLink(t.whatsapp.prefillMessage, waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-charcoal/25 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
            >
              {t.nav.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
