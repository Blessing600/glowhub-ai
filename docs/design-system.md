# Design system — Stone & Plum

Tokens: `src/config/brand.ts` (source of truth) mirrored in `src/app/globals.css`.
Live reference: `/internal/brand`. Brand rationale: `docs/brand-guidelines.md`.

## Colour
See the token table in `docs/brand-guidelines.md`. shadcn semantic tokens map onto them:
`primary` = plum, `secondary`/`muted`/`accent` = sand, `ring` = rose, `border` = line,
`background` = ivory, `foreground` = ink (espresso).

### Contrast (WCAG 2.2 AA)
Every approved pairing is in `contrastPairs` and enforced by `src/lib/brand/contrast.test.ts`.

| Pairing | Ratio | Allowed for |
| --- | --- | --- |
| ink on ivory | 14.2:1 | all text |
| ink on stone | 10.2:1 | all text (hero) |
| plum on ivory / ivory on plum | 14.0:1 | all text |
| taupe on ivory | 7.3:1 | all text |
| taupe on stone | 5.2:1 | all text |
| gold on plum | 5.8:1 | all text |
| rose-700 on ivory | 6.6:1 | all text |
| rose on ivory | 4.3:1 | large text (≥24px) and UI graphics only |
| terracotta on ivory | 4.0:1 | large text (≥24px) only |

Status is never shown by colour alone: pair colour with an icon or label.

## Typography

| Role | Font | Size |
| --- | --- | --- |
| Hero | Playfair Display 400, italic second line | 44px mobile, 56–68px desktop |
| Section heading | Playfair Display 400, `text-balance` | 36–52px |
| UI headings | Manrope 600 | 18–20px |
| Body | Manrope 400 | 16–18px |
| Eyebrow | Manrope 600, 0.24em tracking, uppercase | 11px |
| System label (product UI only) | IBM Plex Mono 500, uppercase | 11–12px |

Classes: `font-display` (Playfair), `font-sans` (Manrope, default), `font-mono` (Plex Mono).
Never use Playfair on tables, forms or small labels. Use `<em>` in headings for one italic
phrase of emphasis, not more.

Copy: one short headline and at most one or two supporting sentences per section; let
photography and real interface states carry the story.

## Layout and spacing

- 4/8px spacing scale (Tailwind default).
- Marketing max width 1440px; workspace sidebar ~248px.
- Page padding: 16px mobile, 24–32px desktop.
- Corner radius: base 8px (`--radius`).
- Breakpoints tested: 360, 390, 768, 1024, 1440px — no horizontal overflow.

## Components

- Buttons: default (emerald) 44px, `lg` 48px, `sm` 32px for dense tables only. Variants:
  default, `ivory` (on emerald), outline, secondary, ghost, link, destructive. One strong
  primary action per view; secondary actions are text links.
- Focus: solid 2px copper ring with 2px offset on buttons; 2px copper outline elsewhere.
- Shared layout primitives: `Container`, `Eyebrow`, `Section`, `PageHeader`, `RuledList`,
  `CtaBand` (`src/components/marketing/section.tsx`); `PhotoPlaceholder` renders a licensed
  image or a labelled, replaceable photo slot.
- Elevation: borders over shadows; at most `shadow-xs`. No glassmorphism or gradients.

## Motion

Restrained, purposeful transitions only. Every animation honours `prefers-reduced-motion`
via the global CSS fallback.
