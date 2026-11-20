/**
 * GlowHub brand tokens — single source of truth (Stone & Plum, Nov 2026).
 * Warm neutrals (ivory, stone, sand) carry most surfaces; plum is the primary action
 * and dark surface; espresso is text and the footer. Hibiscus rose, antique gold and
 * terracotta are restrained accents, one at a time. rose700 and taupe are derived for
 * accessible small text. CSS custom properties in src/app/globals.css mirror these;
 * src/lib/brand/contrast.test.ts verifies the pairings meet WCAG 2.2 AA.
 */
export const palette = {
  plum: "#342038",
  /** Hover for plum buttons and links. */
  plum600: "#4B2F51",
  espresso: "#302420",
  ivory: "#FFF7EF",
  /** Warm stone: hero and editorial panels. */
  stone: "#DDD3C6",
  /** Light warm panel between ivory and stone. */
  sand: "#F3EADF",
  rose: "#B9527C",
  /** Hibiscus for normal-size text: base rose is below 4.5:1 on ivory. */
  rose700: "#94395F",
  terracotta: "#B96546",
  gold: "#C59B5D",
  ink: "#302420",
  taupe: "#5E5049",
  line: "#E4D9CC",
  white: "#FFFFFF",
  success: "#2F6B45",
  warning: "#7A5208",
  danger: "#A3302B",
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
  { fg: "ink", bg: "ivory", use: "text", note: "Primary text" },
  { fg: "ink", bg: "white", use: "text", note: "Text on cards" },
  { fg: "ink", bg: "sand", use: "text", note: "Text on sand panels" },
  { fg: "ink", bg: "stone", use: "text", note: "Text on stone (hero)" },
  { fg: "taupe", bg: "ivory", use: "text", note: "Secondary text" },
  { fg: "taupe", bg: "white", use: "text", note: "Secondary text on cards" },
  { fg: "taupe", bg: "sand", use: "text", note: "Secondary text on sand" },
  { fg: "taupe", bg: "stone", use: "text", note: "Secondary text on stone" },
  { fg: "plum", bg: "ivory", use: "text", note: "Headings, links" },
  { fg: "plum", bg: "white", use: "text", note: "Links on cards" },
  { fg: "plum", bg: "sand", use: "text", note: "Headings on sand" },
  { fg: "plum", bg: "stone", use: "text", note: "Headings on stone" },
  { fg: "ivory", bg: "plum", use: "text", note: "Primary button / plum sections" },
  { fg: "ivory", bg: "plum600", use: "text", note: "Primary button hover" },
  { fg: "ivory", bg: "espresso", use: "text", note: "Footer and dark panels" },
  { fg: "gold", bg: "plum", use: "text", note: "Eyebrows on plum" },
  { fg: "gold", bg: "espresso", use: "text", note: "Footer headings" },
  { fg: "rose700", bg: "ivory", use: "text", note: "Accent eyebrows and labels" },
  { fg: "rose700", bg: "white", use: "text", note: "Accent labels on cards" },
  { fg: "rose700", bg: "sand", use: "text", note: "Accent labels on sand" },
  { fg: "rose700", bg: "stone", use: "large", note: "Accent display text on stone" },
  { fg: "rose", bg: "ivory", use: "large", note: "Display accents ≥24px only" },
  { fg: "rose", bg: "ivory", use: "ui", note: "Rules, icons, focus ring" },
  { fg: "rose", bg: "espresso", use: "ui", note: "Logo accent on dark" },
  { fg: "terracotta", bg: "ivory", use: "large", note: "Display accents ≥24px only" },
  { fg: "success", bg: "ivory", use: "text", note: "Positive status text" },
  { fg: "success", bg: "white", use: "text", note: "Positive status on cards" },
  { fg: "warning", bg: "ivory", use: "text", note: "Warning text" },
  { fg: "warning", bg: "white", use: "text", note: "Warning text on cards" },
  { fg: "danger", bg: "ivory", use: "text", note: "Error text" },
  { fg: "danger", bg: "white", use: "text", note: "Error text on cards" },
  { fg: "white", bg: "danger", use: "text", note: "Destructive button" },
];

export const fonts = {
  display: "Playfair Display",
  body: "Manrope",
  mono: "IBM Plex Mono",
} as const;

export const brandCopy = {
  name: "GlowHub AI",
  wordmark: "glowhub",
  tagline: "INTELLIGENT BEAUTY COMMERCE",
  proposition: "Beauty is your business. Intelligence is ours.",
  secondaryLine:
    "The AI-native selling and business-intelligence platform for African beauty businesses.",
} as const;
