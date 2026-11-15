import { entriesIn, entryHref, hasPage } from "@/lib/entries";
import { about } from "./about";
import { experience } from "./experience";
import { builds, gaming, spaceEvents } from "./hobbies";
import { site } from "./site";
import type { Article, Block, Entry, ImageRef, Section } from "./types";

/**
 * The main article (the home page). Section text lives here; project summaries
 * come from content/projects.ts and content/coursework.ts, experience from
 * content/experience.ts, and hobby photos from content/hobbies.ts.
 *
 * Section links use the heading with spaces turned into underscores,
 * e.g. [[#Texas_eSports|Texas eSports]].
 */

/** A project's short summary, with a "Main article" link when it has its own page. */
function summarySection(entry: Entry, thumb?: ImageRef): Section {
  const blocks: Block[] = hasPage(entry)
    ? [{ type: "hatnote", text: `Main article: [[${entryHref(entry)}|${entry.title}]]` }]
    : [];
  if (thumb) blocks.push({ type: "thumb", image: thumb });
  blocks.push({ type: "prose", paragraphs: [entry.summary] });
  return { heading: entry.title, blocks };
}

const thumbs: Record<string, ImageRef> = {
  "blastx-phantom": {
    id: "blastx-phantom/finished-bench",
    alt: "BlastX Phantom replica: a full-size green, purple, white, and orange dart blaster resting on a metal bench",
    caption: "The BlastX Phantom replica",
  },
  "cfd-openfoam": {
    id: "cfd/double-ramp-mach-25deg",
    alt: "Mach number contour of supersonic flow over a 25 degree double ramp showing two oblique shocks and their reflection",
    caption: "Mach 3 flow over a 25° double ramp, from the CFD final project",
  },
  "dragonfly-wind-tunnel": {
    id: "dragonfly/smoke-body-tripped",
    alt: "Black scale model of the Dragonfly aircraft in a wind tunnel with white tufts and a smoke stream passing over the body",
    caption: "The *Dragonfly* model in the wind tunnel",
  },
};

const personal = entriesIn("personal");
const academic = entriesIn("academic");
const edu = about.education;

const list = (items: readonly string[]) => items.join(" · ");

export const mainArticle: Article = {
  title: site.name,
  description: site.description,

  infobox: {
    title: site.name,
    // TODO(photo): add a photo of yourself here once you have one, e.g.
    // image: { id: "profile/dennis-hom", alt: "Dennis Hom", caption: "Hom in 2026" },
    // Until then the infobox keeps an empty space where the photo will go.
    imagePlaceholder: true,
    rows: [
      { label: "Born", value: `May 1, 2003 {{age|${site.born}}}` },
      { label: "Education", value: `${edu.school} (${edu.shortDegree}, ${edu.year}; GPA ${edu.gpa})` },
      { label: "Occupation", value: "Aerospace engineer" },
      { label: "Location", value: site.location },
      { header: "Links" },
      { label: "Email", value: `[[mailto:${site.email}|${site.email}]]` },
      { label: "LinkedIn", value: `[[${site.links.linkedin}|dennisrhom]]` },
      { label: "GitHub", value: `[[${site.links.github}|dennisrhom]]` },
    ],
  },

  lead: [
    {
      type: "prose",
      paragraphs: [
        `I'm **Dennis Hom** (born May 1, 2003), an American aerospace engineer from Conroe, Texas. I graduated from ${edu.school} in ${edu.date} with a ${edu.degree}.`,
        `My projects include a [[/blastx-phantom/|full-size, dart-firing replica]] of the BlastX Phantom from *VALORANT*, a [[/nasa-usdc-9/|passive fluid-delivery test system]] for NASA's University Student Design Challenge, and a [[/propeller-thrust-optimization/|strain-gage propeller thrust stand]]. Since May 2025 I have done [[#AI_training|AI training]] work for Handshake AI and Mercor. I co-founded the mousepad company [[#Pegasi_Peripherals|Pegasi Peripherals]] and the collegiate esports organization [[#Texas_eSports|Texas eSports]].`,
        "I'm looking for an entry-level engineering role, with aerospace and defense as my first choice.",
      ],
    },
  ],

  sections: [
    {
      heading: "Education",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            `I attended ${edu.school}, graduating in ${edu.date} with a ${edu.degree} and a GPA of ${edu.gpa}.`,
          ],
        },
      ],
      subsections: [
        {
          heading: "Coursework",
          blocks: [
            { type: "hatnote", text: "See also: [[#Academic_projects|§ Academic projects]]" },
            { type: "list", intro: "Relevant coursework:", items: about.coursework, columns: true },
          ],
        },
        {
          heading: "Extracurricular activities",
          blocks: [
            { type: "hatnote", text: "Further information: [[#Texas_eSports|§ Texas eSports]]" },
            {
              type: "prose",
              paragraphs: [
                "At UT Austin I co-founded the collegiate esports organization Texas eSports, which I was part of from 2021 until I graduated.",
              ],
            },
          ],
        },
      ],
    },

    {
      heading: "Projects",
      subsections: [
        {
          heading: "Personal projects",
          subsections: personal.map((e) => summarySection(e, thumbs[e.slug])),
        },
        {
          heading: "Academic projects",
          subsections: academic.map((e) => summarySection(e, thumbs[e.slug])),
        },
      ],
    },

    {
      heading: "Experience",
      subsections: experience.map((role) => ({
        heading: role.heading,
        blocks: [
          ...(role.image ? [{ type: "thumb", image: role.image } satisfies Block] : []),
          { type: "prose", paragraphs: role.paragraphs },
        ],
      })),
    },

    {
      heading: "Hobbies",
      subsections: [
        {
          heading: "Gaming",
          blocks: [
            { type: "hatnote", text: "See also: [[#Texas_eSports|§ Texas eSports]]" },
            {
              type: "prose",
              paragraphs: [
                "I play *VALORANT* competitively and captained the Texas eSports varsity roster. I also follow esports and attend live events.",
              ],
            },
            ...(gaming.links.length ? [{ type: "list", items: gaming.links } satisfies Block] : []),
            { type: "gallery", images: gaming.photos },
          ],
        },
        {
          heading: "3D design studio",
          blocks: [
            { type: "hatnote", text: "See also: [[/blastx-phantom/|BlastX Phantom]]" },
            {
              type: "list",
              intro:
                "I model display replicas from video games and anime in CAD, then 3D print and paint them. Builds include:",
              items: builds.map((b) => `**${b.title}** (${b.source}): ${b.note}.`),
            },
            { type: "gallery", images: builds.flatMap((b) => b.images) },
          ],
        },
        {
          heading: "Space events",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                `I attend space industry events in Houston, including ${spaceEvents.events.join(" and ")}.`,
              ],
            },
            { type: "gallery", images: spaceEvents.photos },
          ],
        },
      ],
    },

    {
      heading: "Skills",
      blocks: [
        {
          type: "table",
          columns: ["Area", "Skills"],
          rows: [
            ["Software", list(about.skills.software)],
            ["Hardware", list(about.skills.hardware)],
            ["Languages", list(about.skills.languages)],
          ],
        },
      ],
    },

    {
      heading: "External links",
      blocks: [
        {
          type: "list",
          items: [
            `Email: [[mailto:${site.email}|${site.email}]]`,
            `[[${site.links.linkedin}|Dennis Hom]] on LinkedIn`,
            `[[${site.links.github}|dennisrhom]] on GitHub`,
          ],
        },
      ],
    },
  ],
};
