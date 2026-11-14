"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-ink-950/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center border border-accent font-display text-sm font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-ink-950"
          >
            DH
          </span>
          <span className="font-display text-lg font-semibold tracking-wide">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`label py-2 transition-colors hover:text-paper ${
                    isActive(item.href) ? "text-accent" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-paper transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 h-px w-5 bg-paper transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line-soft bg-ink-950 lg:hidden"
      >
        <ul className="shell grid grid-cols-2 gap-x-6 py-4">
          {nav.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center gap-3 border-b border-line-soft font-display text-lg ${
                  isActive(item.href) ? "text-accent" : ""
                }`}
              >
                <span className="label w-6">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
