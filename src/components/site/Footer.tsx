"use client";

import * as React from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, MapPin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { site, whatsappLink } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";
import { useLiveSettings } from "@/lib/cms-hooks";

const SOCIAL_META = [
  { label: "Instagram", key: "instagram" as const, icon: Instagram },
  { label: "Facebook", key: "facebook" as const, icon: Facebook },
  { label: "LinkedIn", key: "linkedin" as const, icon: Linkedin },
];

const serviceHrefs = [
  "#services",
  "#performance",
  "#services",
  "#services",
  "#services",
  "#guests",
  "#performance",
];

function LegalDialog({
  open,
  onOpenChange,
  title,
  intro,
  sections,
  lastUpdated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  intro: string;
  sections: { h: string; p: string }[];
  lastUpdated: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto slim-scroll max-w-2xl bg-card p-0 sm:rounded-[1.25rem]">
        <DialogHeader className="border-b border-stone/70 px-6 py-5 text-left sm:px-8">
          <DialogTitle className="font-serif-display text-2xl font-medium text-charcoal">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {intro}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 px-6 py-6 sm:px-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h3 className="font-serif-display text-base font-medium text-charcoal">
                {s.h}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {s.p}
              </p>
            </div>
          ))}
          <p className="border-t border-stone/70 pt-4 text-xs text-muted-foreground/70">
            {lastUpdated}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Footer() {
  const { t, lang } = useLanguage();
  const live = useLiveSettings();
  const [legal, setLegal] = React.useState<"privacy" | "terms" | null>(null);

  const waNumber = live?.whatsappNumber ?? site.whatsappNumber;
  const waDisplay = live?.whatsappDisplay ?? site.whatsappDisplay;
  const email = live?.email ?? site.email;
  const location = live?.location ?? site.location;
  const socials = SOCIAL_META.map((s) => ({
    label: s.label,
    icon: s.icon,
    href: (live?.[s.key] ?? site.social[s.key]) || "#",
  }));

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.howWeWork, href: "#process" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.forOwners, href: "#owners" },
    { label: t.nav.insights, href: "#insights" },
  ];

  return (
    <footer className="mt-auto bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <span className="flex flex-col leading-none">
              <span className="font-serif-display text-2xl font-semibold tracking-[0.18em]">
                KAYANA
              </span>
              <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-ivory/55">
                {lang === "id" ? "Manajemen Villa" : "Villa Management"}
              </span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/60">
              {t.footer.brandDesc}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-bronze hover:bg-ivory/5 hover:text-bronze-light"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <FooterCol title={t.footer.nav}>
            {navItems.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Services */}
          <FooterCol title={t.footer.services}>
            {t.footer.servicesLinks.map((label, i) => (
              <FooterLink key={label} href={serviceHrefs[i] ?? "#services"}>
                {label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Contact */}
          <FooterCol title={t.footer.contact}>
            <li>
              <span className="flex items-start gap-2 text-sm text-ivory/65">
                <MapPin className="mt-0.5 size-4 flex-shrink-0 text-bronze-light/70" />
                {location}
              </span>
            </li>
            <li>
              <a
                href={whatsappLink(t.whatsapp.prefillMessage, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/65 transition-colors hover:text-bronze-light"
              >
                <MessageCircle className="size-4 flex-shrink-0 text-bronze-light/70" />
                {t.contact.whatsapp} &bull; {waDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-ivory/65 transition-colors hover:text-bronze-light"
              >
                <Mail className="size-4 flex-shrink-0 text-bronze-light/70" />
                {email}
              </a>
            </li>
          </FooterCol>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/12 pt-7 sm:flex-row">
          <p className="text-xs text-ivory/50">{t.footer.copyright}</p>
          <div className="flex items-center gap-5 text-xs">
            <button
              type="button"
              onClick={() => setLegal("privacy")}
              className="text-ivory/55 transition-colors hover:text-bronze-light"
            >
              {t.footer.privacy}
            </button>
            <span className="h-3 w-px bg-ivory/15" aria-hidden />
            <button
              type="button"
              onClick={() => setLegal("terms")}
              className="text-ivory/55 transition-colors hover:text-bronze-light"
            >
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>

      <LegalDialog
        open={legal === "privacy"}
        onOpenChange={(v) => !v && setLegal(null)}
        title={t.privacyTitle}
        intro={t.privacyIntro}
        sections={t.privacySections}
        lastUpdated={t.footer.lastUpdated}
      />
      <LegalDialog
        open={legal === "terms"}
        onOpenChange={(v) => !v && setLegal(null)}
        title={t.termsTitle}
        intro={t.termsIntro}
        sections={t.termsSections}
        lastUpdated={t.footer.lastUpdated}
      />
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-bronze-light">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-ivory/65 transition-colors hover:text-bronze-light"
      >
        {children}
        <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </Link>
    </li>
  );
}
