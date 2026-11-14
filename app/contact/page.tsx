import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";
import { asset } from "@/lib/media";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact Dennis Hom by email or LinkedIn, or download his résumé.",
  path: "/contact/",
});

export default function ContactPage() {
  const rows = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: site.links.linkedin.replace("https://www.", ""), href: site.links.linkedin },
    { label: "GitHub", value: site.links.github.replace("https://", ""), href: site.links.github },
  ];
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Get in touch"
        intro="Email is the fastest way to reach me. I'm looking for entry-level engineering roles, and I can relocate."
      />
      <div className="shell py-14">
        <dl className="max-w-3xl border-t border-line">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-1 border-b border-line-soft py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="label">{r.label}</dt>
              <dd>
                <a href={r.href} className="link break-all font-display text-xl font-semibold sm:text-2xl" rel="me noopener">
                  {r.value}
                </a>
              </dd>
            </div>
          ))}
          <div className="grid gap-1 border-b border-line-soft py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
            <dt className="label">Location</dt>
            <dd className="text-lg text-paper-dim">{site.location}. Open to relocation.</dd>
          </div>
          <div className="grid gap-1 border-b border-line-soft py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
            <dt className="label">Eligibility</dt>
            <dd className="text-lg text-paper-dim">U.S. citizen. Eligible to work in the United States with no restrictions.</dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            Send an email
          </a>
          <a href={asset(site.resumePdf)} className="btn" download>
            Download résumé (PDF)
          </a>
        </div>
      </div>
    </>
  );
}
