import { LightboxGallery } from "@/components/Lightbox";
import { PageHeader } from "@/components/PageHeader";
import { leadership } from "@/content/leadership";
import { sections } from "@/content/site";
import { toLightboxItem } from "@/lib/lightbox";
import { pageMeta } from "@/lib/meta";

const s = sections.leadership;

export const metadata = pageMeta({
  title: s.title,
  description: "Dennis Hom co-founded Texas eSports, ran collegiate tournaments with 100+ participants, and captained a nationally ranked varsity VALORANT roster.",
  path: s.href,
});

// Collage layout: first photo is large, the rest fill in around it.
const collage = ["col-span-4 row-span-2 sm:col-span-2", "col-span-4 sm:col-span-2", "col-span-2 sm:col-span-1", "col-span-2 sm:col-span-1"];

export default function LeadershipPage() {
  const l = leadership;
  return (
    <>
      <PageHeader kicker={`${l.org} / ${l.title} / ${l.dates}`} title={s.title} intro={l.summary} />
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="label label-accent mb-3">{l.location}</p>
            <h2 className="mb-5 text-3xl font-semibold">{l.org}</h2>
            <div className="prose-body max-w-2xl text-lg text-paper-dim">
              {l.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-10 border-t border-line">
              {l.pillars.map((p) => (
                <div key={p.label} className="grid gap-2 border-b border-line-soft py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt>
                    <span className="label label-accent block">{p.label}</span>
                    <span className="mt-1 block font-display text-3xl font-semibold">{p.value}</span>
                  </dt>
                  <dd className="text-paper-dim sm:pt-1">{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-reveal="">
            <LightboxGallery
              items={l.photos.map((img) => toLightboxItem(img))}
              gridClassName="grid auto-rows-[9rem] grid-cols-4 gap-3 sm:auto-rows-[11rem]"
              itemClassNames={collage}
              fill
              showCaptions={false}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <p className="label mt-4">Photos from events and tournaments</p>
          </div>
        </div>
      </div>
    </>
  );
}
