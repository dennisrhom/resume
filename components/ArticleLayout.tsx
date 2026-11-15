import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import type { TocItem } from "@/lib/outline";
import { AppearancePanel } from "./Appearance";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TocButton, TocPanel } from "./Toc";

type Props = {
  title: string;
  toc: TocItem[];
  /** Which tab is selected, and where the "Article" tab points. */
  tab: "article" | "contact";
  articleHref?: string;
  children: ReactNode;
};

/**
 * Page frame modeled on a Vector 2022 article: Contents on the left, the
 * article in the middle, Appearance on the right. Each sidebar can be hidden,
 * and on narrow screens both move into buttons (CSS decides, from the
 * data-toc / data-appearance attributes on <html>).
 */
export function ArticleLayout({ title, toc, tab, articleHref = "/", children }: Props) {
  return (
    <div className="mp-page">
      <SiteHeader />
      <div className="mp-columns">
        <nav className="mp-toc-col" aria-label="Contents">
          <div className="mp-sticky">
            <TocPanel items={toc} />
          </div>
        </nav>

        <main id="content" className="mp-main">
          <header className="mp-article-head" id="top">
            <div className="mp-title-row">
              <TocButton items={toc} />
              <h1 className="mp-title">{title}</h1>
            </div>
            <nav className="mp-tabs" aria-label="Namespaces">
              <ul>
                <li>
                  <Link
                    href={articleHref}
                    className={tab === "article" ? "selected" : undefined}
                    aria-current={tab === "article" ? "page" : undefined}
                  >
                    Article
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact/"
                    className={tab === "contact" ? "selected" : undefined}
                    aria-current={tab === "contact" ? "page" : undefined}
                  >
                    Contact Me
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          <div className="mp-body">
            <p className="mp-sitesub">
              From {site.brand}, {site.tagline}
            </p>
            {children}
          </div>

          <SiteFooter />
        </main>

        <aside className="mp-tools-col" aria-label="Appearance">
          <div className="mp-sticky">
            <AppearancePanel />
          </div>
        </aside>
      </div>
    </div>
  );
}
