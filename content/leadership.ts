import type { ImageRef } from "./types";

/** Things I led at school: Texas eSports. Facts follow the résumé; photos are decoration. */
export const leadership = {
  org: "Texas eSports",
  title: "Co-Founder",
  dates: "August 2021 to May 2025",
  location: "Austin, TX",
  summary:
    "I co-founded Texas eSports, a collegiate esports org in Austin. I ran its tournaments and captained the varsity VALORANT roster.",
  intro: [
    "I co-founded Texas eSports in August 2021 and stuck with it until I graduated in May 2025. That was on top of an aerospace course load, which in hindsight was a choice.",
    "Most of the job was logistics and people. A tournament with 100+ participants doesn't run itself, and neither does a competitive roster.",
  ],
  pillars: [
    {
      label: "Events",
      value: "100+",
      text: "I coordinated logistics for collegiate tournaments across multiple game titles. Each one hosted 100+ participants.",
    },
    {
      label: "Competition",
      value: "Top 10",
      text: "I captained the varsity VALORANT roster. We reached a national top-10 ranking across multiple seasons and tournaments.",
    },
    {
      label: "Outreach",
      value: "Pro guests",
      text: "I led outreach to pro gamers and top gaming influencers for our public events. That grew the org's size and visibility.",
    },
  ],
  // To add photos: drop originals in media-src/esports/, run `npm run media`, add a line here.
  photos: [
    {
      id: "esports/red-bull-campus-clutch",
      alt: "Stage at a Red Bull Campus Clutch VALORANT event with large screens and player desks under blue lighting",
      caption: "Red Bull Campus Clutch.",
    },
    {
      id: "esports/blast-cs-major-arena",
      alt: "Arena crowd watching a Counter-Strike match on a large screen at a BLAST major",
      caption: "BLAST Counter-Strike Major.",
    },
    {
      id: "esports/esports-lounge",
      alt: "Three players seen from behind at gaming stations in an esports lounge with hexagonal lit walls",
    },
    {
      id: "esports/tournament-station",
      alt: "Tournament gaming station with a monitor, keyboard, mouse, headset, and broadcast cameras",
    },
  ] satisfies ImageRef[],
};
