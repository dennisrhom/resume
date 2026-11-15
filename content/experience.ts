import type { Role } from "./types";

/** Experience, most recent first. Titles and dates match the résumé. */
export const experience: Role[] = [
  {
    heading: "AI training",
    paragraphs: [
      "Since May 2025 I have worked part time, remotely, as a contract AI trainer for Handshake AI and Mercor, evaluating large language model output on engineering and technical reasoning.",
      "I write domain-specific prompts and reference solutions in mechanics, dynamics, thermodynamics, and CAD modeling for frontier model training at leading AI labs, and grade model responses against structured rubrics, including multimodal and video tasks. I have evaluated more than 500 model outputs for accuracy and coherence.",
    ],
  },
  {
    heading: "Pegasi Peripherals",
    image: {
      id: "pegasi/glass-pad-god-of-speed",
      alt: "Pegasi glass mousepad with an illustrated winged figure among clouds and pegasi, standing on a desk beside a white mouse",
      caption: "A Pegasi glass mousepad",
    },
    paragraphs: [
      "From August 2025 to March 2026 I was co-founder and operations lead of Pegasi Peripherals, a performance mousepad brand based in Dallas, Texas. I owned material research, spec definition, and vendor outreach.",
      "I negotiated minimum order quantity, unit cost, and lead time with more than 10 manufacturers, and managed production runs, logistics, and artist collaborations. The company delivered more than 500 orders and $20,000 in revenue.",
    ],
  },
  {
    heading: "Texas eSports",
    image: {
      id: "esports/red-bull-campus-clutch",
      alt: "Stage at a Red Bull Campus Clutch VALORANT event with large screens and player desks under blue lighting",
      caption: "Red Bull Campus Clutch",
    },
    paragraphs: [
      "I co-founded Texas eSports, a collegiate esports organization in Austin, in August 2021 and stayed with it until I graduated in May 2025.",
      "I coordinated logistics for collegiate tournaments across multiple game titles, each hosting more than 100 participants, and led outreach to professional players and gaming influencers for public events. I also captained the varsity *VALORANT* roster, which reached a national top-10 ranking across multiple seasons and tournaments.",
    ],
  },
];
