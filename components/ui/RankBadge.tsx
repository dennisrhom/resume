"use client";
import { useState } from "react";
import Image from "next/image";

// File map — place PNGs in public/rank-badges/ with these exact names
const PNG_PATHS: Record<string, string> = {
  "valorant":  "/rank-badges/valorant-immortal2.png",
  "cs2":       "/rank-badges/faceit-10.png",          // TODO: save image 4 here
  "apex":      "/rank-badges/apex-diamond2.png",
  "overwatch": "/rank-badges/overwatch-diamond.webp",
};

// ── SVG fallbacks (shown while PNG loads or if file is missing) ──────────────

function RadiantSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="34" stroke="#f5c842" strokeWidth="0.5" opacity="0.2" />
      <polygon points="36,6 66,58 6,58" fill="rgba(245,200,66,0.08)" stroke="#f5c842" strokeWidth="1.2" />
      <polygon points="36,18 56,52 16,52" fill="rgba(245,200,66,0.22)" />
      <polygon points="36,26 44,40 28,40" fill="rgba(245,220,100,0.7)" />
      <line x1="36" y1="3" x2="36" y2="6" stroke="#f5c842" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="3" fill="#f5c842" opacity="0.9" />
    </svg>
  );
}

function MastersSVG({ color = "#b482ff" }: { color?: string }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <path d="M36 4 L62 16 L62 40 L36 68 L10 40 L10 16 Z" fill={`${color}10`} stroke={color} strokeWidth="1.2" />
      <path d="M36 14 L54 23 L54 39 L36 58 L18 39 L18 23 Z" fill={`${color}18`} stroke={color} strokeWidth="0.6" opacity="0.5" />
      <path d="M22 26 L28 20 L36 26 L44 20 L50 26" stroke={color} strokeWidth="1.4" fill="none" />
      <circle cx="22" cy="26" r="2" fill={color} opacity="0.7" />
      <circle cx="36" cy="26" r="2.5" fill={color} opacity="0.9" />
      <circle cx="50" cy="26" r="2" fill={color} opacity="0.7" />
      <polygon points="36,33 42,40 36,47 30,40" fill={`${color}60`} />
      <circle cx="36" cy="40" r="3.5" fill={color} opacity="0.7" />
    </svg>
  );
}

function DiamondSVG({ color = "#4aa8ff" }: { color?: string }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <polygon points="36,4 68,36 36,68 4,36" fill={`${color}10`} stroke={color} strokeWidth="1.2" />
      <polygon points="36,14 58,36 36,58 14,36" fill={`${color}20`} stroke={color} strokeWidth="0.6" opacity="0.6" />
      <polygon points="36,14 58,36 36,36" fill={`${color}35`} />
      <polygon points="36,14 36,36 14,36" fill={`${color}18`} />
      <polygon points="36,24 46,36 36,48 26,36" fill={`${color}55`} />
      <circle cx="36" cy="36" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function FaceitSVG({ level = 10 }: { level?: number }) {
  const color = "#ff3b1e";
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="32" fill="#111" />
      <path d="M36 8 A28 28 0 1 1 8.7 50" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      <text x="36" y="43" textAnchor="middle" fill={color} fontSize="22" fontWeight="700" fontFamily="monospace">
        {level}
      </text>
    </svg>
  );
}

// OW2 Diamond — crystal gem with V-chevron, matches the actual badge shape
function OW2DiamondSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Outer crystal shards (wing-like) */}
      <polygon points="8,36 18,24 22,36 18,48"  fill="#2a6cc4" opacity="0.7" />
      <polygon points="64,36 54,24 50,36 54,48" fill="#2a6cc4" opacity="0.7" />
      {/* Top crystal */}
      <polygon points="36,4 44,20 36,26 28,20"  fill="#5aabf0" opacity="0.9" />
      {/* Bottom crystal */}
      <polygon points="36,68 44,52 36,46 28,52" fill="#3a8cd8" opacity="0.8" />
      {/* Center body */}
      <polygon points="20,22 52,22 58,36 52,50 20,50 14,36" fill="#1a5aaa" opacity="0.5" />
      <polygon points="24,26 48,26 54,36 48,46 24,46 18,36" fill="#4090e0" opacity="0.6" />
      {/* OW V-chevron */}
      <path d="M26 30 L36 44 L46 30" stroke="#a8d8ff" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* Inner highlight */}
      <polygon points="28,28 44,28 48,36 44,44 28,44 24,36" fill="#70b8ff" opacity="0.12" />
      <circle cx="36" cy="36" r="4" fill="#c8eaff" opacity="0.5" />
    </svg>
  );
}

// ── FALLBACK_SVG map ──────────────────────────────────────────────────────────
const FALLBACKS: Record<string, React.ReactNode> = {
  valorant:  <MastersSVG color="#b8956a" />,
  cs2:       <FaceitSVG level={10} />,
  apex:      <DiamondSVG color="#4aa8ff" />,
  overwatch: <OW2DiamondSVG />,
};

// ── Main export ───────────────────────────────────────────────────────────────
interface Props {
  game: "valorant" | "cs2" | "apex" | "overwatch";
  size?: number;
  label?: string;
}

export function RankBadge({ game, size = 72, label }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = PNG_PATHS[game];

  if (!src || imgFailed) {
    return (
      <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {FALLBACKS[game] ?? <DiamondSVG />}
      </div>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={src}
        alt={label ?? `${game} rank badge`}
        width={size}
        height={size}
        style={{ objectFit: "contain", imageRendering: "crisp-edges" }}
        onError={() => setImgFailed(true)}
        priority={false}
      />
    </div>
  );
}

// Legacy export kept for any callers using TierKey
export type TierKey = "radiant" | "diamond" | "masters" | "predator" | "faceit10" | "faceit9";
