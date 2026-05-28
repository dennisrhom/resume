"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GAMES, Game, RankData } from "@/data/ranks";

const CYCLE_MS = 5000;

function GameIcon({ id }: { id: Game }) {
  const icons: Record<Game, string> = {
    valorant:  "V",
    cs2:       "CS",
    apex:      "APX",
    overwatch: "OW",
  };
  return (
    <span
      style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.05em" }}
      className="opacity-50"
    >
      {icons[id]}
    </span>
  );
}

interface GameData extends RankData {
  cached?: boolean;
  loading?: boolean;
}

export default function RankTracker() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [data, setData] = useState<Record<Game, GameData>>({
    valorant:  { tier: "…", loading: true },
    cs2:       { tier: "…", loading: true },
    apex:      { tier: "…", loading: true },
    overwatch: { tier: "…", loading: true },
  });

  // Fetch all games on mount
  useEffect(() => {
    GAMES.forEach(({ id }) => {
      fetch(`/api/ranks/${id}`)
        .then((r) => r.json())
        .then((json: GameData) =>
          setData((prev) => ({ ...prev, [id]: { ...json, loading: false } }))
        )
        .catch(() =>
          setData((prev) => ({
            ...prev,
            [id]: { tier: "TBD", cached: true, loading: false },
          }))
        );
    });
  }, []);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActiveIdx((i) => (i + 1) % GAMES.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  const prev = useCallback(() =>
    setActiveIdx((i) => (i - 1 + GAMES.length) % GAMES.length), []);
  const next = useCallback(() =>
    setActiveIdx((i) => (i + 1) % GAMES.length), []);

  const activeGame = GAMES[activeIdx];
  const activeData = data[activeGame.id];

  return (
    <div
      aria-label="Live rank tracker — cycles between games"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        border: "1px solid var(--border-strong)",
        padding: "1.25rem",
        width: "100%",
        maxWidth: "340px",
        position: "relative",
        background: "rgba(5, 6, 10, 0.6)",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: "var(--fg-muted)",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span className="pulse-dot" />
        // LIVE RANK
      </div>

      {/* Main content */}
      <div style={{ minHeight: "80px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: activeGame.accent,
            marginBottom: "0.25rem",
            opacity: 0.8,
          }}
        >
          {activeGame.label}
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
            minHeight: "2.2rem",
          }}
        >
          {activeData.loading ? (
            <span style={{ color: "var(--fg-muted)", fontSize: "0.75rem" }}>
              // fetching…
            </span>
          ) : (
            activeData.tier
          )}
        </div>

        {!activeData.loading && activeData.rr != null && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--fg-muted)",
              marginTop: "0.25rem",
            }}
          >
            {activeData.rr} RR
          </div>
        )}

        {activeData.account && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--fg-muted)",
              marginTop: "0.35rem",
              opacity: 0.6,
            }}
          >
            {activeData.account}
          </div>
        )}

        {activeData.cached && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--accent-2)",
              marginTop: "0.5rem",
              opacity: 0.6,
              letterSpacing: "0.08em",
            }}
          >
            cached
          </div>
        )}
      </div>

      {/* Prev/Next + pips */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.25rem",
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous game"
          style={{
            background: "none",
            border: "none",
            color: "var(--fg-muted)",
            cursor: "pointer",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChevronLeft size={14} />
        </button>

        {/* Pips */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {GAMES.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActiveIdx(i)}
              aria-label={`Switch to ${g.label}`}
              aria-pressed={i === activeIdx}
              style={{
                width: i === activeIdx ? "16px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  i === activeIdx ? "var(--accent-2)" : "var(--border-strong)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next game"
          style={{
            background: "none",
            border: "none",
            color: "var(--fg-muted)",
            cursor: "pointer",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
