import { Game, RankData, manualRanks } from "@/data/ranks";

// ─── Valorant (Henrik-3) ────────────────────────────────────────────────────
// Free key: https://docs.henrikdev.xyz/ — join their Discord, run /apikey
// Set HENRIK_API_KEY in .env.local
async function fetchValorantRank(): Promise<RankData | null> {
  const key = process.env.HENRIK_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      "https://api.henrikdev.xyz/valorant/v3/mmr/na/pc/peppa/lchbx",
      { headers: { Authorization: key }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const current = json?.data?.current;
    if (!current) return null;
    const tierName: string = current.tier?.name ?? "TBD";
    return {
      tier: `${tierName}${current.rr != null ? ` — ${current.rr} RR` : ""}`,
      rr: current.rr ?? null,
      account: "peppa#lchbx",
      tierKey:
        tierName.toLowerCase() === "radiant"  ? "radiant"  :
        tierName.toLowerCase().startsWith("immortal") ? "masters" :
        "diamond",
    };
  } catch {
    return null;
  }
}

// ─── CS2 via Faceit ─────────────────────────────────────────────────────────
// Free key: https://developers.faceit.com/ — create account → My Apps → Create app
// Set FACEIT_API_KEY and FACEIT_USERNAME in .env.local
async function fetchCS2Rank(): Promise<RankData | null> {
  const key = process.env.FACEIT_API_KEY;
  const username = process.env.FACEIT_USERNAME;
  if (!key || !username) return null;
  try {
    const playerRes = await fetch(
      `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(username)}`,
      {
        headers: { Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 },
      }
    );
    if (!playerRes.ok) return null;
    const player = await playerRes.json();
    const cs2 = player?.games?.cs2 ?? player?.games?.csgo;
    if (!cs2) return null;
    const level: number = cs2.skill_level ?? 0;
    const elo: number = cs2.faceit_elo ?? 0;
    return {
      tier: `Faceit Level ${level}`,
      faceitLevel: level,
      faceitElo: elo,
      account: username,
      tierKey: level >= 10 ? "faceit10" : level >= 9 ? "faceit9" : "diamond",
    };
  } catch {
    return null;
  }
}

// ─── Apex Legends ───────────────────────────────────────────────────────────
// Free key: https://apexlegendsapi.com/ — sign up, get key
// Set APEX_API_KEY and APEX_PLAYER_NAME in .env.local
// Platform: PC / PS4 / X1
async function fetchApexRank(): Promise<RankData | null> {
  const key = process.env.APEX_API_KEY;
  const player = process.env.APEX_PLAYER_NAME;
  if (!key || !player) return null;
  try {
    const res = await fetch(
      `https://api.mozambiquehe.re/bridge?auth=${key}&player=${encodeURIComponent(player)}&platform=PC`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const ranked = json?.global?.rank;
    if (!ranked) return null;
    const tierName: string = ranked.rankName ?? "TBD";
    const score: number | null = ranked.rankScore ?? null;
    const tierLower = tierName.toLowerCase();
    return {
      tier: tierName,
      sr: score,
      account: player,
      tierKey:
        tierLower === "predator" ? "predator" :
        tierLower === "master" || tierLower === "masters" ? "masters" :
        "diamond",
    };
  } catch {
    return null;
  }
}

// ─── Overwatch 2 (OverFast community API) ───────────────────────────────────
// No Blizzard public API exists. OverFast scrapes public profiles.
// Set OW_BATTLETAG in .env.local (format: PlayerName-12345)
// Note: profile must be PUBLIC in Overwatch career profile settings
async function fetchOverwatchRank(): Promise<RankData | null> {
  const battletag = process.env.OW_BATTLETAG; // e.g. "PlayerName-12345"
  if (!battletag) return null;
  try {
    const res = await fetch(
      `https://overfast-api.tekrop.fr/players/${encodeURIComponent(battletag)}/summary`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    // OverFast returns competitive.pc.season rank info
    const comp = json?.competitive?.pc;
    if (!comp) return null;
    // Find highest role rank
    const roles = ["tank", "damage", "support"] as const;
    let highestDiv = "TBD";
    let highestTier = 0;
    for (const role of roles) {
      const r = comp[role];
      if (r?.division) {
        const t = r.tier ?? 0;
        if (t > highestTier) { highestTier = t; highestDiv = r.division; }
      }
    }
    const divLower = highestDiv.toLowerCase();
    return {
      tier: highestDiv,
      account: battletag.replace("-", "#"),
      tierKey:
        divLower === "grandmaster" || divLower === "master" ? "masters" :
        divLower === "diamond" ? "diamond" :
        "diamond",
    };
  } catch {
    return null;
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────
export async function getRank(game: Game): Promise<RankData> {
  let live: RankData | null = null;
  if (game === "valorant")  live = await fetchValorantRank();
  if (game === "cs2")       live = await fetchCS2Rank();
  if (game === "apex")      live = await fetchApexRank();
  if (game === "overwatch") live = await fetchOverwatchRank();
  return live ?? manualRanks[game];
}
