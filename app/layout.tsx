import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ImageWarmup, RevealObserver } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/meta";
import "./globals.css";

const display = Chakra_Petch({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-chakra", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: { card: "summary_large_image", images: [absoluteUrl("/og.jpg")] },
};

export const viewport: Viewport = { themeColor: "#0b0d10", colorScheme: "dark" };

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
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <ImageWarmup />
      </body>
    </html>
  );
}
