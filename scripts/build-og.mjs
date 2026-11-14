#!/usr/bin/env node
/**
 * Builds public/og.jpg (1200x630), the image shown when the site link is
 * shared. Re-run with `npm run og` if you change the name, tagline, or photo.
 * Uses Chakra Petch / IBM Plex Mono if installed, otherwise a system sans.
 */
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const photo = path.join(ROOT, "public/media/blastx-phantom/finished-bench-1600.webp");
const W = 1200;
const H = 630;

const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0" stop-color="#0b0d10" stop-opacity="1"/>
      <stop offset="0.46" stop-color="#0b0d10" stop-opacity="0.96"/>
      <stop offset="0.8" stop-color="#0b0d10" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#0b0d10" stop-opacity="0.1"/>
    </linearGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M30 0H0V30" fill="none" stroke="#e9e5dd" stroke-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="640" height="${H}" fill="url(#grid)"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#272d37"/>
  <path d="M28 60V28H60" fill="none" stroke="#f28c3a" stroke-width="4"/>
  <path d="M${W - 28} ${H - 60}V${H - 28}H${W - 60}" fill="none" stroke="#f28c3a" stroke-width="4"/>
  <text x="72" y="236" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="22" letter-spacing="4" fill="#f28c3a">AEROSPACE ENGINEER / UT AUSTIN '25</text>
  <text x="68" y="348" font-family="Chakra Petch, DejaVu Sans, sans-serif" font-weight="700" font-size="112" fill="#e9e5dd">Dennis Hom</text>
  <text x="72" y="412" font-family="Chakra Petch, DejaVu Sans, sans-serif" font-weight="700" font-size="34" fill="#bdb9b1">I design it in CAD, build it, and test it.</text>
  <text x="72" y="556" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" letter-spacing="3" fill="#8d929b">ENGINEERING PORTFOLIO</text>
</svg>`;

const bg = await sharp(photo).resize(W, H, { fit: "cover", position: "right" }).toBuffer();
await sharp(bg)
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));
console.log("og: wrote public/og.jpg");
