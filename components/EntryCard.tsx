import Link from "next/link";
import type { Entry } from "@/content/types";
import { entryHref } from "@/lib/entries";
import { Picture } from "./Picture";

type Props = {
  entry: Entry;
  index?: number;
  /** Wide two-column layout for the flagship project. */
  feature?: boolean;
  /** Horizontal layout, for a card that sits alone in its row. */
  wide?: boolean;
  priority?: boolean;
};

/** Card for a project or coursework entry. Shows the cover image, or a big metric when there is no image yet. */
export function EntryCard({ entry, index, feature, wide, priority }: Props) {
  const href = entryHref(entry);
  const number = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  const media = entry.cover ? (
    <Picture
      image={entry.cover}
      priority={priority}
      sizes={feature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      className="block h-full w-full"
      imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
    />
  ) : (
    <div className="blueprint-tile flex h-full w-full flex-col justify-end p-6">
      {entry.metric && (
        <>
          <p className="font-display text-5xl font-semibold text-accent sm:text-6xl">{entry.metric.value}</p>
          <p className="label mt-2 max-w-[18rem] leading-relaxed">{entry.metric.label}</p>
        </>
      )}
    </div>
  );

  if (feature) {
    return (
      <Link href={href} className="card group grid overflow-hidden lg:grid-cols-[1.35fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-850 lg:aspect-auto lg:min-h-[26rem]">{media}</div>
        <div className="flex flex-col p-6 sm:p-9">
          <p className="label label-accent">{number ? `${number} / ` : ""}The big one</p>
          <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{entry.title}</h3>
          <p className="mt-4 text-paper-dim">{entry.summary}</p>
          <ul className="mt-6 space-y-2 text-sm text-paper-dim">
            {entry.highlights.map((h) => (
              <li key={h} className="grid grid-cols-[1rem_1fr]">
                <span aria-hidden className="text-accent">
                  +
                </span>
                {h}
              </li>
            ))}
          </ul>
          <p className="btn btn-primary mt-8 self-start">
            Read the case study <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={`card group h-full overflow-hidden ${wide ? "grid sm:grid-cols-[minmax(0,22rem)_1fr]" : "flex flex-col"}`}>
      <div className={`relative aspect-[16/10] overflow-hidden bg-ink-850 ${wide ? "sm:aspect-auto sm:min-h-[15rem]" : ""}`}>{media}</div>
      <div className="flex flex-1 flex-col p-6">
        <p className="label">
          {number && <span className="text-accent">{number} / </span>}
          {entry.dates}
        </p>
        <h3 className="mt-3 text-2xl font-semibold transition-colors group-hover:text-accent">{entry.title}</h3>
        <p className={`mt-3 text-[0.95rem] text-paper-dim ${wide ? "max-w-2xl" : ""}`}>{entry.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {entry.tags.slice(0, 3).map((t) => (
            <li key={t} className="label border border-line-soft px-2 py-1 !text-[0.65rem]">
              {t}
            </li>
          ))}
        </ul>
        <p className="label mt-auto pt-6 text-paper transition-colors group-hover:text-accent">
          Read more <span aria-hidden>→</span>
        </p>
      </div>
    </Link>
  );
}
