"use client";

import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export function WhyKayana() {
  const { t } = useLanguage();
  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          description={t.why.description}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-stone/70 bg-stone/60 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {t.why.items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className="h-full">
              <div className="group flex h-full flex-col gap-3 bg-card p-7 transition-colors duration-400 hover:bg-sand/40 sm:p-8">
                <span className="font-serif-display text-sm font-medium text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif-display text-xl font-medium text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
                <span className="mt-auto h-px w-10 origin-left scale-x-100 bg-bronze/50 transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
