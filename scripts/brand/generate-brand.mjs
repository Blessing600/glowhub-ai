/**
 * Generates the GlowHub logo suite into public/brand.
 *
 *   npm run brand:generate
 *
 * Glyphs come from Bodoni Moda (SIL OFL 1.1) and Manrope (SIL OFL 1.1)
 * via @fontsource, and are converted to SVG outlines with opentype.js, so the
 * output contains vector paths only — no embedded fonts or raster images.
 * PNG/ICO icons are rasterised from those SVGs with sharp.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import opentype from "opentype.js";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/brand");
const appDir = path.join(root, "src/app");

// Mirrors src/config/brand.ts (Stone & Plum)
const color = {
  plum: "#342038",
  espresso: "#302420",
  ivory: "#FFF7EF",
  rose: "#B9527C",
};

function loadFont(file) {
  const buf = fs.readFileSync(path.join(root, "node_modules/@fontsource", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const display = loadFont("bodoni-moda/files/bodoni-moda-latin-500-normal.woff");
const sans = loadFont("manrope/files/manrope-latin-600-normal.woff");

/**
 * Optical kerning for the wordmark, in font units (1000/em).
 * Bodoni's text spacing reads loose at logo sizes, so round and stem pairs are tightened.
 */
const wordmarkKerning = {
  gl: -14,
  lo: -8,
  ow: -26,
  wh: -18,
  hu: -10,
  ub: -8,
};

/** Lays out `text` and returns per-glyph SVG paths plus the overall bounds. */
function layout(font, text, { size, x = 0, y = 0, tracking = 0, kerning = {} }) {
  const scale = size / font.unitsPerEm;
  const glyphs = [];
  let cursor = x;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const glyph = font.charToGlyph(ch);
    const glyphPath = glyph.getPath(cursor, y, size);
    glyphs.push({ ch, path: glyphPath });
    const next = text[i + 1];
    let advance = glyph.advanceWidth;
    if (next) {
      advance += font.getKerningValue(glyph, font.charToGlyph(next));
      advance += kerning[ch + next] ?? 0;
      advance += tracking;
    }
    cursor += advance * scale;
  }
  return { glyphs, width: cursor - x };
}

function bounds(glyphs) {
  const box = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
  for (const { path: p } of glyphs) {
    const b = p.getBoundingBox();
    if (b.x1 === b.x2) continue; // space
    box.x1 = Math.min(box.x1, b.x1);
    box.y1 = Math.min(box.y1, b.y1);
    box.x2 = Math.max(box.x2, b.x2);
    box.y2 = Math.max(box.y2, b.y2);
  }
  return box;
}

const d = (glyphs) => glyphs.map((g) => g.path.toPathData(2)).join("");

function svgDoc({ box, pad = 0, title, body, background }) {
  const x = box.x1 - pad;
  const y = box.y1 - pad;
  const w = box.x2 - box.x1 + pad * 2;
  const h = box.y2 - box.y1 + pad * 2;
  const vb = [x, y, w, h].map((n) => +n.toFixed(2)).join(" ");
  const bg = background
    ? `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" fill="${background}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-labelledby="t"><title id="t">${title}</title>${bg}${body}</svg>\n`;
}

/* ---------- Wordmark: "glowhub" + rose diamond + "AI" ---------- */
function wordmark(letters, accent) {
  const word = layout(display, "glowhub", { size: 100, kerning: wordmarkKerning });
  const wordBox = bounds(word.glyphs);
  const xHeight = 0.46 * 100; // Bodoni Moda x-height ≈ 0.46em
  const gap = 12;
  const diamond = 9;
  const dx = wordBox.x2 + gap + diamond;
  const dy = -xHeight / 2;
  const diamondPath = `M${dx} ${dy - diamond}L${dx + diamond} ${dy}L${dx} ${dy + diamond}L${dx - diamond} ${dy}Z`;
  const ai = layout(sans, "AI", { size: 34, tracking: 120, x: dx + diamond + gap });
  const aiBox = bounds(ai.glyphs);
  // Align the cap height of "AI" with the wordmark's x-height.
  const shift = -xHeight - aiBox.y1 + (xHeight - (aiBox.y2 - aiBox.y1)) / 2;
  ai.glyphs.forEach((g) =>
    g.path.commands.forEach((c) => {
      for (const k of ["y", "y1", "y2"]) if (k in c) c[k] += shift;
    }),
  );
  const box = bounds([...word.glyphs, ...ai.glyphs]);
  return {
    box,
    body: `<path fill="${letters}" d="${d(word.glyphs)}"/><path fill="${accent}" d="${diamondPath}"/><path fill="${letters}" d="${d(ai.glyphs)}"/>`,
  };
}

