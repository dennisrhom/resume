"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxItem = {
  avif: string;
  webp: string;
  src: string;
  full: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  color: string;
  light?: boolean;
  /** Optional label shown over the thumbnail. */
  tag?: string;
};

type Props = {
  items: LightboxItem[];
  /** Tailwind grid classes for the thumbnail grid. */
  gridClassName?: string;
  /** CSS aspect ratio for thumbnails. Leave undefined to keep natural ratios. */
  aspect?: string;
  sizes?: string;
  /** Per-item extra classes, cycled by index (for collage layouts). */
  itemClassNames?: string[];
  showCaptions?: boolean;
  /** Thumbnails stretch to fill their grid cell (collage layouts with fixed row heights). */
  fill?: boolean;
};

/** Thumbnail grid that opens a keyboard-friendly full-size viewer. */
export function LightboxGallery({
  items,
  gridClassName = "grid gap-4 sm:grid-cols-2",
  aspect,
  sizes = "(min-width: 768px) 50vw, 100vw",
  itemClassNames,
  showCaptions = true,
  fill,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={gridClassName}>
        {items.map((item, i) => (
          <li key={item.full + i} className={itemClassNames?.[i % itemClassNames.length]}>
            <figure className={fill ? "h-full" : undefined}>
              <button
                type="button"
                onClick={() => open(i)}
                className={`ticks group relative block ${fill ? "h-full" : ""} w-full cursor-zoom-in overflow-hidden border border-line ${
                  item.light ? "bg-white" : "bg-ink-900"
                }`}
                style={aspect && !fill ? { aspectRatio: aspect } : undefined}
                aria-label={`View larger: ${item.alt}`}
              >
                {item.tag && (
                  <span className="label absolute left-3 top-3 z-[3] bg-ink-950/80 px-2 py-1 text-paper">{item.tag}</span>
                )}
                <picture className={aspect || fill ? "block h-full w-full" : "block"}>
                  <source type="image/avif" srcSet={item.avif} sizes={sizes} />
                  <source type="image/webp" srcSet={item.webp} sizes={sizes} />
                  <img
                    src={item.src}
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${aspect || fill ? "h-full w-full object-cover" : "h-auto w-full"} transition-transform duration-500 group-hover:scale-[1.025]`}
                    style={{ backgroundColor: item.light ? "#fff" : item.color }}
                  />
                </picture>
              </button>
              {showCaptions && item.caption && (
                <figcaption className="mt-3 text-sm leading-snug text-mute">{item.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink-950 p-0 text-paper backdrop:bg-black"
        aria-label="Image viewer"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="label">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="btn !min-h-10 !px-3 !py-1" autoFocus>
                Close
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={close}>
              <img
                key={current.full}
                src={current.full}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className={`max-h-full w-auto max-w-full object-contain ${current.light ? "bg-white" : ""}`}
                onClick={(e) => e.stopPropagation()}
              />
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-line bg-ink-950/80 text-xl hover:border-accent hover:text-accent"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-line bg-ink-950/80 text-xl hover:border-accent hover:text-accent"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            <p className="min-h-12 px-4 py-3 text-center text-sm text-paper-dim">{current.caption ?? current.alt}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
