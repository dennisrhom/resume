import Link from "next/link";
import type { Block, ImageRef } from "@/content/types";
import { asset, getMedia } from "@/lib/media";
import { toLightboxItem } from "@/lib/lightbox";
import { Figure } from "./Figure";
import { LightboxGallery } from "./Lightbox";
import { Picture } from "./Picture";
import { Video } from "./Video";

/** Heading shared by every block type. */
function Head({ kicker, heading }: { kicker?: string; heading?: string }) {
  if (!kicker && !heading) return null;
  return (
    <header className="mb-6 max-w-3xl">
      {kicker && <p className="label label-accent mb-3">{kicker}</p>}
      {heading && <h2 className="text-2xl font-semibold sm:text-3xl">{heading}</h2>}
    </header>
  );
}

const Intro = ({ text }: { text?: string }) =>
  text ? <p className="mb-6 max-w-3xl text-paper-dim">{text}</p> : null;

function CompareSide({
  image,
  aspect,
  sizes,
}: {
  image: ImageRef & { label: string; contain?: boolean };
  aspect: string;
  sizes: string;
}) {
  return (
    <figure>
      <div className="ticks relative overflow-hidden border border-line bg-ink-900" style={{ aspectRatio: aspect }}>
        <span className="label absolute left-3 top-3 z-[3] bg-ink-950/85 px-2 py-1 text-accent">{image.label}</span>
        <Picture
          image={image}
          sizes={sizes}
          className="block h-full w-full"
          imgClassName={`h-full w-full ${image.contain ? "object-contain" : "object-cover"}`}
        />
      </div>
      {image.caption && <figcaption className="mt-3 text-sm leading-snug text-mute">{image.caption}</figcaption>}
    </figure>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <>
          <Head {...block} />
          <div className="prose-body max-w-3xl text-lg text-paper-dim">
            {block.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <List className="max-w-3xl divide-y divide-line-soft border-y border-line-soft">
            {block.items.map((item, i) => {
              // "Label: rest" or a short "Label. Rest" (5 words or fewer) gets the label in the display face.
              const hit = /^([^.:]{2,60})([.:])\s+(.*)$/.exec(item);
              const m = hit && (hit[2] === ":" || hit[1].trim().split(/\s+/).length <= 5) ? hit : null;
              return (
                <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-4">
                  <span className="label pt-1 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-paper-dim">
                    {m ? (
                      <>
                        <strong className="font-display font-semibold text-paper">
                          {m[1]}
                          {m[2]}
                        </strong>{" "}
                        {m[3]}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              );
            })}
          </List>
        </>
      );
    }

    case "specs":
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <dl className="max-w-4xl border-t border-line">
            {block.rows.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-line-soft py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="label pt-1">{row.label}</dt>
                <dd className="text-paper-dim">{row.value}</dd>
              </div>
            ))}
          </dl>
        </>
      );

    case "stats":
      return (
        <>
          <Head {...block} />
          <dl className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {block.items.map((s) => (
              <div key={s.label} className="flex flex-col-reverse border-b border-r border-line bg-ink-900 p-5 sm:p-6">
                <dt className="label mt-2">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold text-paper sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </>
      );

    case "figure":
      return (
        <>
          <Head {...block} />
          <Figure image={block.image} sizes="(min-width: 1024px) 900px, 100vw" className="max-w-4xl" />
        </>
      );

    case "gallery": {
      const cols = block.columns ?? 2;
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <LightboxGallery
            items={block.images.map((img) => toLightboxItem(img))}
            gridClassName={`grid gap-5 ${cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
            aspect="4/3"
            sizes={cols === 3 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
          />
        </>
      );
    }

    case "compare": {
      const aspect = block.aspect ?? "16/10";
      const sizes = "(min-width: 768px) 50vw, 100vw";
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <div className="grid gap-5 md:grid-cols-2">
            <CompareSide image={block.left} aspect={aspect} sizes={sizes} />
            <CompareSide image={block.right} aspect={aspect} sizes={sizes} />
          </div>
        </>
      );
    }

    case "table":
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <div className="max-w-5xl overflow-x-auto border border-line" tabIndex={0} role="region" aria-label={block.heading ?? "Data table"}>
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-ink-850">
                  {block.columns.map((c) => (
                    <th key={c} scope="col" className="label border-b border-line px-4 py-3 font-normal">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-b border-line-soft last:border-0">
                    {row.map((cell, c) => (
                      <td key={c} className={`px-4 py-3 ${c === 0 ? "text-paper" : "font-mono text-[0.82rem] text-paper-dim"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className="mt-3 max-w-3xl text-sm text-mute">{block.note}</p>}
        </>
      );

    case "steps":
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {block.items.map((step, i) => (
              <li key={step.title} className="bg-ink-900 p-6 sm:last:odd:col-span-2">
                <p className="label label-accent mb-3">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-paper-dim">{step.body}</p>
              </li>
            ))}
          </ol>
        </>
      );

    case "split":
      return (
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={block.flip ? "lg:order-2" : ""}>
            <Head {...block} />
            <div className="prose-body text-lg text-paper-dim">
              {block.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <Figure
            image={block.image}
            sizes="(min-width: 1024px) 50vw, 100vw"
            aspect={getMedia(block.image.id).height > getMedia(block.image.id).width ? "4/3" : undefined}
          />
        </div>
      );

    case "video": {
      if (!block.video) return null;
      const v = block.video;
      return (
        <>
          <Head {...block} />
          <Intro text={block.intro} />
          <figure className="max-w-4xl">
            <div className="ticks border border-line bg-black">
              <Video
                src={asset(v.src)}
                poster={asset(v.poster)}
                width={v.width}
                height={v.height}
                label={block.heading ?? "Video"}
              />
            </div>
            {v.caption && <figcaption className="mt-3 text-sm text-mute">{v.caption}</figcaption>}
          </figure>
        </>
      );
    }

    case "callout":
      return (
        <aside className="max-w-3xl border-l-2 border-accent bg-ink-900 p-6">
          <p className="font-display text-xl font-semibold">{block.title}</p>
          <p className="mt-2 text-paper-dim">{block.body}</p>
          {block.href && (
            <Link href={block.href} className="btn mt-5">
              {block.linkLabel ?? "Read more"} <span aria-hidden>→</span>
            </Link>
          )}
        </aside>
      );
  }
}

/** Renders an ordered list of content blocks. Blocks with nothing to show (e.g. a video not added yet) are skipped. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {blocks
        .filter((b) => !(b.type === "video" && !b.video))
        .map((block, i) => (
          <section key={i} data-reveal={i > 0 ? "" : undefined}>
            <BlockView block={block} />
          </section>
        ))}
    </div>
  );
}
