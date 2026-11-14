import type { Metadata } from "next";
import { site } from "@/content/site";

const abs = (path: string) => `${site.url.replace(/\/$/, "")}${path}`;

/** Per-page metadata with canonical URL and Open Graph tags. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = abs(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: abs("/og.jpg"), width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [abs("/og.jpg")] },
  };
}

export const absoluteUrl = abs;
