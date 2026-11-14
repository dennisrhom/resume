import Link from "next/link";
import { LightboxGallery } from "@/components/Lightbox";
import { PageHeader } from "@/components/PageHeader";
import { experience } from "@/content/experience";
import { leadership } from "@/content/leadership";
import { sections } from "@/content/site";
import { toLightboxItem } from "@/lib/lightbox";
import { pageMeta } from "@/lib/meta";

const s = sections.work;

export const metadata = pageMeta({
  title: s.title,
  description: "Work experience of Dennis Hom: AI training and evaluation with Handshake AI and Mercor, and Operations Lead at Pegasi Peripherals.",
  path: s.href,
});

export default function AtWorkPage() {
  return (
    <>
      <PageHeader kicker="At work" title={s.title} intro={s.intro} />
      <div className="shell py-14">
        <ol className="space-y-16">
          {experience.map((role, i) => (
            <li key={role.slug} id={role.slug} className="scroll-mt-24 border-t border-line pt-8" data-reveal={i > 0 ? "" : undefined}>
              <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
                <div>
                  <p className="label label-accent">{role.dates}</p>
                  <p className="label mt-2">{role.location}</p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">{role.title}</h2>
                  <p className="mt-1 font-display text-xl text-paper-dim">{role.org}</p>
                  <p className="mt-5 max-w-3xl text-lg text-paper-dim">{role.summary}</p>
                  <ul className="mt-6 max-w-3xl space-y-3">
                    {role.bullets.map((b) => (
                      <li key={b} className="grid grid-cols-[1.25rem_1fr] text-paper-dim">
                        <span aria-hidden className="text-accent">
                          +
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  {role.images && role.images.length > 0 && (
                    <div className="mt-8 max-w-3xl">
                      <p className="label mb-3">Product</p>
                      <LightboxGallery
                        items={role.images.map((img) => toLightboxItem(img))}
                        gridClassName={`grid gap-4 ${role.images.length > 1 ? "sm:grid-cols-2" : ""}`}
                        aspect={role.images.length > 1 ? "4/3" : "16/10"}
                        sizes="(min-width: 1024px) 760px, 100vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <aside className="mt-16 border-l-2 border-accent bg-ink-900 p-6" data-reveal="">
          <p className="label mb-2">Also, not a job</p>
          <p className="font-display text-xl font-semibold">
            {leadership.title}, {leadership.org}
          </p>
          <p className="mt-2 max-w-2xl text-paper-dim">{leadership.summary}</p>
          <Link href={sections.leadership.href} className="btn mt-5">
            {sections.leadership.title} <span aria-hidden>→</span>
          </Link>
        </aside>
      </div>
    </>
  );
}