/* ---------- Monogram: "g" with a rose diamond on a rounded tile ---------- */
function monogram({ tile, letter, accent, size = 512, glyphScale = 0.6, radius = 0.2, rounded = true }) {
  const { glyphs } = layout(display, "g", { size: 100 });
  const box = bounds(glyphs);
  const gw = box.x2 - box.x1;
  const gh = box.y2 - box.y1;
  const s = (size * glyphScale) / Math.max(gw, gh);
  const tx = (size - gw * s) / 2 - box.x1 * s - size * 0.04;
  const ty = (size - gh * s) / 2 - box.y1 * s;
  const r = rounded ? size * radius : 0;
  const rect = tile ? `<rect width="${size}" height="${size}" rx="${r.toFixed(2)}" fill="${tile}"/>` : "";
  const dm = size * 0.05;
  const dcx = size / 2 + (gw * s) / 2 + dm * 0.4;
  const dcy = size / 2 - (gh * s) * 0.18;
  const diamondPath = `M${dcx} ${dcy - dm}L${dcx + dm} ${dcy}L${dcx} ${dcy + dm}L${dcx - dm} ${dcy}Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="t"><title id="t">GlowHub AI</title>${rect}<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})"><path fill="${letter}" d="${d(glyphs)}"/></g><path fill="${accent}" d="${diamondPath}"/></svg>\n`;
}

/* ---------- Write files ---------- */
fs.mkdirSync(outDir, { recursive: true });
for (const old of fs.readdirSync(outDir)) fs.rmSync(path.join(outDir, old));
const write = (name, content) => {
  fs.writeFileSync(path.join(outDir, name), content);
  return name;
};
const pad = 6;
const title = "GlowHub AI";

const files = [
  write("glowhub-wordmark.svg", svgDoc({ ...wordmark(color.plum, color.rose), pad, title })),
  write("glowhub-wordmark-reverse.svg", svgDoc({ ...wordmark(color.ivory, color.rose), pad, title })),
  write("glowhub-wordmark-mono.svg", svgDoc({ ...wordmark(color.plum, color.plum), pad, title })),
  write("glowhub-wordmark-mono-white.svg", svgDoc({ ...wordmark("#FFFFFF", "#FFFFFF"), pad, title })),
  write("glowhub-monogram.svg", monogram({ tile: color.plum, letter: color.ivory, accent: color.rose })),
  write("glowhub-compact.svg", monogram({ tile: null, letter: color.plum, accent: color.rose, glyphScale: 0.84 })),
];

const faviconSvg = monogram({ tile: color.plum, letter: color.ivory, accent: color.rose, glyphScale: 0.7 });
files.push(write("favicon.svg", faviconSvg));

// Square, unrounded art for platforms that apply their own mask.
const appleSvg = monogram({ tile: color.plum, letter: color.ivory, accent: color.rose, rounded: false, glyphScale: 0.58 });
// Maskable: glyph inside the 80% safe zone, full-bleed background.
const maskableSvg = monogram({ tile: color.plum, letter: color.ivory, accent: color.rose, rounded: false, glyphScale: 0.48 });

const png = (svg, size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();

const pngTargets = [
  ["apple-touch-icon.png", appleSvg, 180],
  ["icon-192.png", faviconSvg, 192],
  ["icon-512.png", faviconSvg, 512],
  ["icon-maskable-192.png", maskableSvg, 192],
  ["icon-maskable-512.png", maskableSvg, 512],
];
for (const [name, svg, size] of pngTargets) {
  fs.writeFileSync(path.join(outDir, name), await png(svg, size));
  files.push(name);
}

const icoPngs = await Promise.all([16, 32, 48].map((s) => png(faviconSvg, s)));
const ico = await pngToIco(icoPngs);
fs.writeFileSync(path.join(outDir, "favicon.ico"), ico);
files.push("favicon.ico");

// Next.js App Router file conventions pick these up for <link rel="icon">.
fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
fs.writeFileSync(path.join(appDir, "icon.svg"), faviconSvg);
fs.writeFileSync(path.join(appDir, "apple-icon.png"), await png(appleSvg, 180));

console.log(`Wrote ${files.length} files to public/brand:\n  ${files.join("\n  ")}`);
