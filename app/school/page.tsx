import { EntryCard } from "@/components/EntryCard";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { sections } from "@/content/site";
import { schoolCoursework, schoolProjects } from "@/lib/entries";
import { pageMeta } from "@/lib/meta";

const s = sections.school;

export const metadata = pageMeta({
  title: s.title,
  description: "School work by Dennis Hom at UT Austin: NASA USDC-9, a propeller thrust stand, CFD in OpenFOAM, wind tunnel testing, lunar mission design, and instrumentation labs.",
  path: s.href,
});

export default function AtSchoolPage() {
  return (
    <>
      <PageHeader kicker="At school" title={s.title} intro={s.intro} />
      <div className="shell py-14">
        <section aria-labelledby="school-projects">
          <SectionHeading id="school-projects" kicker="Projects" title="The two on my résumé" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {schoolProjects.map((p, i) => (
              <li key={p.slug}>
                <EntryCard entry={p} index={i} priority />
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="school-coursework" className="mt-16" id="coursework">
          <SectionHeading id="school-coursework" kicker="Coursework" title="Classes where I made something" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {schoolCoursework.map((c, i) => (
              <li key={c.slug} data-reveal="">
                <EntryCard entry={c} index={i + schoolProjects.length} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
