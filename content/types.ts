/**
 * Shared content types. Every page on the site is an Article: a lead, an
 * optional infobox, and a list of sections made of blocks. Edit the files in
 * /content to change text, add photos, or add sections. No component changes needed.
 *
 * Text fields accept a little wiki-style markup:
 *   [[/blastx-phantom/|BlastX Phantom]]   link to another article
 *   [[#Education|Education]]              link to a section on the same page
 *   [[https://example.com|label]]         external link
 *   **bold**   *italic*
 */

/** A processed image. `id` is "<collection>/<name>" from media-src (see README). */
export type ImageRef = {
  id: string;
  alt: string;
  caption?: string;
  /** Set for charts and scans with a white background so they keep it in dark mode. */
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

export type Block =
  /** Paragraphs of text. */
  | { type: "prose"; paragraphs: string[] }
  /** Bulleted or numbered list. `columns` splits a long list into columns. */
  | { type: "list"; intro?: string; items: string[]; ordered?: boolean; columns?: boolean }
  /** A "wikitable". */
  | { type: "table"; intro?: string; caption?: string; columns: string[]; rows: string[][]; note?: string }
  /** One captioned image floated beside the text. */
  | { type: "thumb"; image: ImageRef; side?: "left" | "right"; width?: number }
  /** Two or more images in one captioned frame, same height. */
  | { type: "multi"; images: ImageRef[]; caption?: string; width?: number }
  /** A row of images with captions underneath. */
  | { type: "gallery"; intro?: string; images: ImageRef[] }
  /** A video in a thumbnail frame. `null` hides the block until a video is added. */
  | { type: "video"; video: VideoRef | null }
  /** Italic, indented note at the top of a section, e.g. "Main article: …". */
  | { type: "hatnote"; text: string };

export type Section = {
  heading: string;
  blocks?: Block[];
  subsections?: Section[];
};

export type InfoboxRow = { label: string; value: string } | { header: string };

export type Infobox = {
  /** Defaults to the article title. */
  title?: string;
  image?: ImageRef;
  /** With no `image`, reserve an empty portrait-sized space where the photo will go. */
  imagePlaceholder?: boolean;
  rows: InfoboxRow[];
};

export type Article = {
  title: string;
  /** Used for the page's meta description. */
  description: string;
  infobox?: Infobox;
  /** Blocks above the first section. */
  lead: Block[];
  sections: Section[];
};

type EntryBase = {
  slug: string;
  title: string;
  /** Personal projects and academic projects are listed separately on the main article. */
  category: "personal" | "academic";
  /** The short summary shown on the main article under "Projects". */
  summary: string;
};

/** A project or coursework write-up with its own article at /<slug>/. */
export type PageEntry = EntryBase & {
  page?: true;
  /** Opening paragraphs of the entry's own article. */
  lead: string[];
  infobox: Infobox;
  sections: Section[];
};

/** A project shown only as a summary on the main article, with no page of its own. */
export type SummaryEntry = EntryBase & { page: false };

export type Entry = PageEntry | SummaryEntry;

/** A job or organization under "Experience" on the main article. */
export type Role = {
  heading: string;
  paragraphs: string[];
  image?: ImageRef;
};
