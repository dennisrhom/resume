"use client";
import { useEffect, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
}

interface Props {
  sections: NavSection[];
}

export default function DotNav({ sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          title={label}
          style={{ position: "relative", display: "flex", alignItems: "center" }}
          className="dot-nav-item"
        >
          {/* Dot */}
          <span
            style={{
              display: "block",
              width: active === id ? "8px" : "6px",
              height: active === id ? "8px" : "6px",
              borderRadius: "50%",
              background: active === id ? "var(--accent-1)" : "transparent",
              border: `1px solid ${active === id ? "var(--accent-1)" : "var(--fg-muted)"}`,
              transition: "all 0.25s ease",
              opacity: active === id ? 1 : 0.5,
            }}
          />
          {/* Label (shown on hover via sibling CSS) */}
          <span
            className="dot-label"
            style={{
              position: "absolute",
              right: "1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              color: "var(--fg-muted)",
              whiteSpace: "nowrap",
              opacity: 0,
              transition: "opacity 0.2s ease",
              pointerEvents: "none",
            }}
          >
            {label}
          </span>
          <style>{`
            .dot-nav-item:hover .dot-label { opacity: 1 !important; }
          `}</style>
        </a>
      ))}
    </nav>
  );
}
