# Dennis Hom: Minipedia portfolio

Static site built with Next.js (App Router) and TypeScript, styled to read like an encyclopedia article (modeled on MediaWiki's Vector 2022 skin). It exports to plain HTML in `out/`, so it hosts free on GitHub Pages or Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, live reload (works on the Codespaces forwarded URL too)
npm run build      # static export to out/
npm run preview    # serve out/ at http://localhost:4173
npm run lint
```

## Deploy

**GitHub Pages** (already wired up in `.github/workflows/deploy.yml`)

1. Push to `main`.
2. In the repo on GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Every push to `main` rebuilds and publishes. The workflow sets the base path (`/resume`) and site URL for you.

**Vercel**

1. Import the repo at vercel.com. No settings to change; it detects Next.js.
2. Add an environment variable `NEXT_PUBLIC_SITE_URL` with your final URL (for example `https://dennishom.com`) so canonical links, the sitemap, and the share image point to the right place.

## Pages

| Page | URL | Content file |
| --- | --- | --- |
| Main article (Education, Projects, Experience, Hobbies, Skills, External links) | `/` | `content/main-article.ts` |
| One article per project or coursework entry | `/<slug>/`, e.g. `/blastx-phantom/` | `content/projects.ts`, `content/coursework.ts` |
| Contact Me | `/contact/` | `app/contact/page.tsx` |

## Where things live

| What | Where |
| --- | --- |
| Name, email, links, location, birth date, "Minipedia" branding | `content/site.ts` |
| Main article: lead, section text, infobox, which photos appear | `content/main-article.ts` |
| Projects (personal or academic, set by `category`) | `content/projects.ts` |
| Coursework projects (all academic) | `content/coursework.ts` |
| Experience (AI training, Pegasi Peripherals, Texas eSports) | `content/experience.ts` |
| Hobbies: gaming photos and links, 3D design studio builds, space events | `content/hobbies.ts` |
| Education, GPA, coursework list, skills | `content/about.ts` |
| Colors, fonts, layout | `app/globals.css` |

You should not need to touch `components/` or `app/` to change text or add photos.

## Writing text

Every text field accepts a little wiki-style markup:

| Markup | Result |
| --- | --- |
| `[[/blastx-phantom/\|BlastX Phantom]]` | Link to another article |
| `[[#Texas_eSports\|Texas eSports]]` | Link to a section on the same page (heading with spaces turned into underscores) |
| `[[https://example.com\|label]]` | External link |
| `**bold**`, `*italic*` | Bold, italic |

## Add a project or coursework entry

Copy an object in `content/projects.ts` (or `coursework.ts`), give it a new `slug`, set `category` to `"personal"` or `"academic"`, and fill it in. It gets its own article at `/<slug>/`, a summary under Projects on the main article (from `summary`), and a sitemap entry.

For a project that should only appear as a summary on the main article, with no page of its own (like Home Chicken Coop), give it just `slug`, `title`, `category`, `summary`, and `page: false`.

An article is a `lead`, an `infobox`, and `sections`. Each section has a `heading`, optional `blocks`, and optional `subsections`. Blocks render in order:

| Block `type` | Use it for |
| --- | --- |
| `prose` | Paragraphs |
| `list` | Bullets, or numbered with `ordered: true`. `columns: true` splits a long list into columns. |
| `table` | A data table |
| `thumb` | One captioned image floated beside the text |
| `multi` | Two or more images side by side in one captioned frame |
| `gallery` | A row of images with captions underneath |
| `video` | A re-encoded MP4 |
| `hatnote` | The italic note at the top of a section, e.g. `Main article: [[/slug/\|Title]]` |

Types are in `content/types.ts`; your editor will autocomplete the fields. Section headings become the Contents list automatically.

## Add photos

1. Put the original in `media-src/<collection>/`, for example `media-src/profile/dennis-hom.jpg`. Any size, JPG/PNG/HEIC. Name it in kebab-case.
2. Run `npm run media`. It writes AVIF and WebP at 480, 960, and 1600 px wide to `public/media/`, strips EXIF and GPS data, and updates `content/generated/media.json`.
3. Reference it in a content file by id, which is the path without the extension:

   ```ts
   { id: "profile/dennis-hom", alt: "Describe what is in the photo", caption: "Optional caption." }
   ```

4. Commit `public/media/` and `content/generated/media.json`.

`media-src/` is gitignored, so originals stay on your machine. A wrong id fails the build with a clear message instead of shipping a broken image. To crop or rotate a photo, add an entry to `scripts/media-edits.json`.

**Your photo in the infobox:** add it as above, then uncomment the `image:` line in the infobox in `content/main-article.ts`.

Clicking any image opens a full-screen viewer; the arrow keys step through every image on the page.

## Add the firing video

```bash
sudo apt-get install -y ffmpeg
npm run video -- path/to/BlastXPhantom_Shooting_Video.MP4
```

It writes an H.264 MP4 (1080p max, no audio) and a poster frame to `public/media/video/`, then prints one line to paste into `content/projects.ts` in place of `phantomFiringVideo = null`.

## Appearance panel

The right sidebar lets visitors pick text size, page width, and light, dark, or automatic color. The left sidebar holds the Contents. Either can be hidden; on narrow screens both move into buttons (Contents beside the title, Appearance in the header). Choices are saved in the browser's local storage and applied by a small inline script before the page paints, so there is no flash. The logic is in `lib/prefs.ts` and `lib/prefs-client.ts`.

## Other

- `npm run og` rebuilds the link-preview image `public/og.jpg`.
- Open items are tracked in `TODO.md` and as `TODO(...)` comments in `content/`.
- The "last edited" date in the footer is the build time.
