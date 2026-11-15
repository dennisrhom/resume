"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
        const decode = () => img.decode?.().catch(() => {});
        if (img.complete) decode();
        else img.addEventListener("load", decode, { once: true });
      });
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(warm, { timeout: 2500 });
      else timer = window.setTimeout(warm, 1200);
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
