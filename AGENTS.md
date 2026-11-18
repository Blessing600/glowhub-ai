# GlowHub AI — agent guide

Frontend prototype for GlowHub AI (AERA Technologies, pre-launch): a beauty discovery
product for shoppers and a B2B operating system for beauty businesses.

**Read first:** `docs/product-requirements.md` (implementation brief + full source PRD)
and `docs/implementation-plan.md` (milestone log — resume from the first unchecked item).

## Non-negotiable product constraints

- **Everything is fictional.** No production auth, live AI, real payments, real supplier
  approval, outbound messages or marketplace checkout. All records come from one
  deterministic seed. Never add real customer data, secrets or real brand ingredient lists.
- **Locked features.** Live Glow Scan analysis, marketplace and payments are locked off in
  `src/config/env.ts`; setting their flags to `true` throws. Don't work around this.
- **Glow Scan camera:** consent before camera; local preview only — no upload, storage,
  persistence or analysis of a real photo. Stop media tracks and revoke object URLs on
  capture, cancel, route exit and unmount. Label real photos "Camera preview only. This
  prototype does not analyse your photograph." Fictional observations exist only for the
  bundled sample image and must never be attributed to a user's face.
- **Beauty safety:** cosmetic guidance only. No diagnosis, prescription, biometric
  inference, age estimates, attractiveness/skin-tone scores or skin-lightening goals.
  Red-flag symptoms stop recommendations and refer to qualified care; emergency signs →
  urgent medical help. A disclaimer never replaces screening.
- **Trust:** no automatic authenticity conclusion; human review decides. A registration
  number or barcode is not proof a unit is genuine. Expired, recalled and quarantined
  stock is excluded from recommendations and sales.
- **AI actions** are read-only by default; stock/price changes, purchase drafts, messages,
  refunds and publication need explicit confirmation.
- **No fabricated traction:** no fake customers, testimonials, logos, metrics or partners.
  Market figures are hypotheses. Demo surfaces say "Interactive demo • fictional data".
- **Legal pages** are structured drafts labelled "Draft for legal review"; entity and
  contacts come from config, never invented.

## Architecture

- Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui (Radix),
  Motion, Lucide, React Hook Form + Zod, TanStack Query/Table, Recharts.
- Single Next.js app at the repo root (see `docs/frontend-architecture.md` for why this is
  not yet the suggested `apps/web` + `packages/*` monorepo, and how to split it later).
- `src/app` routes · `src/components/{ui,brand,…}` · `src/features/<module>` ·
  `src/lib` pure logic · `src/config` brand, env, pricing · `src/mocks` seed ·
  `src/services` typed mock services replaceable by the future API.
- **Money is integer kobo** via `src/lib/money.ts`. Financial and stock calculations are
  pure functions outside components, with unit tests.
- Brand tokens live in `src/config/brand.ts` and are mirrored in `src/app/globals.css`.
  Change both together; `contrast.test.ts` enforces WCAG AA for approved pairings.
- Logos are generated: `npm run brand:generate` (never hand-edit `public/brand/*`).

## Design rules

- Palette: plum `#432C3A` (primary CTA, text), rose `#B76E79` (accents, large text ≥24px,
  logo period, focus ring), cream `#FAF6F0` background, blush `#F1DFDF`, sage `#859681`
  and champagne `#D9BE9C` decorative. Rose/sage text uses `rose-700` / `sage-700`.
- Cormorant Garamond (`font-display`) for editorial headlines; Manrope for UI/body.
- No purple gradients, glassmorphism, heavy shadows or excessive pink.
- Marketing max width 1440px; workspace sidebar ~248px; 16px mobile / 24–32px desktop
  padding; 8–12px corners; 44px minimum primary touch targets.

## Accessibility (WCAG 2.2 AA target)

Semantic HTML, labelled fields, announced errors, visible focus, keyboard operation,
reduced-motion alternatives, chart text alternatives, never status by colour alone,
no horizontal overflow at 360 / 390 / 768 / 1024 / 1440px.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Lint / types / unit tests | `npm run lint` · `npm run typecheck` · `npm run test` |
| End-to-end (bundled Chromium) | `npm run test:e2e` |
| End-to-end on macOS 12 (installed Chrome) | `npm run test:e2e:chrome` |
| Everything before a commit | `npm run verify` |
| Regenerate logos and icons | `npm run brand:generate` |

Report real command output. Never claim tests pass without running them.

## Working rhythm

Work milestone by milestone (M1–M10 in the brief). After each: run lint, typecheck, unit,
e2e and build; update `docs/implementation-plan.md` with what shipped, verification
results, decisions and known issues. No placeholder primary routes at milestone end.
