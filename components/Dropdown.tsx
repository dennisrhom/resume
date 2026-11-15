"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

type Props = {
  className?: string;
  label: string;
  icon: ReactNode;
  align?: "left" | "right";
  children: (close: () => void) => ReactNode;
};

/** Icon button that opens a floating panel. Closes on outside click or Escape. */
export function Dropdown({ className = "", label, icon, align = "left", children }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={`mp-dropdown ${className}`}>
      <button
        ref={button}
        type="button"
        className="mp-icon-btn"
        aria-label={label}
        title={label}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {icon}
      </button>
      {open && (
        <div id={id} className={`mp-dropdown-panel mp-dropdown-${align}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}
