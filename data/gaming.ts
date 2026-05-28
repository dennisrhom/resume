export interface GameCard {
  id: string;
  name: string;
  ign: string;           // TODO: Dennis to fill in actual IGN per game
  accentColor: string;   // muted brand color
  vibeNote: string;      // TODO: Dennis to personalize
}

export const gameCards: GameCard[] = [
  {
    id: "valorant",
    name: "VALORANT",
    ign: "peppa#lchbx",
    accentColor: "#8b2d2d",
    vibeNote: "Peak Radiant 821RR",
  },
  {
    id: "cs2",
    name: "CS2",
    ign: "peppa", // TODO: fill in Steam handle
    accentColor: "#a07a18",
    vibeNote: "",
  },
  {
    id: "apex",
    name: "APEX",
    ign: "peppa", // TODO: fill in EA handle
    accentColor: "#8c3018",
    vibeNote: "",
  },
  {
    id: "overwatch",
    name: "OVERWATCH",
    ign: "peppa", // TODO: fill in BattleTag
    accentColor: "#a34e15",
    vibeNote: "DPS > Support > Tank",
  },
];

export const achievements = [
  { label: "VALORANT VARSITY", value: "Top 3 Regional multiple" },
  { label: "TEXAS ESPORTS",    value: "Top 10 National" },
  { label: "TOURNAMENT OPS",   value: "50+ participants managed" },
  { label: "COMMUNITY",        value: "100+ active members" },
];
