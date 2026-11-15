/** Site-wide settings: name, links, branding. */

export const site = {
  /** The wiki's name, shown top left and in browser tabs. */
  brand: "Minipedia",
  /** Shown under every article title as "From Minipedia, a mini portfolio". */
  tagline: "a mini portfolio",
  name: "Dennis Hom",
  role: "Aerospace Engineer",
  description:
    "Dennis Hom: aerospace engineer, B.S. Aerospace Engineering from UT Austin. Projects, experience, and hobbies.",
  /** Used for canonical URLs, the sitemap, and the Open Graph image. Change this when you deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dennisrhom.github.io/resume",
  born: "2003-05-01",
  location: "Conroe, Texas, U.S.",
  email: "dryanhom@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/dennisrhom",
    github: "https://github.com/dennisrhom",
  },
  eligibility: "I'm a U.S. citizen, eligible to work in the United States with no restrictions, and open to relocation.",
} as const;
