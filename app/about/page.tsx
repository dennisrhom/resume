import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { asset } from "@/lib/media";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "About",
  description: "About Dennis Hom: aerospace engineer, UT Austin class of 2025. Skills, education, relevant coursework, and links.",
  path: "/about/",
});

export default function AboutPage() {
  const { education: edu } = about;
  return (
    <>
      <PageHeader kicker="About" title="About me" />
      <div className="shell py-14">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="prose-body max-w-2xl text-lg text-paper-dim">
              {about.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={asset(site.resumePdf)} className="btn btn-primary" download>
                Download résumé
              </a>
              <Link href="/contact/" className="btn">
                Contact
              </Link>
            </div>
          </div>

          <aside className="space-y-8">
            <section className="ticks border border-line bg-ink-900 p-6" aria-labelledby="edu-h">
              <p className="label label-accent mb-3" id="edu-h">
                Education
              </p>
              <p className="font-display text-2xl font-semibold">{edu.degree}</p>
              <p className="mt-1 text-paper-dim">{edu.school}</p>
              <dl className="mt-5 grid grid-cols-2 border-l border-t border-line">
                <div className="border-b border-r border-line p-3">
                  <dt className="label mb-1">Graduated</dt>
                  <dd>{edu.date}</dd>
                </div>
                <div className="border-b border-r border-line p-3">
                  <dt className="label mb-1">GPA</dt>
                  <dd>{edu.gpa}</dd>
                </div>
              </dl>
            </section>
            <section aria-labelledby="status-h">
              <p className="label label-accent mb-3" id="status-h">
                Work eligibility
              </p>
              <p className="text-paper-dim">{site.eligibility}</p>
              <p className="mt-2 text-paper-dim">Languages: {about.languages}.</p>
            </section>
          </aside>
        </div>

        <section className="mt-16 border-t border-line pt-10" aria-labelledby="skills-h" data-reveal="">
          <p className="label label-accent mb-3">Skills</p>
          <h2 id="skills-h" className="mb-8 text-3xl font-semibold">
            What I work with
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {about.skills.map((group) => (
              <div key={group.group}>
                <h3 className="label mb-4 text-paper">{group.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li key={s} className="border border-line bg-ink-900 px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-10" aria-labelledby="courses-h" data-reveal="">
          <p className="label label-accent mb-3">Relevant coursework</p>
          <h2 id="courses-h" className="mb-8 text-3xl font-semibold">
            Classes that stuck
          </h2>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {about.coursework.map((c, i) => (
              <li key={c} className="flex items-baseline gap-3 border-b border-line-soft py-3">
                <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-paper-dim">
            I wrote a few of these up under{" "}
            <Link href="/school/" className="link">
              Things I did at school
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
