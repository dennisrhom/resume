/** Site-wide settings: name, links, sections, navigation. */

export const site = {
  name: "Dennis Hom",
  role: "Aerospace Engineer",
  tagline: "I design it in CAD, build it, and test it.",
  intro:
    "I graduated from UT Austin in May 2025 with a B.S. in Aerospace Engineering. I'm looking for an entry-level engineering role, aerospace and defense first.",
  description:
    "Engineering portfolio of Dennis Hom. B.S. Aerospace Engineering, UT Austin. CAD, fabrication, test rigs, and a few things built for fun.",
  /** Used for canonical URLs, the sitemap, and the Open Graph image. Change this when you deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dennisrhom.github.io/resume",
  location: "Conroe, TX",
  email: "dryanhom@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/dennisrhom",
    github: "https://github.com/dennisrhom",
  },
  /** The only PDF on the site. Replace the file in /public to update it. */
  resumePdf: "/dennis-hom-resume.pdf",
  eligibility: "I'm a U.S. citizen and eligible to work in the United States with no restrictions. I'm open to relocation.",
} as const;

/** The five groups everything on the site is sorted into. Titles and intros show on the home page and on each section page. */
export const sections = {
  home: {
    href: "/home/",
    nav: "Home",
    title: "Things I did at home",
    intro: "Personal projects. Nobody assigned these.",
  },
  school: {
    href: "/school/",
    nav: "School",
    title: "Things I did at school",
    intro:
      "Team projects and coursework from aerospace engineering at UT Austin. I wrote these up from the original reports.",
  },
  work: {
    href: "/work/",
    nav: "Work",
    title: "Things I did at work",
    intro: "Contract work grading AI models on engineering problems, and a mousepad company I co-founded.",
  },
  leadership: {
    href: "/leadership/",
    nav: "Leadership",
    title: "Things I led at school",
    intro: "I co-founded Texas eSports and stayed with it until I graduated.",
  },
  fun: {
    href: "/fun/",
    nav: "Fun",
    title: "Things I did for fun",
    intro: "Replicas I modeled and printed because I wanted them, and a few space events I went to.",
  },
} as const;

export type SectionKey = keyof typeof sections;

export const nav = [
  ...Object.values(sections).map((s) => ({ href: s.href, label: s.nav })),
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

/**
 * Old URLs from the first version of the site. Each one gets a small page
 * that forwards to the new address, so old links never 404.
 */
export const redirects: Record<string, string> = {
  "/projects/": "/home/",
  "/projects/blastx-phantom/": "/home/blastx-phantom/",
  "/projects/home-chicken-coop/": "/home/chicken-coop/",
  "/projects/nasa-usdc-9/": "/school/nasa-usdc-9/",
  "/projects/propeller-thrust-optimization/": "/school/propeller-thrust-optimization/",
  "/coursework/": "/school/",
  "/coursework/cfd-openfoam/": "/school/cfd-openfoam/",
  "/coursework/dragonfly-wind-tunnel/": "/school/dragonfly-wind-tunnel/",
  "/coursework/walle-lunar-mission/": "/school/walle-lunar-mission/",
  "/coursework/electromechanical-systems/": "/school/electromechanical-systems/",
  "/experience/": "/work/",
  "/studio/": "/fun/",
};
