"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CTA } from "./CTA";
import { useLanguage } from "./LanguageProvider";
import { useCmsContent } from "@/lib/cms-hooks";

export function FAQ() {
  const { t, lang } = useLanguage();
  const cms = useCmsContent();
  const isId = lang === "id";

  const items = (cms?.faqs?.length
    ? cms.faqs.map((f) => ({
        q: isId ? f.questionId || f.questionEn : f.questionEn,
        a: isId ? f.answerId || f.answerEn : f.answerEn,
      }))
    : t.faq.items
  ).slice(0, 13);

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-gradient-to-b from-ivory to-sand/40 py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left intro */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={t.faq.eyebrow}
              title={t.faq.title}
              description={t.faq.description}
            />
            <Reveal delay={120}>
              <CTA href="#contact" variant="solid" withArrow>
                {t.faq.askCta}
              </CTA>
            </Reveal>
          </div>

          {/* Accordion */}
          <Reveal delay={80}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-stone/70 data-[state=open]:border-charcoal/20"
                >
                  <AccordionTrigger className="py-5 text-left font-serif-display text-lg font-medium text-charcoal hover:no-underline sm:text-xl">
                    <span className="flex gap-3">
                      <span className="font-sans text-xs font-medium text-bronze">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
