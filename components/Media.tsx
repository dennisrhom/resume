import type { CSSProperties } from "react";
import type { ImageRef, VideoRef } from "@/content/types";
import { getMedia, largest } from "@/lib/media";
import { Picture } from "./Picture";
import { plainText, RichText } from "./RichText";
import { Video } from "./Video";

const aspect = (id: string) => {
  const { width, height } = getMedia(id);
  return width / height;
};

/**
 * Link around an image that opens the media viewer (components/MediaViewer.tsx).
 * Without JavaScript it simply opens the full-size file.
 */
export function FileLink({
  image,
  sizes,
  style,
  priority,
}: {
  image: ImageRef;
  sizes: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <a
      href={largest(image.id, "webp", 1600)}
      className="mw-file"
      data-mv=""
      data-caption={image.caption ? plainText(image.caption) : ""}
      style={style}
    >
      <Picture image={{ ...image, alt: plainText(image.alt) }} sizes={sizes} priority={priority} />
    </a>
  );
}

/** One image floated beside the text with a caption, like a Wikipedia thumbnail. */
export function Thumb({ image, side = "right", width }: { image: ImageRef; side?: "left" | "right"; width?: number }) {
  // Portrait images get a narrower frame, like Wikipedia's "upright" thumbnails.
  width ??= aspect(image.id) < 1 ? 190 : 250;
  return (
    <figure className={`mw-thumb mw-thumb-${side}`} style={{ "--w": `${width}px` } as CSSProperties}>
      <FileLink image={image} sizes={`${width}px`} />
      {image.caption && (
        <figcaption>
          <RichText text={image.caption} />
        </figcaption>
      )}
    </figure>
  );
}

/** Several images at the same height in one frame (Template:Multiple image). */
export function MultiImage({ images, caption, width }: { images: ImageRef[]; caption?: string; width?: number }) {
  width ??= 400;
  const ratios = images.map((img) => aspect(img.id));
  const total = ratios.reduce((a, b) => a + b, 0);
  return (
    <figure className="mw-thumb mw-thumb-right mw-multi" style={{ "--w": `${width}px` } as CSSProperties}>
      <div className="mw-multi-row">
        {images.map((img, i) => (
          <FileLink
            key={img.id + i}
            image={img}
            sizes={`${Math.round((width * ratios[i]) / total)}px`}
            style={{ flex: `${ratios[i]} 1 0` }}
          />
        ))}
      </div>
      {caption && (
        <figcaption>
          <RichText text={caption} />
        </figcaption>
      )}
    </figure>
  );
}

/** A row of same-height images with captions underneath (a "packed" gallery). */
export function Gallery({ images }: { images: ImageRef[] }) {
  return (
    <ul className="mw-gallery">
      {images.map((img, i) => {
        const a = aspect(img.id);
        return (
          <li key={img.id + i} style={{ "--a": a } as CSSProperties}>
            <FileLink image={img} sizes={`${Math.round(170 * a)}px`} />
            {img.caption && (
              <div className="gallerytext">
                <RichText text={img.caption} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function VideoThumb({ video }: { video: VideoRef }) {
  return (
    <figure className="mw-thumb mw-thumb-right" style={{ "--w": "320px" } as CSSProperties}>
      <Video
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        label={video.caption ?? "Video"}
      />
      {video.caption && (
        <figcaption>
          <RichText text={video.caption} />
        </figcaption>
      )}
    </figure>
  );
}
