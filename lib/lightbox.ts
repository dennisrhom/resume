import type { ImageRef } from "@/content/types";
import type { LightboxItem } from "@/components/Lightbox";
import { getMedia, largest, srcSet } from "./media";

/** Turn a content image into the plain data the client-side lightbox needs. */
export function toLightboxItem(image: ImageRef, tag?: string): LightboxItem {
  const info = getMedia(image.id);
  return {
    avif: srcSet(image.id, "avif"),
    webp: srcSet(image.id, "webp"),
    src: largest(image.id, "webp", 960),
    full: largest(image.id, "webp", 1600),
    width: info.width,
    height: info.height,
    alt: image.alt,
    caption: image.caption,
    color: info.color,
    light: image.light,
    tag,
  };
}
