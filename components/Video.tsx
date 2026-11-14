"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; width: number; height: number; label: string };

/** Muted looping video that plays while on screen. Controls stay available. No autoplay with reduced motion. */
export function Video({ src, poster, width, height, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="h-auto w-full bg-black"
      width={width}
      height={height}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="none"
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
