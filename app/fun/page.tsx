import { LightboxGallery } from "@/components/Lightbox";
import { PageHeader } from "@/components/PageHeader";
import { sections } from "@/content/site";
import { builds, events, studioIntro } from "@/content/studio";
import { toLightboxItem } from "@/lib/lightbox";
import { pageMeta } from "@/lib/meta";

const s = sections.fun;

export const metadata = pageMeta({
  title: s.title,
  description: "Display replicas designed in CAD, 3D printed, and painted by Dennis Hom (BlastX Odin, Reaver Knife, Ion Sheriff, Alphonse Elric helmet), plus photos from space events.",
  path: s.href,
});

export default function ForFunPage() {
  return (
    <>
      <PageHeader kicker="For fun" title={s.title} intro={studioIntro} />
      <div className="shell space-y-16 py-14">
        {builds.map((build, i) => (
          <section key={build.slug} id={build.slug} className="scroll-mt-24" data-reveal={i > 0 ? "" : undefined}>
            <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-[17rem_1fr] lg:gap-12">
              <div>
                <p className="label label-accent">
                  {String(i + 1).padStart(2, "0")} / {build.source}
                </p>
                <h2 className="mt-2 text-3xl font-semibold">{build.title}</h2>
                <p className="mt-3 max-w-md text-paper-dim">{build.note}</p>
              </div>
              {/* Masonry columns keep each photo at its natural shape. */}
              <LightboxGallery
                items={build.images.map((img) => toLightboxItem(img))}
                gridClassName={build.images.length > 1 ? "columns-2 gap-4 [&>li]:mb-4 [&>li]:break-inside-avoid" : "max-w-md"}
                sizes="(min-width: 1024px) 34vw, 50vw"
              />
            </div>
          </section>
        ))}

        <section id="space-events" className="scroll-mt-24 border-t border-line pt-10" aria-labelledby="events-h" data-reveal="">
          <p className="label label-accent mb-3">Also for fun</p>
          <h2 id="events-h" className="text-3xl font-semibold">
            {events.heading}
          </h2>
          <p className="mb-8 mt-3 max-w-2xl text-paper-dim">{events.intro}</p>
          <LightboxGallery
            items={events.photos.map((img) => toLightboxItem(img))}
            gridClassName="grid gap-4 sm:grid-cols-3"
            aspect="4/3"
            sizes="(min-width: 640px) 33vw, 100vw"
          />
        </section>
      </div>
    </>
  );
}
