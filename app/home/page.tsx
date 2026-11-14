import { EntryCard } from "@/components/EntryCard";
import { PageHeader } from "@/components/PageHeader";
import { sections } from "@/content/site";
import { entriesIn } from "@/lib/entries";
import { pageMeta } from "@/lib/meta";

const s = sections.home;

export const metadata = pageMeta({
  title: s.title,
  description: "Personal projects by Dennis Hom: a dart-firing BlastX Phantom replica and feed and water systems for a 100+ chicken coop.",
  path: s.href,
});

export default function AtHomePage() {
  const [flagship, ...rest] = entriesIn("home");
  return (
    <>
      <PageHeader kicker="At home" title={s.title} intro={s.intro} />
      <div className="shell space-y-6 py-14">
        <EntryCard entry={flagship} index={0} feature priority />
        <ul className={`grid gap-6 ${rest.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {rest.map((p, i) => (
            <li key={p.slug} data-reveal="">
              <EntryCard entry={p} index={i + 1} wide={rest.length === 1} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
