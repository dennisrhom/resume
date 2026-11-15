import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders the small wiki-style markup used in /content:
 *   [[/path/|label]] internal link   [[#Section|label]] section link   [[https://…|label]] external link
 *   **bold**   *italic*   {{age|YYYY-MM-DD}} current age, e.g. "(age 23)"
 */
const TOKEN = /(\[\[[^\]|]+\|[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\{\{age\|\d{4}-\d{2}-\d{2}\}\})/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 0 ? part : <Fragment key={i}>{renderToken(part)}</Fragment>))}
    </>
  );
}

function renderToken(token: string) {
  if (token.startsWith("[[")) {
    const [href, label] = token.slice(2, -2).split("|");
    const inner = <RichText text={label} />;
    if (href.startsWith("/")) return <Link href={href}>{inner}</Link>;
    if (href.startsWith("#")) return <a href={href}>{inner}</a>;
    return (
      <a href={href} className="external" rel="noopener">
        {inner}
      </a>
    );
  }
  if (token.startsWith("**")) return <b><RichText text={token.slice(2, -2)} /></b>;
  if (token.startsWith("{{")) return <Age born={token.slice(6, -2)} />;
  return <i><RichText text={token.slice(1, -1)} /></i>;
}

/** Markup stripped to plain text, for alt text, captions in the media viewer, and meta tags. */
export const plainText = (text: string) =>
  text
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")
    .replace(/\{\{age\|[^}]+\}\}/g, "")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1");

function ageOn(born: string, now: Date) {
  const [y, m, d] = born.split("-").map(Number);
  const beforeBirthday = now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d);
  return now.getFullYear() - y - (beforeBirthday ? 1 : 0);
}

/**
 * Age at build time, corrected in the browser before paint so it never goes
 * stale between deploys. Only one per page (it uses a fixed id).
 */
function Age({ born }: { born: string }) {
  const [y, m, d] = born.split("-").map(Number);
  const script = `(function(){var e=document.getElementById("mp-age");if(!e)return;var n=new Date(),a=n.getFullYear()-${y};if(n.getMonth()+1<${m}||(n.getMonth()+1===${m}&&n.getDate()<${d}))a--;e.textContent="(age "+a+")"})()`;
  return (
    <>
      <span id="mp-age" suppressHydrationWarning>
        {`(age ${ageOn(born, new Date())})`}
      </span>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
