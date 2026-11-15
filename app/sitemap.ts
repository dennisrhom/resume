import type { MetadataRoute } from "next";
import { pageEntries, entryHref } from "@/lib/entries";
import { absoluteUrl } from "@/lib/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/contact/", ...pageEntries.map(entryHref)];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
