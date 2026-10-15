"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em]",
              light ? "text-bronze-light" : "text-tropical"
            )}
          >
            <span className="h-px w-6 bg-current opacity-60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={cn(
            "font-serif-display text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.9rem]",
            light ? "text-ivory" : "text-charcoal"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
              light ? "text-ivory/75" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
