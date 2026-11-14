import Link from "next/link";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/media";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line-soft bg-ink-900">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-paper-dim">
            {site.role}. B.S. Aerospace Engineering, UT Austin. {site.location}.
          </p>
          <a href={`mailto:${site.email}`} className="link mt-4 inline-block">
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="label mb-3">Site</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper-dim transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.links.linkedin} className="text-paper-dim transition-colors hover:text-accent" rel="me noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.links.github} className="text-paper-dim transition-colors hover:text-accent" rel="me noopener">
                GitHub
              </a>
            </li>
            <li>
              <a href={asset(site.resumePdf)} className="text-paper-dim transition-colors hover:text-accent" download>
                Download résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-soft">
        <div className="shell flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="label">Dennis Hom / Engineering portfolio</p>
          <p className="label">Thanks for scrolling this far.</p>
        </div>
      </div>
    </footer>
  );
}
