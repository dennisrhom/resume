import type { Metadata, Viewport } from "next";
import { PrefsSync } from "@/components/Appearance";
import { ImageWarmup } from "@/components/ImageWarmup";
import { MediaViewer } from "@/components/MediaViewer";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/meta";
import { defaultHtmlAttrs, prefsInlineScript } from "@/lib/prefs";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name} - ${site.brand}`, template: `%s - ${site.brand}` },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.name} - ${site.brand}`,
    description: site.description,
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: { card: "summary_large_image", images: [absoluteUrl("/og.jpg")] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101418" },
  ],
  colorScheme: "light dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: absoluteUrl("/"),
  email: `mailto:${site.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "The University of Texas at Austin" },
  sameAs: [site.links.linkedin, site.links.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...defaultHtmlAttrs} suppressHydrationWarning>
      <head>
        {/* Applies saved Appearance choices (text size, width, color, pinned panels) before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: prefsInlineScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#content" className="mp-skip">
          Jump to content
        </a>
        {children}
        <MediaViewer />
        <PrefsSync />
        <ImageWarmup />
      </body>
    </html>
  );
}
