import { notFound } from "next/navigation";
import { EntryPage } from "@/components/EntryPage";
import { sections } from "@/content/site";
import { entriesIn, entryHref } from "@/lib/entries";
import { pageMeta } from "@/lib/meta";

const entries = entriesIn("home");

export const dynamicParams = false;
export const generateStaticParams = () => entries.map((e) => ({ slug: e.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return {};
  return pageMeta({ title: entry.title, description: entry.summary, path: entryHref(entry) });
}

export default async function EntryRoute({ params }: Props) {
  const { slug } = await params;
  const i = entries.findIndex((e) => e.slug === slug);
  if (i < 0) notFound();
  return (
    <EntryPage
      entry={entries[i]}
      section={{ label: sections.home.title, href: sections.home.href }}
      prev={entries[i - 1]}
      next={entries[i + 1]}
    />
  );
}
