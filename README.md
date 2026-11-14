# Dennis Hom: engineering portfolio

Static site built with Next.js (App Router), TypeScript, and Tailwind CSS. It exports to plain HTML in `out/`, so it hosts free on GitHub Pages or Vercel.

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

1. Push to `main`. Because this repo's history was restarted, the first push needs `git push --force origin main`.
2. In the repo on GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Every push to `main` rebuilds and publishes. The workflow sets the base path (`/resume`) and site URL for you.

**Vercel**

1. Import the repo at vercel.com. No settings to change; it detects Next.js.
2. Add an environment variable `NEXT_PUBLIC_SITE_URL` with your final URL (for example `https://dennishom.com`) so canonical links, the sitemap, and the share image point to the right place.

## Where things live

| What | Where |
| --- | --- |
| Name, tagline, email, links, the five section titles, nav, old-URL forwards | `content/site.ts` |
| Projects (résumé order). `group: "home"` or `"school"` decides the section | `content/projects.ts` |
| Coursework write-ups (all under School) | `content/coursework.ts` |
| Things I did at work | `content/experience.ts` |
| Things I led at school (Texas eSports) | `content/leadership.ts` |
| Things I did for fun: replica gallery and space event photos | `content/studio.ts` |
| Bio, skills, education | `content/about.ts` |
| Résumé PDF (the only PDF on the site) | `public/dennis-hom-resume.pdf` |
| Colors and fonts | top of `app/globals.css`, fonts in `app/layout.tsx` |

You should not need to touch `components/` or `app/` to change text or add photos.

## Sections and URLs

| Section | URL | What is in it |
| --- | --- | --- |
| Things I did at home | `/home/` | BlastX Phantom, Home Chicken Coop |
| Things I did at school | `/school/` | NASA USDC-9, Propeller-Thrust Optimization, coursework |
| Things I did at work | `/work/` | AI Training & Evaluation, Pegasi Peripherals |
| Things I led at school | `/leadership/` | Texas eSports |
| Things I did for fun | `/fun/` | Replica gallery, space events |

The logo goes to the landing page. "Home" in the nav is the "at home" section. Old addresses (`/projects/...`, `/coursework/...`, `/experience/`, `/studio/`) forward to the new ones; the list is `redirects` in `content/site.ts`.

## Add photos

1. Put the original in `media-src/<collection>/`, for example `media-src/pegasi/cloth-pad-front.jpg`. Any size, JPG/PNG/HEIC. Name it in kebab-case; the script lowercases and hyphenates whatever you give it.
2. Run `npm run media`. It writes AVIF and WebP at 480, 960, and 1600 px wide to `public/media/`, strips EXIF and GPS data, and updates `content/generated/media.json`.
3. Reference it in a content file by id, which is the path without the extension:

   ```ts
   { id: "pegasi/cloth-pad-front", alt: "Describe what is in the photo", caption: "Optional caption." }
   ```

4. Commit `public/media/` and `content/generated/media.json`.

`media-src/` is gitignored, so originals stay on your machine. A wrong id fails the build with a clear message instead of shipping a broken image. To crop or rotate a photo, add an entry to `scripts/media-edits.json`.

## Add a project or coursework entry

Copy an object in `content/projects.ts` (or `coursework.ts`), give it a new `slug`, set `group` to `"home"` or `"school"`, and fill it in. It gets a card in that section, a page at `/<group>/<slug>/`, and a sitemap entry.

A page body is a list of blocks, rendered in order:

| Block `type` | Use it for |
| --- | --- |
| `prose` | Paragraphs |
| `list` | Bullets. `"Label: text"` gets a bold label. |
| `specs` | Label and value rows |
| `stats` | Big numbers |
| `table` | Data tables (FMEA, results, test matrices) |
| `steps` | Numbered procedure cards |
| `figure`, `gallery` | One image, or a grid with a lightbox |
| `compare` | Two images side by side (before/after, CAD vs. real) |
| `split` | Text beside an image |
| `video` | A re-encoded MP4 |
| `callout` | A highlighted note with an optional link |

Types are in `content/types.ts`; your editor will autocomplete the fields. The NASA USDC-9 entry has commented stubs showing where an FMEA table and test cases go.

## Add the firing video

```bash
sudo apt-get install -y ffmpeg
npm run video -- path/to/BlastXPhantom_Shooting_Video.MP4
```

It writes an H.264 MP4 (1080p max, no audio) and a poster frame to `public/media/video/`, then prints one line to paste into `content/projects.ts` in place of `phantomFiringVideo = null`. The video plays muted on loop while on screen, with controls.

## Update the résumé

Replace `public/dennis-hom-resume.pdf`. The copy there now is your résumé with the phone number removed from the contact line.

## Scroll animations and image loading

- Everything is visible in the plain HTML. Sections that start below the fold get a short fade-in when you scroll to them. If JavaScript does not run, or the visitor prefers reduced motion, there is simply no animation. Nothing is ever hidden waiting for a script (`components/Reveal.tsx`).
- Images lazy-load for a fast first paint, then the rest load in the background once the page is idle, so nothing is blank when you scroll or take a full-page screenshot. This is skipped for visitors with data saver on.
- `npm run dev` on a forwarded URL: `next.config.ts` allows `127.0.0.1`, GitHub Codespaces, and common tunnels. For any other hostname, start it with `NEXT_ALLOWED_DEV_ORIGINS="your.host" npm run dev`. Without that, Next.js blocks its dev connection and menus and the lightbox will not respond (content still shows).

## Other

- `npm run og` rebuilds the link-preview image `public/og.jpg`.
- Open items are tracked in `TODO.md` and as `TODO(...)` comments in `content/`.
