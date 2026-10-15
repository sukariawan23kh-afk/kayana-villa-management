"use client";

import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

export function Process() {
  const { t } = useLanguage();
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-charcoal py-20 text-ivory sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Center / left line */}
          <div
            className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-bronze/10 via-bronze/40 to-bronze/10 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-8 md:space-y-0">
            {t.process.items.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={i}
                  className="relative md:grid md:grid-cols-2 md:gap-12 md:py-5"
                >
                  {/* Node */}
                  <span
                    className="absolute left-4 top-1 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-bronze/40 bg-charcoal font-serif-display text-sm font-medium text-bronze-light md:left-1/2"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <Reveal
                    delay={60}
                    className={cn(
                      "pl-10 md:pl-0",
                      isLeft
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    )}
                  >
                    <h3 className="font-serif-display text-xl font-medium text-ivory sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/65">
                      {step.text}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
