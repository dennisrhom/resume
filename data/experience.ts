export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
  tags?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "pegasi",
    company: "Pegasi Peripherals",
    role: "Product Operations Lead",
    period: "Aug 2025 – Present",
    current: true,
    bullets: [
      "Co-founded a passion project designing high-performance mousepads; led material research and vendor outreach.",
      "Negotiated with 10+ manufacturers, managing specs, MOQ, margins, and production workflows.",
      "Oversaw 500+ orders and $20K+ revenue, coordinating logistics, shipping, and collabs with artists and suppliers.",
    ],
    tags: ["OPERATIONS", "PRODUCT", "MANUFACTURING"],
  },
  {
    id: "mercor",
    company: "Mercor Intelligence",
    role: "Prompt Engineer",
    period: "May 2025 – Present",
    current: true,
    bullets: [
      "Engineered complex prompts targeting <70% model success to surface reasoning gaps in frontier LLMs.",
      "Ranked 500+ multimodal AI outputs (image/audio/video) for alignment and coherence.",
      "Worked with top AI labs on next-gen LLM engineering reasoning capability.",
    ],
    tags: ["AI", "PROMPT-ENG", "REMOTE"],
  },
  {
    id: "handyman",
    company: "Handyman Assistant",
    role: "Handyman Assistant",
    period: "Summer 2025",
    current: false,
    bullets: [
      "Assisted licensed handyman across HVAC, electrical, plumbing, and fencing while operating safely.",
      "Delivered reliable labor on residential projects including painting and flooring.",
    ],
    tags: ["HVAC", "ELECTRICAL", "PLUMBING"],
  },
];
