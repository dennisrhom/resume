import Link from "next/link";
import { redirects } from "@/content/site";
import { asset } from "@/lib/media";
import { absoluteUrl } from "@/lib/meta";

/**
 * Forwarding pages for URLs from the first version of the site
 * (/projects/..., /coursework/..., /experience/, /studio/). A static export
 * has no server redirects, so each old URL gets a tiny page that sends the
 * browser to the new address. The list lives in content/site.ts.
 */
const toParams = (path: string) => path.split("/").filter(Boolean);
const lookup = (old: string[]) => redirects[`/${old.join("/")}/`];

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(redirects).map((from) => ({ old: toParams(from) }));

type Props = { params: Promise<{ old: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { old } = await params;
  const to = lookup(old);
  return { title: "This page moved", robots: { index: false, follow: true }, alternates: { canonical: absoluteUrl(to) } };
}

export default async function OldLink({ params }: Props) {
  const { old } = await params;
  const to = lookup(old);
  return (
    <div className="shell py-28 text-center">
      <meta httpEquiv="refresh" content={`0; url=${asset(to)}`} />
      <p className="label label-accent mb-4">Moved</p>
      <h1 className="text-4xl font-bold sm:text-5xl">This page has a new address.</h1>
      <p className="mx-auto mt-4 max-w-md text-paper-dim">You should be on your way there already. If not, use the button.</p>
      <Link href={to} className="btn btn-primary mt-8">
        Go to the new page
      </Link>
    </div>
  );
}
