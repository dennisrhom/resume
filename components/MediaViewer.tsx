"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; alt: string; caption: string };

/**
 * Full-screen image viewer. Any link with a data-mv attribute (thumbnails,
 * galleries, infobox images) opens here instead of navigating to the file,
 * and the arrow keys step through every image on the page.
 */
export function MediaViewer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-mv]");
      if (!link || !dialog.current) return;
      e.preventDefault();
      const list: Item[] = [];
      const position = new Map<string, number>();
      document.querySelectorAll<HTMLAnchorElement>("a[data-mv]").forEach((a) => {
        if (position.has(a.href)) return;
        position.set(a.href, list.length);
        list.push({ src: a.href, alt: a.querySelector("img")?.alt ?? "", caption: a.dataset.caption ?? "" });
      });
      setItems(list);
      setIndex(position.get(link.href) ?? 0);
      dialog.current.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const step = useCallback(
    (d: number) => setIndex((i) => (items.length ? (i + d + items.length) % items.length : 0)),
    [items.length],
  );
  const close = () => dialog.current?.close();

  const current = items[index];

  return (
    <dialog
      ref={dialog}
      className="mv"
      aria-label="Media viewer"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {current && (
        <>
          <div className="mv-bar">
            <span>
              {index + 1} of {items.length}
            </span>
            <button type="button" className="mv-close" onClick={close} aria-label="Close" autoFocus>
              ×
            </button>
          </div>
          <div className="mv-stage" onClick={(e) => e.target === e.currentTarget && close()}>
            <img key={current.src} src={current.src} alt={current.alt} />
            {items.length > 1 && (
              <>
                <button type="button" className="mv-nav mv-prev" aria-label="Previous image" onClick={() => step(-1)}>
                  ‹
                </button>
                <button type="button" className="mv-nav mv-next" aria-label="Next image" onClick={() => step(1)}>
                  ›
                </button>
              </>
            )}
          </div>
          <p className="mv-caption">{current.caption || current.alt}</p>
        </>
      )}
    </dialog>
  );
}
