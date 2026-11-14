import type { ImageRef } from "@/content/types";
import { getMedia, largest, srcSet } from "@/lib/media";

type Props = {
  image: ImageRef;
  /** CSS sizes hint, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes?: string;
  /** Load eagerly with high priority. Use once per page, for the main image. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Responsive AVIF/WebP image with fixed dimensions (no layout shift) and lazy loading. */
export function Picture({ image, sizes = "100vw", priority, className, imgClassName }: Props) {
  const info = getMedia(image.id);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(image.id, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image.id, "webp")} sizes={sizes} />
      <img
        src={largest(image.id, "webp", 960)}
        width={info.width}
        height={info.height}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={imgClassName}
        style={{ backgroundColor: image.light ? "#ffffff" : info.color }}
      />
    </picture>
  );
}
