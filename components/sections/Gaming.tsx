"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { RankBadge } from "@/components/ui/RankBadge";
import { GAMES, Game, RankData, manualRanks } from "@/data/ranks";
import { achievements } from "@/data/gaming";

const GAME_IGN: Record<Game, string> = {
  valorant:  "peppa#lchbx",
  cs2:       "TBD", // TODO: fill in your Faceit username
  apex:      "TBD", // TODO: fill in your EA username
  overwatch: "TBD", // TODO: fill in your BattleTag
};

const GAME_VIBE: Record<Game, string> = {
  valorant:  "Main game. Duelist / Initiator.",
  cs2:       "Classic. Never stopped loving it.",
  apex:      "Movement shooter itch.",
  overwatch: "Tank main. Sometimes flex.",
};

const GAME_ACCENT: Record<Game, string> = {
  valorant:  "#c0392b",
  cs2:       "#e8a317",
  apex:      "#cc3a22",
  overwatch: "#f47521",
};

function StatLine({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value == null) return null;
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)", opacity: 0.55, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--fg)", letterSpacing: "0.03em" }}>
        {value}
      </span>
    </div>
  );
}

function GameCard({ game, idx }: { game: (typeof GAMES)[number]; idx: number }) {
  const data: RankData = manualRanks[game.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      style={{
        border: "1px solid var(--border)",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "1.25rem",
        alignItems: "start",
      }}
    >
      {/* Accent stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: GAME_ACCENT[game.id], opacity: 0.55 }} />

      {/* Rank badge */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
        <RankBadge game={game.id} size={72} label={`${game.label} rank badge`} />
      </div>

      {/* Info */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
          <span
            className="glitch-text"
            data-text={game.label}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600, color: "var(--fg)", letterSpacing: "0.1em" }}
          >
            {game.label}
          </span>
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.63rem", color: "var(--fg-muted)", opacity: 0.55, marginBottom: "0.75rem", letterSpacing: "0.03em" }}>
          {GAME_IGN[game.id]}
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--fg)", fontWeight: 400, lineHeight: 1.2, marginBottom: "0.4rem" }}>
            {data.tier}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {game.id === "valorant" && <StatLine label="RR" value={data.rr} />}
            {game.id === "cs2" && data.faceitElo != null && <StatLine label="ELO" value={data.faceitElo} />}
            {game.id === "cs2" && data.faceitLevel != null && <StatLine label="LEVEL" value={data.faceitLevel} />}
            {game.id === "apex" && data.sr != null && <StatLine label="LP" value={data.sr} />}
            {game.id === "overwatch" && data.sr != null && <StatLine label="SR" value={data.sr} />}
          </div>
        </div>

        <div style={{ fontSize: "0.82rem", color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.45 }}>
          {GAME_VIBE[game.id]}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gaming() {
  return (
    <section
      id="gaming"
      style={{ padding: "7rem max(2rem, 8vw)", maxWidth: "1100px", margin: "0 auto", width: "100%" }}
    >
      <SectionHeading
        num="06 / GAMING"
        title="Gaming"
        subtitle="// where most of my evenings go"
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "580px", marginBottom: "3rem" }}
      >
        Co-founded{" "}
        <strong style={{ color: "var(--fg)", fontWeight: 500 }}>Texas Esports</strong>{" "}
        at UT Austin — competitive gaming org with 100+ active members. Led VALORANT
        Varsity to multiple top-3 regional finishes and a national top-10 ranking.
        Raised $2K, ran logistics for 50+ tournament participants, and did creator
        outreach reaching audiences over 1 million.
      </motion.p>

      {/* Game cards with live ranks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {GAMES.map((game, i) => (
          <GameCard key={game.id} game={game} idx={i} />
        ))}
      </div>

      {/* Achievements mono block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ borderLeft: "1px solid var(--border-strong)", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}
      >
        {achievements.map(({ label, value }) => (
          <div key={label} style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.05em" }}>
            <span style={{ color: "var(--accent-2)", marginRight: "0.75rem" }}>{label}</span>
            <span style={{ color: "var(--fg-muted)" }}>— {value}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
