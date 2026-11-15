import { coursework } from "@/content/coursework";
import { projects } from "@/content/projects";
import type { Article, Entry, PageEntry } from "@/content/types";

/** Every project and coursework entry, in display order. */
export const allEntries: Entry[] = [...projects, ...coursework];

export const hasPage = (e: Entry): e is PageEntry => e.page !== false;

/** Entries that have their own article at /<slug>/. */
export const pageEntries: PageEntry[] = allEntries.filter(hasPage);

export const entriesIn = (category: Entry["category"]) => allEntries.filter((e) => e.category === category);

export const entryHref = (entry: PageEntry) => `/${entry.slug}/`;

/** An entry's own page, as an article. */
export function entryArticle(entry: PageEntry): Article {
  return {
    title: entry.title,
    description: entry.summary.replace(/\*/g, ""),
    infobox: entry.infobox,
    lead: [
      {
        type: "hatnote",
        text:
          entry.category === "personal"
            ? "This article is one of the [[/#Personal_projects|personal projects]] in [[/|Dennis Hom]]."
            : "This article is one of the [[/#Academic_projects|academic projects]] in [[/|Dennis Hom]].",
      },
      { type: "prose", paragraphs: entry.lead },
    ],
    sections: entry.sections,
  };
}
