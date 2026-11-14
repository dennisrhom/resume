/**
 * Shared content types. Pages are built from these; edit the files in
 * /content to change text, add photos, or add whole sections. No component
 * changes needed.
 */

/** A processed image. `id` is "<collection>/<name>" from media-src (see README). */
export type ImageRef = {
  id: string;
  alt: string;
  caption?: string;
  /** Set for charts and scans with a white background so they get a light frame. */
  light?: boolean;
};

export type VideoRef = {
  /** Paths under /public, e.g. "/media/video/blastx-phantom-firing.mp4". */
  src: string;
  poster: string;
  width: number;
  height: number;
  caption?: string;
};

type BlockHead = {
  /** Small mono label above the heading, e.g. "02 / Approach". */
  kicker?: string;
  heading?: string;
};

/**
 * Page building blocks. A project page is just an ordered list of these, so
 * adding an FMEA table or a new test-case section is one more object in the array.
 */
export type Block =
  | (BlockHead & { type: "prose"; paragraphs: string[] })
  | (BlockHead & { type: "list"; intro?: string; items: string[]; ordered?: boolean })
  | (BlockHead & { type: "specs"; intro?: string; rows: { label: string; value: string }[] })
  | (BlockHead & { type: "stats"; items: { value: string; label: string }[] })
  | (BlockHead & { type: "figure"; image: ImageRef })
  | (BlockHead & { type: "gallery"; intro?: string; columns?: 2 | 3; images: ImageRef[] })
  | (BlockHead & {
      type: "compare";
      intro?: string;
      /** CSS aspect ratio both sides are cropped to, e.g. "16/9". Default "16/10". */
      aspect?: string;
      /** `contain: true` letterboxes that side instead of cropping it. */
      left: ImageRef & { label: string; contain?: boolean };
      right: ImageRef & { label: string; contain?: boolean };
    })
  | (BlockHead & {
      type: "table";
      intro?: string;
      columns: string[];
      rows: string[][];
      note?: string;
    })
  | (BlockHead & { type: "steps"; intro?: string; items: { title: string; body: string }[] })
  | (BlockHead & { type: "split"; paragraphs: string[]; image: ImageRef; flip?: boolean })
  | (BlockHead & { type: "video"; intro?: string; video: VideoRef | null })
  | { type: "callout"; title: string; body: string; href?: string; linkLabel?: string };

export type Entry = {
  slug: string;
  /** Which section it lives in: "home" is /home/<slug>/, "school" is /school/<slug>/. */
  group: "home" | "school";
  title: string;
  /** One line under the title. */
  subtitle: string;
  dates: string;
  /** Where it happened or which course it was for. */
  context: string;
  /** Short text for cards and meta descriptions. */
  summary: string;
  /** 2 to 3 bullets for cards. Keep these in line with the résumé. */
  highlights: string[];
  tags: string[];
  /** Card and page hero image. Leave out if there are no photos yet. */
  cover?: ImageRef;
  /** Shown on cards that have no cover image. */
  metric?: { value: string; label: string };
  /** The "title block" facts at the top of the page. */
  facts: { label: string; value: string }[];
  blocks: Block[];
};

export type Role = {
  slug: string;
  org: string;
  title: string;
  dates: string;
  location: string;
  summary: string;
  bullets: string[];
  images?: ImageRef[];
};
