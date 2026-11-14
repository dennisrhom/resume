/** Top-of-page heading for index pages. */
export function PageHeader({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <header className="relative overflow-hidden border-b border-line-soft">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
      <div className="shell relative py-14 sm:py-20">
        <p className="label label-accent mb-4">{kicker}</p>
        <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-paper-dim sm:text-xl">{intro}</p>}
      </div>
    </header>
  );
}

/** Section heading used on the home and index pages. */
export function SectionHeading({ id, kicker, title, children }: { id?: string; kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="label label-accent mb-3">{kicker}</p>
        <h2 id={id} className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
