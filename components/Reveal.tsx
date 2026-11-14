"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal that cannot hide content.
 *
 * Every [data-reveal] element is fully visible in the HTML and stays that way
 * if this script never runs. When an element that started below the fold comes
 * into view, it gets a one-off entrance animation (class "reveal-run"). The CSS
 * for that class only applies under html.js-reveal, which is set here once the
 * IntersectionObserver exists. Nothing is ever left at opacity 0:
 * - no JS, no hydration, or no IntersectionObserver: no class, no animation
 * - prefers-reduced-motion: skipped entirely
 * - every animation is force-finished by a timer, in case it never ticks
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const seen = new WeakSet<Element>();
    const timers = new Set<number>();
    let io: IntersectionObserver;

    const finish = (el: Element) => el.classList.remove("reveal-run");

    try {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.unobserve(entry.target);
            entry.target.classList.add("reveal-run");
            entry.target.addEventListener("animationend", () => finish(entry.target), { once: true });
            // Fallback: back to the plain visible state after 1.2 s no matter what.
            const t = window.setTimeout(() => {
              finish(entry.target);
              timers.delete(t);
            }, 1200);
            timers.add(t);
          }
        },
        // Threshold 0 plus a margin below the viewport, so tall grids trigger as soon as their top edge is near.
        { rootMargin: "0px 0px 80px 0px", threshold: 0 },
      );
    } catch {
      return; // observer unavailable: leave everything visible
    }
    root.classList.add("js-reveal");

    const scan = () => {
      const limit = window.innerHeight + 80;
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Already on screen (first load, refresh mid-page, anchor jump): leave it alone, no flash.
        if (el.getBoundingClientRect().top < limit) return;
        io.observe(el);
      });
    };
    scan();

    // Pick up content that arrives after this effect (client-side navigation, streamed sections).
    let queued = 0;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      if (queued) cancelAnimationFrame(queued);
      timers.forEach((t) => clearTimeout(t));
      document.querySelectorAll(".reveal-run").forEach(finish);
      root.classList.remove("js-reveal");
    };
  }, [pathname]);

  return null;
}

/**
 * Images lazy-load so the first paint stays fast. Once the page has finished
 * loading and the browser is idle, load the rest in the background so nothing
 * is still blank by the time someone scrolls (or prints, or screenshots).
 * Skipped when the visitor has data saver on.
 */
export function ImageWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") return;

    let idle = 0;
    let timer = 0;
    const warm = () => {
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
        img.loading = "eager";
        // Decode as well as download, so an image that has not been on screen yet still paints right away.
        const decode = () => img.decode?.().catch(() => {});
        if (img.complete) decode();
        else img.addEventListener("load", decode, { once: true });
      });
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(warm, { timeout: 2500 });
      else timer = setTimeout(warm, 1200) as unknown as number;
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idle && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
