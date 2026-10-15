"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type CtaVariant = "solid" | "outline" | "light";

interface CTAProps extends React.ComponentProps<"a"> {
  variant?: CtaVariant;
  withArrow?: boolean;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const sizes = "h-12 px-7";

const variants: Record<CtaVariant, string> = {
  solid:
    "bg-charcoal text-ivory hover:bg-tropical-deep shadow-[0_10px_30px_-12px_rgba(28,26,23,0.45)] hover:shadow-[0_14px_36px_-12px_rgba(28,26,23,0.5)]",
  outline:
    "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  light:
    "bg-ivory text-charcoal hover:bg-bronze-light shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)]",
};

export const CTA = React.forwardRef<HTMLAnchorElement, CTAProps>(
  ({ className, variant = "solid", withArrow = true, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(base, sizes, variants[variant], className)}
        {...props}
      >
        {children}
        {withArrow && (
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </a>
    );
  }
);
CTA.displayName = "CTA";
