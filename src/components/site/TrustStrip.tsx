"use client";

import { Building2, LineChart, ShieldCheck, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "./LanguageProvider";

const ICONS = [Building2, LineChart, ShieldCheck, MapPin];

export function TrustStrip() {
  const { t } = useLanguage();
  return (
    <section className="relative z-10 -mt-px border-y border-stone/70 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul className="grid grid-cols-1 divide-y divide-stone/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0">
          {t.trust.map((p, i) => {
            const Icon = ICONS[i] ?? Building2;
            return (
              <li key={i} className="py-7 sm:px-6 lg:py-9">
                <Reveal delay={i * 90} className="h-full">
                  <div className="flex h-full flex-col gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-bronze/30 bg-sand/60 text-tropical">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif-display text-lg font-medium text-charcoal">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
