import { coursework } from "@/content/coursework";
import { projects } from "@/content/projects";
import type { Entry } from "@/content/types";

/** Everything with its own detail page, in display order. */
export const allEntries: Entry[] = [...projects, ...coursework];

export const entriesIn = (group: Entry["group"]) => allEntries.filter((e) => e.group === group);

export const entryHref = (entry: Entry) => `/${entry.group}/${entry.slug}/`;

/** School splits into the two résumé projects and the coursework write-ups. */
export const schoolProjects = projects.filter((p) => p.group === "school");
export const schoolCoursework = coursework.filter((c) => c.group === "school");
