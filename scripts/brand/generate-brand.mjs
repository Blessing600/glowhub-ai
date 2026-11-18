/**
 * Generates the GlowHub logo suite into public/brand.
 *
 *   npm run brand:generate
 *
 * Glyphs come from Cormorant Garamond (SIL OFL 1.1) and Manrope (SIL OFL 1.1)
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

// Mirrors src/config/brand.ts
const color = {
  plum: "#342038",
  rose: "#B9527C",
  cream: "#FFF7EF",
};

function loadFont(file) {
  const buf = fs.readFileSync(path.join(root, "node_modules/@fontsource", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const display = loadFont("cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff");
const sans = loadFont("manrope/files/manrope-latin-600-normal.woff");

/**
 * Optical kerning for the wordmark, in font units (1000/em).
 * Cormorant's default spacing is set for text; at logo sizes the
 * round-to-round and stem pairs read loose, so they are tightened.
 */
const wordmarkKerning = {
  gl: -18,
  lo: -10,
  ow: -32,
  wh: -22,
  hu: -14,
  ub: -12,
  "b.": -6,
  "h ": 0,
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

/**
 * Enlarges the period around its own centre so the rose accent stays
 * visible at small sizes, keeping its left edge where the kerning put it.
 */
const PERIOD_SCALE = 1.25;
function emphasisePeriod(glyph) {
  const b = glyph.path.getBoundingBox();
  const cx = b.x1 + ((b.x2 - b.x1) * PERIOD_SCALE) / 2;
  const cy = (b.y1 + b.y2) / 2;
  const ox = (b.x1 + b.x2) / 2;
  const axes = [["x", "y"], ["x1", "y1"], ["x2", "y2"]];
  glyph.path.commands.forEach((c) => {
    for (const [kx, ky] of axes) {
      if (kx in c) c[kx] = cx + (c[kx] - ox) * PERIOD_SCALE;
      if (ky in c) c[ky] = cy + (c[ky] - cy) * PERIOD_SCALE;
    }
  });
  return glyph;
}

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

/* ---------- Wordmark: "glowhub." ---------- */
function wordmark(letters, period) {
  const { glyphs } = layout(display, "glowhub.", { size: 100, kerning: wordmarkKerning });
  emphasisePeriod(glyphs[7]);
  const word = glyphs.slice(0, 7);
  const dot = glyphs.slice(7);
  return {
    box: bounds(glyphs),
    body: `<path fill="${letters}" d="${d(word)}"/><path fill="${period}" d="${d(dot)}"/>`,
  };
}

/* ---------- Extended: "glowhub ai" ---------- */
function extended(letters, accent) {
  const { glyphs } = layout(display, "glowhub ai", {
    size: 100,
    kerning: { ...wordmarkKerning, "b ": -8, ai: -10 },
  });
  return {
    box: bounds(glyphs),
    body: `<path fill="${letters}" d="${d(glyphs.slice(0, 7))}"/><path fill="${accent}" d="${d(glyphs.slice(8))}"/>`,
  };
}

/* ---------- Lockup: wordmark + tagline ---------- */
function lockup(letters, period) {
  const mark = layout(display, "glowhub.", { size: 100, kerning: wordmarkKerning });
  emphasisePeriod(mark.glyphs[7]);
  const markBox = bounds(mark.glyphs);
  const markWidth = markBox.x2 - markBox.x1;
  // Size the tagline so it spans the letters (excluding the period).
  const letterBox = bounds(mark.glyphs.slice(0, 7));
  const target = letterBox.x2 - letterBox.x1;
  const probe = layout(sans, "BEAUTY MEETS INTELLIGENCE", { size: 10, tracking: 260 });
  const probeBox = bounds(probe.glyphs);
  const size = (10 * target) / (probeBox.x2 - probeBox.x1);
  const tagline = layout(sans, "BEAUTY MEETS INTELLIGENCE", {
    size,
    tracking: 260,
    x: 0,
    y: markBox.y2 + size * 2.4,
  });
  const tagBox = bounds(tagline.glyphs);
  const shift = letterBox.x1 - tagBox.x1;
  const tagD = tagline.glyphs
    .map((g) => {
      g.path.commands.forEach((c) => {
        for (const k of ["x", "x1", "x2"]) if (k in c) c[k] += shift;
      });
      return g.path.toPathData(2);
    })
    .join("");
  const box = {
    x1: Math.min(markBox.x1, tagBox.x1 + shift),
    y1: markBox.y1,
    x2: Math.max(markBox.x1 + markWidth, tagBox.x2 + shift),
    y2: tagBox.y2,
  };
  return {
    box,
    body: `<path fill="${letters}" d="${d(mark.glyphs.slice(0, 7))}"/><path fill="${period}" d="${d(mark.glyphs.slice(7))}"/><path fill="${letters}" d="${tagD}"/>`,
  };
}

/* ---------- Monogram: "g." on a rounded tile ---------- */
function monogram({ tile, letter, period, size = 512, glyphScale = 0.62, radius = 0.22, rounded = true }) {
  const fontSize = 100;
  const { glyphs } = layout(display, "g.", { size: fontSize, kerning: { "g.": -30 } });
  const box = bounds(glyphs);
  const gw = box.x2 - box.x1;
  const gh = box.y2 - box.y1;
  const s = (size * glyphScale) / Math.max(gw, gh);
  const tx = (size - gw * s) / 2 - box.x1 * s;
  const ty = (size - gh * s) / 2 - box.y1 * s;
  const r = rounded ? size * radius : 0;
  const rect = tile
    ? `<rect width="${size}" height="${size}" rx="${r.toFixed(2)}" fill="${tile}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="t"><title id="t">GlowHub</title>${rect}<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})"><path fill="${letter}" d="${d(glyphs.slice(0, 1))}"/><path fill="${period}" d="${d(glyphs.slice(1))}"/></g></svg>\n`;
}

/* ---------- Write files ---------- */
fs.mkdirSync(outDir, { recursive: true });
const write = (name, content) => {
  fs.writeFileSync(path.join(outDir, name), content);
  return name;
};
const pad = 6;

const files = [];
{
  const w = wordmark(color.plum, color.rose);
  files.push(write("glowhub-wordmark.svg", svgDoc({ ...w, pad, title: "glowhub." })));
}
{
  const w = wordmark(color.cream, color.rose);
  files.push(write("glowhub-wordmark-reverse.svg", svgDoc({ ...w, pad, title: "glowhub." })));
}
{
  const w = wordmark(color.plum, color.plum);
  files.push(write("glowhub-wordmark-mono.svg", svgDoc({ ...w, pad, title: "glowhub." })));
}
{
  const w = wordmark("#FFFFFF", "#FFFFFF");
  files.push(write("glowhub-wordmark-mono-white.svg", svgDoc({ ...w, pad, title: "glowhub." })));
}
{
  const w = extended(color.plum, color.rose);
  files.push(write("glowhub-ai-extended.svg", svgDoc({ ...w, pad, title: "glowhub ai" })));
}
{
  const w = extended(color.cream, color.rose);
  files.push(write("glowhub-ai-extended-reverse.svg", svgDoc({ ...w, pad, title: "glowhub ai" })));
}
{
  const w = lockup(color.plum, color.rose);
  files.push(write("glowhub-lockup.svg", svgDoc({ ...w, pad: 8, title: "glowhub. Beauty meets intelligence" })));
}
{
  const w = lockup(color.cream, color.rose);
  files.push(write("glowhub-lockup-reverse.svg", svgDoc({ ...w, pad: 8, title: "glowhub. Beauty meets intelligence" })));
}
// Compact = "g." without a tile, for tight horizontal spaces.
files.push(write("glowhub-compact.svg", monogram({ tile: null, letter: color.plum, period: color.rose, glyphScale: 0.9 })));
files.push(write("glowhub-monogram-rose.svg", monogram({ tile: color.rose, letter: color.cream, period: color.cream })));
files.push(write("glowhub-monogram-plum.svg", monogram({ tile: color.plum, letter: color.cream, period: color.rose })));

// Favicon uses the plum tile: higher contrast than rose at 16px.
const faviconSvg = monogram({ tile: color.plum, letter: color.cream, period: color.rose, glyphScale: 0.72 });
files.push(write("favicon.svg", faviconSvg));

// Square, unrounded art for platforms that apply their own mask.
const appleSvg = monogram({ tile: color.plum, letter: color.cream, period: color.rose, rounded: false, glyphScale: 0.6 });
// Maskable: glyph inside the 80% safe zone, full-bleed background.
const maskableSvg = monogram({ tile: color.plum, letter: color.cream, period: color.rose, rounded: false, glyphScale: 0.5 });

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
