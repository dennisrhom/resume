import Link from "next/link";
import { EntryCard } from "@/components/EntryCard";
import { Figure } from "@/components/Figure";
import { LightboxGallery } from "@/components/Lightbox";
import { SectionHeading } from "@/components/PageHeader";
import { Picture } from "@/components/Picture";
import { about } from "@/content/about";
import { experience } from "@/content/experience";
import { leadership } from "@/content/leadership";
import { sections, site } from "@/content/site";
import { builds, events } from "@/content/studio";
import { entriesIn, entryHref, schoolCoursework, schoolProjects } from "@/lib/entries";
import { toLightboxItem } from "@/lib/lightbox";
import { asset } from "@/lib/media";

const heroImage = {
  id: "blastx-phantom/finished-bench",
  alt: "BlastX Phantom replica: a full-size green, purple, white, and orange dart blaster resting on a metal bench",
};

const More = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="label text-paper hover:text-accent">
    {children} <span aria-hidden>→</span>
  </Link>
);

export default function LandingPage() {
  const [flagship, ...otherHome] = entriesIn("home");
  // One photo per replica (two for the Odin, to fill the grid), then the space event photos, in a single lightbox.
  const funPhotos = [
    ...builds.map((b) => toLightboxItem({ ...b.images[0], caption: `${b.title} (${b.source})` })),
    toLightboxItem({ ...builds[0].images[1], caption: `${builds[0].title} (${builds[0].source})` }),
    ...events.photos.map((p) => toLightboxItem(p)),
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <div className="shell relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="label label-accent mb-5">Aerospace engineer / UT Austin &rsquo;25</p>
            <h1 className="text-[3.4rem] font-bold leading-[0.95] sm:text-7xl lg:text-[5.5rem]">{site.name}</h1>
            <p className="mt-6 max-w-xl font-display text-2xl font-semibold text-paper sm:text-3xl">{site.tagline}</p>
            <p className="mt-4 max-w-xl text-lg text-paper-dim">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#at-home" className="btn btn-primary">
                See what I&rsquo;ve built <span aria-hidden>→</span>
              </Link>
              <a href={asset(site.resumePdf)} className="btn" download>
                Download résumé
              </a>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 border-l border-t border-line">
              {[
                { k: "Degree", v: "B.S. Aerospace Eng." },
                { k: "GPA", v: about.education.gpa },
                { k: "Based in", v: site.location },
              ].map((f) => (
                <div key={f.k} className="border-b border-r border-line bg-ink-950/60 px-3 py-3 sm:px-4">
                  <dt className="label mb-1 !text-[0.62rem]">{f.k}</dt>
                  <dd className="text-sm text-paper">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <Link href={entryHref(flagship)} className="group block">
              <Figure image={heroImage} priority sizes="(min-width: 1024px) 50vw, 100vw" aspect="4/3" tag="Fig. 01 / BlastX Phantom" />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
                <p className="label">74 printed parts / SolidWorks / FDM</p>
                <p className="label text-paper transition-colors group-hover:text-accent">
                  Case study <span aria-hidden>→</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 01 At home */}
      <section id="at-home" className="shell scroll-mt-20 pt-16 sm:pt-24" aria-labelledby="home-h">
        <SectionHeading id="home-h" kicker="01 / At home" title={sections.home.title}>
          <More href={sections.home.href}>Both projects</More>
        </SectionHeading>
        <div className="space-y-6">
          <div data-reveal="">
            <EntryCard entry={flagship} index={0} feature />
          </div>
          <ul className={`grid gap-6 ${otherHome.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {otherHome.map((p, i) => (
              <li key={p.slug} data-reveal="">
                <EntryCard entry={p} index={i + 1} wide={otherHome.length === 1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 At school */}
      <section id="at-school" className="shell scroll-mt-20 pt-16 sm:pt-24" aria-labelledby="school-h">
        <SectionHeading id="school-h" kicker="02 / At school" title={sections.school.title}>
          <More href={sections.school.href}>All of it</More>
        </SectionHeading>
        <ul className="grid gap-6 sm:grid-cols-2">
          {schoolProjects.map((p, i) => (
            <li key={p.slug} data-reveal="">
              <EntryCard entry={p} index={i} />
            </li>
          ))}
        </ul>
        <p className="label mb-4 mt-10">Coursework</p>
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal="">
          {schoolCoursework.map((c) => (
            <li key={c.slug} className="bg-ink-900">
              <Link href={entryHref(c)} className="group flex h-full flex-col p-6 transition-colors hover:bg-ink-850">
                <p className="label">{c.dates}</p>
                <h3 className="mt-3 text-xl font-semibold group-hover:text-accent">{c.title}</h3>
                <p className="mt-3 text-sm text-paper-dim">{c.highlights[0]}</p>
                <p className="label mt-auto pt-5 text-paper group-hover:text-accent">
                  Read <span aria-hidden>→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 At work */}
      <section id="at-work" className="shell scroll-mt-20 pt-16 sm:pt-24" aria-labelledby="work-h">
        <SectionHeading id="work-h" kicker="03 / At work" title={sections.work.title}>
          <More href={sections.work.href}>The details</More>
        </SectionHeading>
        <ol className="border-t border-line" data-reveal="">
          {experience.map((r) => (
            <li key={r.slug} className="border-b border-line-soft">
              <Link
                href={`${sections.work.href}#${r.slug}`}
                className="group grid gap-2 py-6 md:grid-cols-[14rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <p className="label">{r.dates}</p>
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-accent">
                    {r.title} <span className="font-sans text-base font-normal text-mute">/ {r.org}</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-paper-dim">{r.summary}</p>
                </div>
                <span aria-hidden className="label hidden text-paper group-hover:text-accent md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 Led at school */}
      <section id="led-at-school" className="shell scroll-mt-20 pt-16 sm:pt-24" aria-labelledby="lead-h">
        <SectionHeading id="lead-h" kicker="04 / Leadership" title={sections.leadership.title}>
          <More href={sections.leadership.href}>The whole story</More>
        </SectionHeading>
        <Link href={sections.leadership.href} className="card group grid overflow-hidden lg:grid-cols-[1fr_1.1fr]" data-reveal="">
          <div className="p-6 sm:p-9">
            <p className="label label-accent">{leadership.dates}</p>
            <h3 className="mt-3 text-3xl font-semibold group-hover:text-accent">
              {leadership.org} <span className="font-sans text-lg font-normal text-mute">/ {leadership.title}</span>
            </h3>
            <p className="mt-4 text-paper-dim">{leadership.intro[1]}</p>
            <dl className="mt-6 grid grid-cols-3 border-l border-t border-line">
              {leadership.pillars.map((p) => (
                <div key={p.label} className="border-b border-r border-line p-3">
                  <dt className="label mb-1 !text-[0.62rem]">{p.label}</dt>
                  <dd className="font-display text-lg font-semibold sm:text-xl">{p.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-850 lg:aspect-auto lg:min-h-[20rem]">
            <Picture
              image={leadership.photos[0]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 block h-full w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      </section>

      {/* 05 For fun */}
      <section id="for-fun" className="shell scroll-mt-20 pt-16 sm:pt-24" aria-labelledby="fun-h">
        <SectionHeading id="fun-h" kicker="05 / For fun" title={sections.fun.title}>
          <More href={sections.fun.href}>The full gallery</More>
        </SectionHeading>
        <p className="mb-6 max-w-2xl text-paper-dim">{sections.fun.intro} Click a photo to see it bigger.</p>
        <div data-reveal="">
          <LightboxGallery
            items={funPhotos}
            gridClassName="grid grid-cols-2 gap-3 md:grid-cols-4"
            aspect="1/1"
            sizes="(min-width: 768px) 25vw, 50vw"
            showCaptions={false}
          />
        </div>
      </section>

      {/* Contact */}
      <section className="shell pt-16 sm:pt-24" aria-labelledby="contact-h">
        <div className="ticks relative overflow-hidden border border-line bg-ink-900 p-8 sm:p-12" data-reveal="">
          <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative">
            <p className="label label-accent mb-4">Contact</p>
            <h2 id="contact-h" className="max-w-2xl text-3xl font-semibold sm:text-4xl">
              Hiring for an entry-level engineering role? I&rsquo;d like to hear about it.
            </h2>
            <p className="mt-4 max-w-2xl text-paper-dim">{site.eligibility}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                {site.email}
              </a>
              <a href={site.links.linkedin} className="btn" rel="noopener">
                LinkedIn
              </a>
              <a href={asset(site.resumePdf)} className="btn" download>
                Download résumé
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
