import Link from "next/link";
import type { Entry } from "@/content/types";
import { entryHref } from "@/lib/entries";
import { Blocks } from "./Blocks";
import { Figure } from "./Figure";

type Props = {
  entry: Entry;
  section: { label: string; href: string };
  prev?: Entry;
  next?: Entry;
};

/** Detail page layout shared by projects and coursework. */
export function EntryPage({ entry, section, prev, next }: Props) {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-line-soft">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <div className="shell relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="label mb-8">
            <Link href={section.href} className="transition-colors hover:text-accent">
              ← {section.label}
            </Link>
          </nav>
          <div className={`grid gap-10 ${entry.cover ? "lg:grid-cols-[1fr_1.05fr] lg:items-center" : ""}`}>
            <div>
              <p className="label label-accent mb-4">{entry.context}</p>
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">{entry.title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-paper-dim sm:text-xl">{entry.subtitle}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {entry.tags.map((t) => (
                  <li key={t} className="label border border-line px-2 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {entry.cover && (
              <Figure image={entry.cover} priority sizes="(min-width: 1024px) 50vw, 100vw" aspect="16/10" tag="Fig. 01" />
            )}
          </div>

          {/* Title block */}
          <dl className="mt-10 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
            {entry.facts.map((f) => (
              <div key={f.label} className="border-b border-r border-line bg-ink-950/60 p-4">
                <dt className="label mb-1">{f.label}</dt>
                <dd className="text-sm text-paper sm:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="shell py-14 sm:py-20">
        <Blocks blocks={entry.blocks} />
      </div>

      {(prev || next) && (
        <nav aria-label="More entries" className="shell grid gap-4 border-t border-line-soft pt-10 sm:grid-cols-2">
          {prev ? (
            <Link href={entryHref(prev)} className="card group p-6">
              <p className="label">← Previous</p>
              <p className="mt-2 font-display text-xl font-semibold group-hover:text-accent">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={entryHref(next)} className="card group p-6 sm:text-right">
              <p className="label">Next →</p>
              <p className="mt-2 font-display text-xl font-semibold group-hover:text-accent">{next.title}</p>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
