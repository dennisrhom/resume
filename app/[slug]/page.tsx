import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { plainText } from "@/components/RichText";
import { pageEntries, entryArticle, entryHref } from "@/lib/entries";
import { pageMeta } from "@/lib/meta";

/** One article per project or coursework entry, at /<slug>/. */
export const dynamicParams = false;
export const generateStaticParams = () => pageEntries.map((e) => ({ slug: e.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = pageEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  return pageMeta({ title: entry.title, description: plainText(entry.summary), path: entryHref(entry) });
}

export default async function EntryRoute({ params }: Props) {
  const { slug } = await params;
  const entry = pageEntries.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <ArticlePage article={entryArticle(entry)} articleHref={entryHref(entry)} />;
}
