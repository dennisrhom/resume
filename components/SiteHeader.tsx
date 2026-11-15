import Link from "next/link";
import { site } from "@/content/site";
import { AppearanceButton } from "./Appearance";

export function SiteHeader() {
  return (
    <header className="mp-header">
      <Link href="/" className="mp-logo" aria-label={`${site.brand}: main article`}>
        {site.brand}
      </Link>
      <AppearanceButton />
    </header>
  );
}
