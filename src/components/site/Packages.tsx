"use client";

import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

export function Packages() {
  const { t } = useLanguage();
  return (
    <section className="bg-sand/50 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.packages.eyebrow}
          title={t.packages.title}
          description={t.packages.description}
        />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:items-stretch">
          {t.packages.items.map((pkg, i) => (
            <Reveal key={i} delay={i * 100} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[1.5rem] border p-7 transition-all duration-500 sm:p-8",
                  i === 1
                    ? "border-charcoal bg-charcoal text-ivory shadow-[0_36px_80px_-44px_rgba(28,26,23,0.6)] lg:-my-3 lg:py-11"
                    : "border-stone/70 bg-card text-charcoal hover:border-charcoal/25 hover:shadow-[0_24px_60px_-44px_rgba(28,26,23,0.5)]"
                )}
              >
                {i === 1 && (
                  <span className="absolute right-6 top-7 inline-flex items-center gap-1.5 rounded-full bg-bronze px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-charcoal">
                    {t.packages.recommended}
                  </span>
                )}

                <h3
                  className={cn(
                    "font-serif-display text-2xl font-medium",
                    i === 1 ? "text-ivory" : "text-charcoal"
                  )}
                >
                  {pkg.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm font-medium",
                    i === 1 ? "text-bronze-light" : "text-tropical"
                  )}
                >
                  {pkg.tagline}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    i === 1 ? "text-ivory/70" : "text-muted-foreground"
                  )}
                >
                  {pkg.description}
                </p>

                <div
                  className={cn(
                    "my-6 h-px w-full",
                    i === 1 ? "bg-ivory/15" : "bg-stone"
                  )}
                />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        "flex items-center gap-2.5 text-sm",
                        i === 1 ? "text-ivory/85" : "text-charcoal/80"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-5 flex-shrink-0 items-center justify-center rounded-full",
                          i === 1
                            ? "bg-tropical/30 text-bronze-light"
                            : "bg-tropical/12 text-tropical"
                        )}
                      >
                        <Check className="size-3" aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <CTA
                  href="#contact"
                  variant={i === 1 ? "light" : "outline"}
                  withArrow
                  className="mt-7 w-full"
                >
                  {t.packages.cta}
                </CTA>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-xs italic leading-relaxed text-muted-foreground/80">
            {t.packages.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
