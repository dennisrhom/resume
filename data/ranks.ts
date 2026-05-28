import type { TierKey } from "@/components/ui/RankBadge";

export type Game = "valorant" | "cs2" | "apex" | "overwatch";

export interface RankData {
  tier: string;
  rr?: number | null;         // Valorant RR
  elo?: number | null;         // CS2 Premier ELO
  faceitLevel?: number | null; // Faceit level 1-10
  faceitElo?: number | null;   // Faceit ELO
  sr?: number | null;          // Overwatch SR/rank points
  winRate?: string | null;
  kd?: string | null;
  account?: string;
  note?: string;
  tierKey?: TierKey;           // maps to SVG badge component
}

// Edit this file to keep ranks current when the API isn't configured.
export const manualRanks: Record<Game, RankData> = {
  valorant: {
    tier: "Immortal 2",
    rr: 164,
    account: "peppa#lchbx",
    tierKey: "masters",
    note: "Live via Henrik-3 API",
  },
  cs2: {
    tier: "Faceit Level 10",
    faceitLevel: 10,
    faceitElo: 2014,
    tierKey: "faceit10",
    note: "Update ELO manually or set FACEIT_API_KEY",
  },
  apex: {
    tier: "Diamond 2",
    tierKey: "diamond",
    note: "Update with current split rank",
  },
  overwatch: {
    tier: "Diamond 2",
    sr: null,
    tierKey: "diamond",
    note: "Set OW_BATTLETAG in .env.local for live data",
  },
};

export const GAMES: { id: Game; label: string; accent: string }[] = [
  { id: "valorant",  label: "VALORANT",  accent: "#c0392b" },
  { id: "cs2",       label: "CS2",       accent: "#e8a317" },
  { id: "apex",      label: "APEX",      accent: "#cc3a22" },
  { id: "overwatch", label: "OVERWATCH", accent: "#f47521" },
];
