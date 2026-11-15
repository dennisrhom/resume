import type { Article, Section } from "@/content/types";

/** A section with its anchor id and heading level filled in. */
export type OutlineSection = Omit<Section, "subsections"> & {
  id: string;
  level: 2 | 3 | 4 | 5;
  subsections: OutlineSection[];
};

export type TocItem = { id: string; label: string; children: TocItem[] };

/** Wikipedia-style anchor: "Personal projects" becomes "Personal_projects". */
export const anchorId = (heading: string) =>
  heading
    .replace(/\*/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^A-Za-z0-9_.\-()]/g, "");

/** Give every section a unique id and a heading level (h2 for top-level sections). */
export function outline(article: Article): OutlineSection[] {
  const used = new Map<string, number>();
  const walk = (sections: Section[], level: number): OutlineSection[] =>
    sections.map((s) => {
      const base = anchorId(s.heading);
      const n = (used.get(base) ?? 0) + 1;
      used.set(base, n);
      return {
        ...s,
        id: n === 1 ? base : `${base}_${n}`,
        level: Math.min(level, 5) as OutlineSection["level"],
        subsections: walk(s.subsections ?? [], level + 1),
      };
    });
  return walk(article.sections, 2);
}

export const tocFromOutline = (sections: OutlineSection[]): TocItem[] =>
  sections.map((s) => ({ id: s.id, label: s.heading.replace(/\*/g, ""), children: tocFromOutline(s.subsections) }));
