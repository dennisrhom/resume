import type { ImageRef } from "./types";

/**
 * Things I did for fun.
 * `builds`: display replicas designed in CAD, printed, and painted.
 * `events`: photos from space events.
 * To add a build or photo: put originals in media-src/studio/ or media-src/events/,
 * run `npm run media`, and add an entry below.
 */
export type Build = {
  slug: string;
  title: string;
  source: string;
  note: string;
  images: ImageRef[];
};

export const studioIntro =
  "Display pieces I modeled in CAD, then printed and painted because I wanted them. None of these are functional. They just look cool.";

export const builds: Build[] = [
  {
    slug: "blastx-odin",
    title: "BlastX Odin",
    source: "VALORANT",
    note: "A display replica from the same skin line as the Phantom. This one doesn't shoot.",
    images: [
      {
        id: "studio/blastx-odin-bench",
        alt: "BlastX Odin replica in purple, green, white, and orange, propped on a rusted metal bench",
      },
      {
        id: "studio/blastx-odin-handheld",
        alt: "BlastX Odin replica held up by its drum magazine in front of a yard at sunset",
      },
      {
        id: "studio/blastx-odin-printing",
        alt: "Gray Odin parts on the build plate of a Bambu Lab printer",
        caption: "Parts on the printer.",
      },
    ],
  },
  {
    slug: "reaver-knife",
    title: "Reaver Knife",
    source: "VALORANT",
    note: "A curved karambit-style blade with a ring pommel. I painted it silver with a purple edge.",
    images: [
      {
        id: "studio/reaver-knife-side",
        alt: "Reaver knife replica held by its ring, silver blade with purple accent and black grip",
      },
      {
        id: "studio/reaver-knife-top",
        alt: "Reaver knife replica lying in an open palm, seen from above",
      },
    ],
  },
  {
    slug: "ion-sheriff",
    title: "Ion Sheriff",
    source: "VALORANT",
    note: "A white revolver replica. Here it is next to the in-game model I built it from.",
    images: [
      {
        id: "studio/ion-sheriff",
        alt: "White Ion Sheriff revolver replica held in front of a monitor showing the same skin in game",
      },
    ],
  },
  {
    slug: "alphonse-elric-helmet",
    title: "Alphonse Elric Helmet",
    source: "Fullmetal Alchemist",
    note: "The helmet, with the horn and the jaw detail. The finish is a textured metallic gray.",
    images: [
      {
        id: "studio/alphonse-elric-helmet",
        alt: "Gray metallic Alphonse Elric helmet with a single horn, held up on a gravel driveway",
      },
    ],
  },
];

export const events = {
  heading: "Around the space community",
  intro: "A few photos from space events I've been to in Houston.",
  photos: [
    {
      id: "events/spacevision-2026-shuttle",
      alt: "Space shuttle replica mounted on its Boeing 747 carrier aircraft at Independence Plaza in Houston, with a thumbs-up in the foreground",
      caption: "SEDS SpaceVision 2026, Houston.",
    },
    {
      id: "events/spacevision-2026-panel",
      alt: "Conference stage with a slide announcing a panel on space domain awareness and national defense",
      caption: "SpaceVision 2026 panel on space domain awareness.",
    },
    {
      id: "events/spacewalk-3-badge",
      alt: "Event badge reading Space Walk III with the name Dennis Hom",
      caption: "SpaceWalk III, Houston.",
    },
  ] satisfies ImageRef[],
};
