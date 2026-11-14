import type { Role } from "./types";

/** Things I did at work, most recent first. Titles and dates match the résumé. */
export const experience: Role[] = [
  {
    slug: "ai-training",
    org: "Handshake AI and Mercor",
    title: "AI Training & Evaluation",
    dates: "May 2025 to present",
    location: "Remote",
    summary:
      "Part-time contract work where I evaluate what large language models put out. I grade their engineering and technical reasoning, and I write and assess prompts against detailed rubrics. Some of it is multimodal, including video.",
    bullets: [
      "I write domain-specific prompts and reference solutions in mechanics, dynamics, thermodynamics, and CAD modeling. They go toward frontier model training for leading AI labs.",
      "I've evaluated 500+ outputs for accuracy and coherence, using precise standards and structured rubrics.",
      "The work spans multiple domains and the training data has to meet quality thresholds, so it takes extreme attention to detail.",
    ],
    // Résumé title at Handshake AI: "AI Trainer".
    // TODO(Mercor): job title at Mercor is not on the résumé. Dates are shown as May 2025 to present per Dennis.
  },
  {
    slug: "pegasi-peripherals",
    org: "Pegasi Peripherals",
    title: "Operations Lead, Co-founder",
    dates: "August 2025 to March 2026",
    location: "Dallas, TX",
    summary:
      "I co-founded a performance mousepad brand and ran the supply side. That meant picking materials and specs, then dealing with manufacturers through production and shipping.",
    bullets: [
      "Co-founded the brand. I owned material research and spec definition, and I did the vendor outreach.",
      "Negotiated with 10+ manufacturers on MOQ, per-unit cost, and lead time, which protected our margins on early production.",
      "We delivered 500+ orders and $20k+ in revenue. My part was managing production runs, logistics, and artist collaborations.",
    ],
    // To add product photos: drop originals in media-src/pegasi/, run `npm run media`,
    // and add another { id: "pegasi/<name>", alt: "..." } line below.
    images: [
      {
        id: "pegasi/glass-pad-god-of-speed",
        alt: "Pegasi glass mousepad with an illustrated winged figure among clouds and pegasi, standing on a desk beside a white mouse",
        caption: "Pegasi glass mousepad.",
      },
    ],
  },
];
