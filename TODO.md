# Open items

Things that still need material or a decision. Each one also has a `TODO(...)` comment at the exact spot in `content/`.

## Waiting on you

- **Photo of yourself**: the infobox on the main article has an empty space reserved for it. Steps are in the README under "Your photo in the infobox".
- **Résumé PDF**: removed from the site. Send a redacted version and it can be linked under External links.
- **Gaming social links**: add them to `gaming.links` in `content/hobbies.ts` and they show under Hobbies > Gaming.
- **Footnotes**: none yet. Planned for a later pass.
- **`BlastXPhantom_Shooting_Video.MP4`**: not in the upload. The Phantom article has a video slot that stays hidden until you add it. Steps are in the README under "Add the firing video".
- **Share image**: `public/og.jpg` still uses the old dark design. Rebuild it with `npm run og` after updating `scripts/build-og.mjs` if you want it to match.

## Content gaps

- **Home Chicken Coop**: summary only on the main article, with no page of its own. No photos, and no detail beyond the two résumé bullets (valve mechanism, materials, reservoir size).
- **NASA USDC-9**: results of the 3-substrate absorption tests are on the résumé but not in the final report. Also to add: FMEA, test cases, CAD renders of the rig.

## Decisions made

- **Propeller project**: the infobox, lead, and main-article summary use the résumé numbers (3 twists, 12+ LabVIEW trials, 5.0–6.5° pitch). The results table still comes from the final report (2 propellers, 2 trials) and is labeled "Results from two of the trials". Add the other runs if you have them.
- **Part count**: 74 printed parts, 14 internal or moving.
- **GPA**: 3.56 (the résumé PDF still says 3.6).
- **AI training**: Handshake AI and Mercor are one entry, "AI training", under Experience.
- **Texas eSports**: lives under Experience; Education and Hobbies > Gaming link to it.
- **Coursework projects**: summarized under Projects > Academic projects; Education > Coursework links there.
- **Old URLs**: the earlier section pages (`/home/`, `/school/`, `/work/`, `/leadership/`, `/fun/`, `/about/`) and their forwards were removed. Project articles moved to `/<slug>/`.

## Still open from the reports

- **WALL-E**: delta-v budget, propellant split, link budget, and margin percentage are left off because those numbers disagree inside the report.
- **USDC-9**: flow rate and cumulative uptake figures are left off (arithmetic slip in the report).
- **Site URL**: `content/site.ts` assumes `https://dennisrhom.github.io/resume`. Set `NEXT_PUBLIC_SITE_URL` if you deploy elsewhere.
