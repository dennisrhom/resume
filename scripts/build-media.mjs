#!/usr/bin/env node
/**
 * Image pipeline.
 *
 * Reads originals from media-src/<collection>/<name>.<ext> and writes
 * web-ready AVIF + WebP files at several widths to public/media/, plus a
 * manifest (content/generated/media.json) that the <Picture> component reads.
 *
 *   npm run media            process new or changed originals
 *   npm run media -- --force re-encode everything
 *   npm run media -- --prune drop manifest entries whose original is gone
 *
 * Notes
 * - media-src/ is gitignored. Originals never leave your machine; only the
 *   optimized outputs in public/media/ are committed and deployed.
 * - All metadata (EXIF, GPS) is stripped from outputs.
 * - File names are forced to kebab-case. "TXEsporrts4 Final.JPEG" becomes
 *   "txesporrts4-final", so fix typos in the source name before running.
 * - Optional per-image crop/rotate lives in scripts/media-edits.json.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "media-src");
const OUT = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "content", "generated", "media.json");
const EDITS = path.join(ROOT, "scripts", "media-edits.json");
const WIDTHS = [480, 960, 1600];
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff", ".heic"]);

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const PRUNE = args.has("--prune");

const kebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (EXTS.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

const readJson = async (p, fallback) => {
  try {
    return JSON.parse(await fs.readFile(p, "utf8"));
  } catch {
    return fallback;
  }
};

const exists = (p) => fs.access(p).then(() => true, () => false);

async function main() {
  const manifest = await readJson(MANIFEST, {});
  const edits = await readJson(EDITS, {});
  const files = await walk(SRC);
  const seen = new Set();
  let built = 0;

  for (const file of files.sort()) {
    const rel = path.relative(SRC, file);
    const dirParts = path.dirname(rel).split(path.sep).filter((p) => p !== ".").map(kebab);
    const name = kebab(path.basename(rel, path.extname(rel)));
    const id = [...dirParts, name].join("/");
    if (seen.has(id)) {
      console.warn(`! duplicate id "${id}" (${rel}), skipped`);
      continue;
    }
    seen.add(id);

    const stat = await fs.stat(file);
    const edit = edits[id] ?? {};
    const stamp = `${stat.mtimeMs}:${stat.size}:${JSON.stringify(edit)}`;
    const prev = manifest[id];
    const outDir = path.join(OUT, ...dirParts);

    if (!FORCE && prev && prev.stamp === stamp) {
      const ok = await exists(path.join(outDir, `${name}-${prev.widths.at(-1)}.avif`));
      if (ok) continue;
    }

    // Decode once, apply EXIF rotation, then any manual edits.
    let img = sharp(file, { failOn: "none" }).rotate();
    if (edit.rotate) img = sharp(await img.toBuffer()).rotate(edit.rotate);
    if (edit.crop) img = sharp(await img.toBuffer()).extract(edit.crop);
    const base = await img.png().toBuffer();
    const meta = await sharp(base).metadata();
    const { width, height } = meta;

    const widths = WIDTHS.filter((w) => w < width);
    widths.push(Math.min(width, WIDTHS.at(-1)));
    const uniq = [...new Set(widths)].sort((a, b) => a - b);

    await fs.mkdir(outDir, { recursive: true });
    for (const w of uniq) {
      const resized = sharp(base).resize({ width: w, withoutEnlargement: true });
      await resized.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(outDir, `${name}-${w}.avif`));
      await resized.clone().webp({ quality: 78, effort: 5 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    }

    const { dominant } = await sharp(base).resize(64).stats();
    const hex = (n) => Math.round(n * 0.45).toString(16).padStart(2, "0");
    manifest[id] = {
      width,
      height,
      widths: uniq,
      color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
      stamp,
    };
    built++;
    console.log(`+ ${id}  ${width}x${height}  [${uniq.join(", ")}]`);
  }

  if (PRUNE) {
    for (const id of Object.keys(manifest)) {
      if (!seen.has(id)) {
        delete manifest[id];
        console.log(`- pruned ${id}`);
      }
    }
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`media: ${built} built, ${Object.keys(sorted).length} in manifest`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
