"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";

export function Insights() {
  const { t } = useLanguage();
  return (
    <section
      id="insights"
      className="scroll-mt-24 bg-ivory py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow={t.insights.eyebrow}
            title={t.insights.title}
            description={t.insights.description}
          />
          <Reveal delay={120} className="hidden sm:block">
            <CTA href="#contact" variant="outline" withArrow={false}>
              {t.insights.suggestCta}
            </CTA>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {t.insights.items.map((post, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <article className="group flex h-full flex-col rounded-2xl border border-stone/70 bg-card p-6 transition-all duration-500 hover:border-charcoal/20 hover:shadow-[0_24px_60px_-44px_rgba(28,26,23,0.5)] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sand px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-tropical">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-wider text-bronze">
                    <Clock className="size-3" aria-hidden />
                    {post.read}
                  </span>
                </div>
                <h3 className="mt-4 font-serif-display text-xl font-medium leading-snug text-charcoal">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-stone/70 pt-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                    {t.insights.comingSoon}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors group-hover:text-tropical">
                    {t.insights.read}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8">
          <p className="text-center text-xs italic leading-relaxed text-muted-foreground/80">
            {t.insights.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
