# Design system

Prototype design system for GlowHub AI, pending brand approval. Tokens:
`src/config/brand.ts` (source of truth) mirrored in `src/app/globals.css`.
Live reference: `/internal/brand`.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `plum` | #432C3A | Primary text, primary CTA, dark sections |
| `plum-600` | #6B5262 | Muted text |
| `ink` | #2A1C25 | Primary button hover, highest-contrast text |
| `rose` | #B76E79 | Logo period, large accents (≥24px), icons, focus ring |
| `rose-700` | #9A5560 | Rose text and links; rose button background |
| `rose-800` | #8A4A55 | Rose text on blush; rose button hover |
| `cream` | #FAF6F0 | Page background |
| `blush` | #F1DFDF | Soft panels, selected states (`secondary`, `accent`) |
| `sage` | #859681 | Decorative only |
| `sage-700` | #5E6E5A | Positive status text |
| `champagne` | #D9BE9C | Decorative; as text only on plum |
| `danger` | #A3302B | Errors, destructive actions |
| `warning` | #85570B | Caution text |

shadcn semantic tokens map onto these (`primary` = plum, `secondary`/`accent` = blush,
`muted` = #F3EDE5, `ring` = rose, `border` = #E6DCD3, `input` = #D9CCC1).

### Contrast (WCAG 2.2 AA)
Every approved pairing is listed in `contrastPairs` and enforced by
`src/lib/brand/contrast.test.ts`. Key results:

| Pairing | Ratio | Allowed for |
| --- | --- | --- |
| plum on cream | 11.75:1 | all text |
| cream on plum | 11.75:1 | all text |
| rose-700 on cream | 5.08:1 | all text |
| cream on rose-700 | 5.08:1 | button text |
| sage-700 on cream | 5.06:1 | all text |
| rose on cream | 3.53:1 | large text and UI graphics only |
| sage on cream | 2.92:1 | decorative only |
| champagne on cream | 1.65:1 | decorative only |

Status is never shown by colour alone: pair colour with an icon or label.

## Typography

| Role | Font | Size |
| --- | --- | --- |
| Hero | Cormorant Garamond 600 | 38–46px mobile, 56–76px desktop |
| Section heading | Cormorant Garamond 600 | 32–40px |
| UI headings | Manrope 600 | 18–20px |
| Body (marketing) | Manrope 400 | 16px |
| Application body | Manrope 400 | 14–16px |
| Eyebrow / tagline | Manrope 600, 0.24em tracking, uppercase | 12px |

Classes: `font-display` for Cormorant, default `font-sans` is Manrope.

## Layout and spacing

- 4/8px spacing scale (Tailwind default).
- Marketing max width 1440px; workspace sidebar ~248px.
- Page padding: 16px mobile, 24–32px desktop.
- Corner radius: base 10px (`--radius`), range 8–12px for controls and cards.
- Breakpoints tested: 360, 390, 768, 1024, 1440px — no horizontal overflow.

## Components

- Buttons: default (plum) 44px, `lg` 48px, `sm` 32px for dense tables only. Variants:
  default, `rose`, outline, secondary, ghost, link, destructive.
- Focus: solid 2px rose ring with 2px offset on buttons; 2px rose outline elsewhere.
- Elevation: borders over shadows; at most `shadow-xs`. No glassmorphism or gradients.

## Motion

Restrained, purposeful transitions with Motion for React. Every animation honours
`prefers-reduced-motion` (global CSS fallback plus `useReducedMotion` in components).
