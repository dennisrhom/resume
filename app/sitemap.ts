import type { MetadataRoute } from "next";
import { nav } from "@/content/site";
import { allEntries, entryHref } from "@/lib/entries";
import { absoluteUrl } from "@/lib/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...nav.map((n) => n.href), ...allEntries.map(entryHref)];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.7 : 0.8,
  }));
}
