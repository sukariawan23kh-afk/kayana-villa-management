"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import {
  TrendingUp,
  ConciergeBell,
  Sparkles,
  Wrench,
  Megaphone,
  ClipboardList,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

const ICONS = [TrendingUp, ConciergeBell, Sparkles, Wrench, Megaphone, ClipboardList];

export function Services() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-gradient-to-b from-sand/40 to-ivory py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={
            <>
              {t.services.title1}
              <br className="hidden sm:block" /> {t.services.title2}
            </>
          }
          description={t.services.description}
        />

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-5">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i] ?? TrendingUp;
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={(i % 2) * 80}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-500 sm:p-8",
                    isOpen
                      ? "border-charcoal/25 shadow-[0_28px_60px_-40px_rgba(28,26,23,0.55)]"
                      : "border-stone/70 hover:border-charcoal/20 hover:shadow-[0_20px_50px_-40px_rgba(28,26,23,0.45)]"
                  )}
                >
                  {/* Number watermark */}
                  <span className="pointer-events-none absolute -right-2 -top-3 font-serif-display text-7xl font-semibold text-stone/60 transition-colors duration-500 group-hover:text-sand sm:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-bronze/30 bg-sand/70 text-tropical transition-colors duration-500 group-hover:bg-tropical group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-serif-display text-xl font-medium text-charcoal sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Expandable features */}
                  <div
                    className="relative grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      marginTop: isOpen ? "1.25rem" : "0",
                    }}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-1 gap-x-4 gap-y-2 border-t border-stone/70 pt-4 sm:grid-cols-2">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-sm text-charcoal/80"
                          >
                            <span className="size-1.5 rounded-full bg-bronze" aria-hidden />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="relative mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-charcoal transition-colors hover:text-tropical"
                  >
                    {isOpen ? (
                      <Minus className="size-4" aria-hidden />
                    ) : (
                      <Plus className="size-4" aria-hidden />
                    )}
                    {isOpen ? t.services.showLess : t.services.learnMore}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
