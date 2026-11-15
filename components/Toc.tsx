"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/outline";
import { setPref } from "@/lib/prefs-client";
import { Dropdown } from "./Dropdown";

/** Ids in document order. */
const flatten = (items: TocItem[]): string[] => items.flatMap((i) => [i.id, ...flatten(i.children)]);

/** Ids from the top level down to `id`. */
function pathTo(items: TocItem[], id: string | null): string[] {
  if (!id) return [];
  for (const item of items) {
    if (item.id === id) return [item.id];
    const sub = pathTo(item.children, id);
    if (sub.length) return [item.id, ...sub];
  }
  return [];
}

/** The last heading that has scrolled past the top of the window. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > 90) break;
        current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true">
    <path d="m7 1-1.5 1.5L13 10l-7.5 7.5L7 19l9-9z" fill="currentColor" />
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M1 3h2v2H1zm4 0h14v2H5zM1 9h2v2H1zm4 0h14v2H5zm-4 6h2v2H1zm4 0h14v2H5z" fill="currentColor" />
  </svg>
);

/** The contents list: "(Top)" plus every section, top-level sections collapsible. */
function TocList({ items, onNavigate }: { items: TocItem[]; onNavigate?: () => void }) {
  const ids = useMemo(() => flatten(items), [items]);
  const active = useActiveSection(ids);
  const path = pathTo(items, active);
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  const renderItems = (list: TocItem[], depth: number) =>
    list.map((item) => {
      const collapsible = depth === 0 && item.children.length > 0;
      const open = collapsible ? (toggled[item.id] ?? path.includes(item.id)) : true;
      return (
        <li key={item.id} className={path.includes(item.id) ? "is-active" : undefined}>
          {collapsible && (
            <button
              type="button"
              className="mp-toc-toggle"
              aria-expanded={open}
              aria-label={`Toggle ${item.label} subsection`}
              onClick={() => setToggled((t) => ({ ...t, [item.id]: !open }))}
            >
              <Chevron />
            </button>
          )}
          <a href={`#${item.id}`} onClick={onNavigate}>
            {item.label}
          </a>
          {item.children.length > 0 && open && <ul>{renderItems(item.children, depth + 1)}</ul>}
        </li>
      );
    });

  return (
    <ul className="mp-toc">
      <li className={active === null ? "is-active" : undefined}>
        <a href="#top" onClick={onNavigate}>
          (Top)
        </a>
      </li>
      {renderItems(items, 0)}
    </ul>
  );
}

/** Contents pinned in the left sidebar. */
export function TocPanel({ items }: { items: TocItem[] }) {
  return (
    <div className="mp-panel">
      <div className="mp-panel-head">
        <h2 className="mp-panel-title">Contents</h2>
        <button type="button" className="mp-hide" onClick={() => setPref("toc", "hidden")}>
          hide
        </button>
      </div>
      <TocList items={items} />
    </div>
  );
}

/** Button beside the title that opens the contents when they are not in the sidebar. */
export function TocButton({ items }: { items: TocItem[] }) {
  return (
    <Dropdown className="mp-toc-btn" label="Toggle the table of contents" icon={<ListIcon />}>
      {(close) => (
        <div className="mp-panel mp-panel-toc">
          <div className="mp-panel-head">
            <h2 className="mp-panel-title">Contents</h2>
            <button
              type="button"
              className="mp-hide mp-pin mp-pin-toc"
              onClick={() => {
                setPref("toc", "pinned");
                close();
              }}
            >
              move to sidebar
            </button>
          </div>
          <TocList items={items} onNavigate={close} />
        </div>
      )}
    </Dropdown>
  );
}
