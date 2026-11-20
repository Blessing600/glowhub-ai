# GlowHub AI — agent guide

Live frontend for GlowHub AI (AERA Technologies): an AI-native selling and
business-intelligence platform for African beauty businesses — skincare retailers, beauty
brands, salons, spas and distributors — with Glow Scan as its flagship shopper-facing
skincare guidance journey.

**Read first:** `docs/brand-guidelines.md` (Stone & Plum), `docs/frontend-api-contracts.md`
(backend seams and integration status) and `docs/implementation-plan.md` (milestone log —
resume from the first unchecked item). `docs/product-requirements.md` is the original PRD;
where it conflicts with this file (palette, fonts, "pre-launch", fictional seed data), this
file wins. The latest brief (v3.0, 20 Nov 2026) and its mood references live in
`reference/` — third-party screenshots for art direction only, never shipped.

## Non-negotiable product constraints

- **The site is live.** Never present it as pre-launch, a waitlist, a prototype, a demo or
  "coming soon", "proposed" or a concept. The homepage hero offers one action per audience:
  "Explore Glow Scan" (shoppers) and "For beauty businesses"; the header CTA is
  "Get started" → `/register`.
- **Frontend only.** Backend engineers own auth, persistence, payments, inference and APIs.
  Call them only through typed adapters in `src/services/` (contracts in
  `docs/frontend-api-contracts.md`). Don't build or provision a backend.
- **No invented traction.** No demo accounts, fictional merchants, testimonials, customer
  counts, revenue, transactions, reviews or AI answers in shipped UI. Use real API data or
  honest empty / loading / error / not-connected states. Test fixtures live only in tests.
- **One labelled exception: the Glow Scan sample catalogue**
  (`src/features/glow-scan/sample-catalogue.ts`). While no merchant catalogue is connected,
  Glow Scan matches against unbranded illustrative products. Every place they appear says
  "Sample catalogue" / "not for sale"; they never appear as a real merchant, brand or stock
  level, and they run through the same `constrainMatches` rules as live data.
- **No fake success.** Never show a success message unless something actually succeeded.
  `not-connected` means nothing was sent — say so and keep the user's input. Saving on the
  device (localStorage) is a real save: say "Saved on this device", never "saved to your
  account". No `setTimeout` simulations or random numbers.
- **Locked features.** Live Glow Scan photo analysis, marketplace and payments are locked off
  in `src/config/env.ts`; setting their flags to `true` throws. Don't work around this. No
  checkout, multi-merchant cart, delivery or "Pay now".
- **Glow Scan camera:** explain and get consent before opening the camera; request
  permission only on user action; local preview only — no upload, storage, logging,
  URL or analytics of an image. Stop media tracks and revoke object URLs on capture,
  close, track end, step change and unmount. A no-photo path must be equally prominent and
  complete. Pressing "Analyse photo" shows that analysis isn't connected.
- **Beauty safety:** cosmetic guidance only. No diagnosis, prescription, biometric inference,
  age, ethnicity, attractiveness or skin-tone scores, or skin-lightening goals. Red-flag
  symptoms stop recommendations and refer to qualified care; emergency signs → urgent
  medical help. Recommendations must pass `constrainMatches` (no out-of-stock, unknown stock,
  excluded ingredients or over-budget items; never invent prices or brands).
- **Trust:** no automatic authenticity conclusion; human review decides. A registration
  number or barcode is not proof a unit is genuine. Expired, recalled and quarantined
  stock is excluded from recommendations and sales.
- **AI actions** are read-only by default; stock/price changes, purchase drafts, messages,
  refunds and publication need explicit confirmation. Keep AI suggestions visibly distinct
  from calculated figures.
- **Market sizing** (TAM/SAM/SOM) is an illustrative planning scenario
  (`docs/market-opportunity.md`): never on the homepage or a merchant dashboard, never as
  traction. If published, only on a secondary page captioned "Illustrative planning estimate",
  with assumptions and sourced external figures kept distinct.
- **Legal pages** are structured drafts labelled "Draft for legal review"; entity and
  contacts come from config, never invented.

## Architecture

- Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui (Radix),
  Lucide, React Hook Form + Zod.
- `src/app` routes · `src/components/{ui,brand,marketing}` · `src/features/<module>` ·
  `src/lib` pure logic · `src/config` brand, env, pricing, site nav · `src/services` typed
  API adapters (`apiRequest` → `ok | not-connected | error`).
- **Money is integer kobo** via `src/lib/money.ts`. Financial, stock and recommendation
  rules are pure functions outside components, with unit tests.
- Brand tokens live in `src/config/brand.ts` and are mirrored in `src/app/globals.css`.
  Change both together; `contrast.test.ts` enforces WCAG AA for approved pairings.
- Logos are generated: `npm run brand:generate` (never hand-edit `public/brand/*`).

## Design rules (Stone & Plum)

- Palette: warm neutrals carry the page — ivory `#FFF7EF` canvas, stone `#DDD3C6` hero and
  editorial panels, sand `#F3EADF` light panels, line `#E4D9CC`. Plum `#342038` for the
  primary action, dark sections and headings; espresso `#302420` (`ink`) for text and the
  footer; taupe `#5E5049` secondary text. Accents, one at a time and sparingly: hibiscus
  rose `#B9527C` (text ≥24px only; `rose-700` `#94395F` for small text), antique gold
  `#C59B5D` (text only on plum/espresso), terracotta `#B96546` (display only). No pink
  gradients or startup purple.
- Playfair Display (`font-display`, weight 400, italics for emphasis) for hero and large
  editorial headings only; Manrope for UI, body and tracked-uppercase eyebrows; IBM Plex Mono
  (`font-mono`) only for system labels inside product interfaces. The logo stays Bodoni Moda.
- Visual storytelling over copy: short headlines, at most one or two sentences of supporting
  text per section, generous section spacing (`py-24 sm:py-32 lg:py-40`). Detail belongs on
  secondary pages — but never cut legal, safety, consent or not-connected wording.
- Editorial asymmetry, photography and fine rules over rows of identical cards. No
  gradients, glassmorphism, heavy shadows, sparkles, emoji or chatbot art.
- At most one principal action per section; light top navigation (four links). Max width 1440px; 16px mobile / 24–32px desktop
  padding; 8px corners; 44px minimum touch targets.
- Photography: licensed only, recorded in `docs/photo-credits.md`; never imply models are
  customers or Glow Scan users.

## Accessibility (WCAG 2.2 AA target)

Semantic HTML, labelled fields, announced errors and service notices, visible focus,
keyboard operation, reduced-motion support, chart text alternatives, never status by
colour alone, no horizontal overflow at 360 / 390 / 768 / 1024 / 1440px.

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

Work milestone by milestone. After each: run lint, typecheck, unit, e2e and build; update
`docs/implementation-plan.md` with what shipped, verification results, decisions and known
issues. No placeholder primary routes or dead buttons at milestone end.
