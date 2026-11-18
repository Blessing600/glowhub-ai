/**
 * GlowHub brand tokens — single source of truth.
 * Approved PRD v2.0 palette: deep plum, hibiscus rose, warm ivory (cream), terracotta,
 * antique gold and espresso (ink). Blush, plum600 and the -700/-800 shades are tints
 * derived for accessible text; sage is kept for positive status only.
 * CSS custom properties in src/app/globals.css mirror these values;
 * src/lib/brand/contrast.test.ts verifies the text pairings meet WCAG 2.2 AA.
 */
export const palette = {
  plum: "#342038",
  plum600: "#5F4B63",
  ink: "#302420",
  rose: "#B9527C",
  rose700: "#9C3F66",
  rose800: "#8A3459",
  cream: "#FFF7EF",
  blush: "#F7E6EA",
  terracotta: "#B96546",
  terracotta700: "#9A4E33",
  gold: "#C59B5D",
  /** Warm bronze sampled from a skin-tone reference supplied by the owner (17 Nov 2026). */
  bronze: "#A4684A",
  bronze700: "#9A6448",
  bronze800: "#87553C",
  sage: "#859681",
  sage700: "#5E6E5A",
  white: "#FFFFFF",
  danger: "#A3302B",
  warning: "#85570B",
} as const;

export type PaletteColor = keyof typeof palette;

/**
 * Approved foreground/background pairings and the WCAG level each must meet.
 * "text" = normal body text (4.5:1), "large" = ≥24px or ≥18.66px bold (3:1),
 * "ui" = non-text UI components and graphics (3:1).
 */
export const contrastPairs: ReadonlyArray<{
  fg: PaletteColor;
  bg: PaletteColor;
  use: "text" | "large" | "ui";
  note: string;
}> = [
  { fg: "plum", bg: "cream", use: "text", note: "Primary text" },
  { fg: "plum", bg: "blush", use: "text", note: "Text on blush panels" },
  { fg: "plum", bg: "white", use: "text", note: "Text on cards" },
  { fg: "plum600", bg: "cream", use: "text", note: "Muted text" },
  { fg: "plum600", bg: "white", use: "text", note: "Muted text on cards" },
  { fg: "cream", bg: "plum", use: "text", note: "Primary button / dark sections" },
  { fg: "gold", bg: "plum", use: "text", note: "Accent text on dark sections" },
  { fg: "rose700", bg: "cream", use: "text", note: "Rose links and emphasis" },
  { fg: "rose700", bg: "white", use: "text", note: "Rose links on cards" },
  { fg: "rose800", bg: "blush", use: "text", note: "Rose text on blush" },
  { fg: "cream", bg: "rose700", use: "text", note: "Secondary (rose) button" },
  { fg: "sage700", bg: "cream", use: "text", note: "Positive / sage status text" },
  { fg: "sage700", bg: "white", use: "text", note: "Sage status text on cards" },
  { fg: "danger", bg: "cream", use: "text", note: "Error text" },
  { fg: "danger", bg: "white", use: "text", note: "Error text on cards" },
  { fg: "cream", bg: "danger", use: "text", note: "Destructive button" },
  { fg: "warning", bg: "cream", use: "text", note: "Warning text" },
  { fg: "warning", bg: "white", use: "text", note: "Warning text on cards" },
  { fg: "plum600", bg: "blush", use: "text", note: "Muted text on blush sections" },
  { fg: "cream", bg: "ink", use: "text", note: "Footer text" },
  { fg: "gold", bg: "ink", use: "text", note: "Footer headings and notes" },
  { fg: "terracotta700", bg: "cream", use: "text", note: "Terracotta text" },
  { fg: "terracotta700", bg: "white", use: "text", note: "Terracotta text on cards" },
  { fg: "terracotta", bg: "cream", use: "ui", note: "Terracotta graphics" },
  { fg: "bronze", bg: "cream", use: "large", note: "Display accent (hero \"intelligent.\") ≥24px only" },
  { fg: "cream", bg: "bronze700", use: "text", note: "Explore Glow Scan button" },
  { fg: "cream", bg: "bronze800", use: "text", note: "Explore Glow Scan button hover" },
  { fg: "rose", bg: "white", use: "ui", note: "Icons on cards" },
  { fg: "rose", bg: "cream", use: "large", note: "Display accents ≥24px only" },
  { fg: "rose", bg: "cream", use: "ui", note: "Logo period, icons, focus ring" },
  { fg: "cream", bg: "rose", use: "large", note: "Monogram on rose" },
];

export const fonts = {
  display: "Playfair Display",
  body: "Manrope",
} as const;

export const brandCopy = {
  name: "GlowHub",
  wordmark: "glowhub.",
  extended: "glowhub ai",
  tagline: "BEAUTY MEETS INTELLIGENCE",
  proposition: "Beautiful businesses. Intelligent commerce.",
  secondaryLine: "The AI-powered operating system for Africa's beauty businesses.",
} as const;
