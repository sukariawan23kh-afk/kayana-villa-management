"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VillaCarouselProps {
  images: string[];
  alt: string;
  /** Show arrow controls + dot indicators. Default true. */
  controls?: boolean;
}

/**
 * Image carousel for villa cards — auto-rotates every 4s, with
 * manual prev/next arrows + dot indicators. Pauses on hover.
 */
export function VillaCarousel({ images, alt, controls = true }: VillaCarouselProps) {
  const allImages = images.filter(Boolean);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const total = allImages.length;

  // Clamp index when images change (e.g. villa data loads).
  React.useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [total, index]);

  // Auto-rotate.
  React.useEffect(() => {
    if (total <= 1 || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, paused]);

  if (total === 0) return null;

  function go(dir: -1 | 1) {
    setIndex((prev) => (prev + dir + total) % total);
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {allImages.map((src, i) => (
        <div
          key={`slide-${i}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={src}
            alt={`${alt} — image ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Gradient overlay (for hover effect) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 [.group:hover_&]:opacity-100" />

      {/* Arrow controls */}
      {controls && total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-charcoal opacity-0 backdrop-blur transition-all duration-300 hover:bg-ivory [.group:hover_&]:opacity-100"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              go(1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-charcoal opacity-0 backdrop-blur transition-all duration-300 hover:bg-ivory [.group:hover_&]:opacity-100"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {controls && total > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
          {allImages.map((url, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-ivory" : "w-1.5 bg-ivory/50 hover:bg-ivory/80"
              )}
            />
          ))}
        </div>
      )}

      {/* Image counter badge */}
      {total > 1 && (
        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-charcoal/60 px-2 py-0.5 text-[0.6rem] font-medium text-ivory backdrop-blur">
          {index + 1} / {total}
        </span>
      )}
    </div>
  );
}
