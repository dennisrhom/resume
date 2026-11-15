import Link from "next/link";
import { site } from "@/content/site";

/** Build time, which is when every page was last changed on this static site. */
const built = new Date();
const editedOn = built.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const editedAt = built.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });

export function SiteFooter() {
  return (
    <footer className="mp-footer">
      <p>
        This page was last edited on {editedOn}, at {editedAt} (UTC).
      </p>
      <ul>
        <li>
          <Link href="/">{site.brand}</Link>
        </li>
        <li>
          <Link href="/contact/">Contact Me</Link>
        </li>
        <li>
          <a href={site.links.linkedin} rel="noopener">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={site.links.github} rel="noopener">
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}
