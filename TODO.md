# Open items

Things that could not be built from the uploaded material, or that need your call.
Each one also has a `TODO(...)` comment at the exact spot in `content/`.

## Missing files

- **`BlastXPhantom_Shooting_Video.MP4`**: not in the upload (chat attachments cannot carry video). The case study has a video slot that stays hidden until you add it. Steps are in the README under "Add the firing video".
- **`UT_ResumeSitePulled/`**: not in the upload. Nothing on the site depends on it.
- **Original full-resolution photos**: the uploaded copies were downscaled to about 2,200 px on the long side. That is plenty for the web. Drop originals in `media-src/` only if you want to re-crop.

## Content gaps

- **Home Chicken Coop**: no photos, and no detail beyond the two résumé bullets (valve mechanism, materials, reservoir size).
- **NASA USDC-9**: results of the 3-substrate absorption tests are on the résumé but not in the final report. Also to add: FMEA, test cases, CAD renders of the rig.
- **Mercor**: job title is not on the résumé. Listed by name under AI Training & Evaluation with May 2025 to present.

## Decisions for you

- **Propeller project vs. résumé**: the résumé says 3 propeller twists, 12+ LabVIEW trials, and pitches of 5.0 to 6.5 degrees. The final report documents 2 propellers (APC 6x6E and 6x5.5E, pitch in inches) and 2 trials. The site follows the report. Update one or the other so they agree.
- **Part count**: the résumé says "60+ part" assembly; the work sample says 74 printed parts, 14 internal. The site uses 74 and 14.
- **GPA**: the site shows 3.56. The résumé PDF still says 3.6.
- **Résumé PDF**: `public/dennis-hom-resume.pdf` is your résumé with the phone number removed and the contact line re-centered. Swap in your own export if you prefer.
- **WALL-E**: delta-v budget, propellant split, link budget, and margin percentage are left off because those numbers disagree inside the report.
- **USDC-9**: flow rate and cumulative uptake figures are left off (arithmetic slip in the report).
- **Voice**: all copy was rewritten in a casual first-person voice with the facts and numbers unchanged. The About bio, the Texas eSports intro, and the one-line section intros are my wording from résumé facts. Edit anything that does not sound like you in `content/`.
- **"Home" in the nav** goes to Things I did at home (`/home/`); the logo goes to the landing page. If you would rather "Home" mean the landing page, change `sections.home.nav` in `content/site.ts`.
- **Engineering Honors**: the academic summary lists your major as "Aerospace Engineering / Engineering Honors". The résumé does not mention honors, so the site does not either.
- **Site URL**: `content/site.ts` assumes `https://dennisrhom.github.io/resume`. Set `NEXT_PUBLIC_SITE_URL` if you deploy elsewhere.
