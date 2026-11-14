import manifest from "@/content/generated/media.json";

type MediaInfo = { width: number; height: number; widths: number[]; color: string };
const media = manifest as unknown as Record<string, MediaInfo>;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public path with the deploy base path (needed on GitHub Pages). */
export const asset = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

/** Look up a processed image. Fails the build on a bad id so typos never ship. */
export function getMedia(id: string): MediaInfo {
  const info = media[id];
  if (!info) {
    throw new Error(
      `Image "${id}" is not in content/generated/media.json. Add the original to media-src/ and run "npm run media".`,
    );
  }
  return info;
}

export function srcSet(id: string, format: "avif" | "webp"): string {
  return getMedia(id)
    .widths.map((w) => `${asset(`/media/${id}-${w}.${format}`)} ${w}w`)
    .join(", ");
}

export function largest(id: string, format: "avif" | "webp" = "webp", max = 1600): string {
  const { widths } = getMedia(id);
  const w = [...widths].reverse().find((x) => x <= max) ?? widths[0];
  return asset(`/media/${id}-${w}.${format}`);
}
