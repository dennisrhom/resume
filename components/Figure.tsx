import type { ImageRef } from "@/content/types";
import { Picture } from "./Picture";

type Props = {
  image: ImageRef;
  sizes?: string;
  priority?: boolean;
  /** Small mono tag in the corner, e.g. "FIG. 02" or "CAD". */
  tag?: string;
  /** Crop to a fixed aspect ratio (object-cover) instead of the natural one. */
  aspect?: string;
  className?: string;
};

/** Framed image with drawing-style corner ticks and an optional caption. */
export function Figure({ image, sizes, priority, tag, aspect, className = "" }: Props) {
  return (
    <figure className={className}>
      <div
        className={`ticks overflow-hidden border border-line ${image.light ? "bg-white" : "bg-ink-900"}`}
        style={aspect ? { aspectRatio: aspect } : undefined}
      >
        {tag && (
          <span className="label absolute left-3 top-3 z-[3] bg-ink-950/80 px-2 py-1 text-paper backdrop-blur-sm">
            {tag}
          </span>
        )}
        <Picture
          image={image}
          sizes={sizes}
          priority={priority}
          imgClassName={aspect ? "h-full w-full object-cover" : "h-auto w-full"}
          className={aspect ? "block h-full w-full" : "block"}
        />
      </div>
      {image.caption && <figcaption className="mt-3 text-sm leading-snug text-mute">{image.caption}</figcaption>}
    </figure>
  );
}
