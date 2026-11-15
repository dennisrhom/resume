import type { Article } from "@/content/types";
import { outline, tocFromOutline } from "@/lib/outline";
import { ArticleBody } from "./ArticleBody";
import { ArticleLayout } from "./ArticleLayout";

/** A full page for one Article: frame, contents, and body. */
export function ArticlePage({
  article,
  tab = "article",
  articleHref,
}: {
  article: Article;
  tab?: "article" | "contact";
  articleHref?: string;
}) {
  const sections = outline(article);
  return (
    <ArticleLayout title={article.title} toc={tocFromOutline(sections)} tab={tab} articleHref={articleHref}>
      <ArticleBody article={article} sections={sections} />
    </ArticleLayout>
  );
}
