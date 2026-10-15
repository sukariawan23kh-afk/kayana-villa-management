"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay in ms before the element animates in. */
  delay?: number;
  /** Render as a different element if needed. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Re-run the animation every time it enters the viewport. */
  once?: boolean;
}

/**
 * Lightweight scroll-reveal wrapper.
 * Uses IntersectionObserver + CSS transitions (defined in globals.css) to
 * avoid heavy animation libraries and keep Core Web Vitals strong.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  once = true,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}
