import { ArticlePage } from "@/components/ArticlePage";
import { mainArticle } from "@/content/main-article";
import { absoluteUrl } from "@/lib/meta";

export const metadata = { alternates: { canonical: absoluteUrl("/") } };

/** The main article. Its text lives in content/main-article.ts. */
export default function MainArticle() {
  return <ArticlePage article={mainArticle} />;
}
