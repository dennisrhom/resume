import type { ImageRef } from "./types";

/**
 * Hobbies: gaming, 3D design studio, and space events.
 * To add a photo: put the original in media-src/<collection>/, run `npm run media`,
 * and add an entry below.
 */

export const gaming = {
  // TODO(links): add gaming social media links here as list items, e.g.
  // "[[https://twitch.tv/yourname|Twitch]]", and they will show under Gaming.
  links: [] as string[],
  photos: [
    {
      id: "esports/blast-cs-major-arena",
      alt: "Arena crowd watching a Counter-Strike match on a large screen at a BLAST major",
      caption: "BLAST Counter-Strike Major",
    },
    {
      id: "esports/esports-lounge",
      alt: "Three players seen from behind at gaming stations in an esports lounge with hexagonal lit walls",
      caption: "Esports lounge",
    },
    {
      id: "esports/tournament-station",
      alt: "Tournament gaming station with a monitor, keyboard, mouse, headset, and broadcast cameras",
      caption: "Tournament station",
    },
  ] satisfies ImageRef[],
};

export type Build = {
  title: string;
  source: string;
  note: string;
  images: ImageRef[];
};

/** Display replicas modeled in CAD, then printed and painted. */
export const builds: Build[] = [
  {
    title: "BlastX Odin",
    source: "*VALORANT*",
    note: "a display replica from the same skin line as the BlastX Phantom; it does not fire",
    images: [
      {
        id: "studio/blastx-odin-bench",
        alt: "BlastX Odin replica in purple, green, white, and orange, propped on a rusted metal bench",
        caption: "BlastX Odin",
      },
      {
        id: "studio/blastx-odin-printing",
        alt: "Gray Odin parts on the build plate of a Bambu Lab printer",
        caption: "Odin parts on the printer",
      },
    ],
  },
  {
    title: "Reaver Knife",
    source: "*VALORANT*",
    note: "a curved karambit-style blade with a ring pommel, painted silver with a purple edge",
    images: [
      {
        id: "studio/reaver-knife-side",
        alt: "Reaver knife replica held by its ring, silver blade with purple accent and black grip",
        caption: "Reaver Knife",
      },
    ],
  },
  {
    title: "Ion Sheriff",
    source: "*VALORANT*",
    note: "a white revolver replica",
    images: [
      {
        id: "studio/ion-sheriff",
        alt: "White Ion Sheriff revolver replica held in front of a monitor showing the same skin in game",
        caption: "Ion Sheriff beside the in-game model",
      },
    ],
  },
  {
    title: "Alphonse Elric helmet",
    source: "*Fullmetal Alchemist*",
    note: "the helmet with its horn and jaw detail, in a textured metallic gray",
    images: [
      {
        id: "studio/alphonse-elric-helmet",
        alt: "Gray metallic Alphonse Elric helmet with a single horn, held up on a gravel driveway",
        caption: "Alphonse Elric helmet",
      },
    ],
  },
];

export const spaceEvents = {
  events: ["SEDS SpaceVision 2026", "SpaceWalk III"],
  photos: [
    {
      id: "events/spacevision-2026-shuttle",
      alt: "Space shuttle replica mounted on its Boeing 747 carrier aircraft at Independence Plaza in Houston, with a thumbs-up in the foreground",
      caption: "SEDS SpaceVision 2026, Houston",
    },
    {
      id: "events/spacevision-2026-panel",
      alt: "Conference stage with a slide announcing a panel on space domain awareness and national defense",
      caption: "SpaceVision 2026 panel on space domain awareness",
    },
    {
      id: "events/spacewalk-3-badge",
      alt: "Event badge reading Space Walk III with the name Dennis Hom",
      caption: "SpaceWalk III, Houston",
    },
  ] satisfies ImageRef[],
};
