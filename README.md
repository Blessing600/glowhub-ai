# GlowHub AI

**Beauty is your business. Intelligence is ours.**

Frontend for GlowHub AI by AERA Technologies: the AI-native selling and business-intelligence
platform for African beauty businesses, with Glow Scan personal skincare guidance for shoppers.

> Frontend only. Backend services (auth, persistence, payments, inference) connect through
> typed adapters in `src/services/`; until `NEXT_PUBLIC_API_URL` is set, those features show an
> honest "not connected" state and send nothing. See `docs/frontend-api-contracts.md`.

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
cp .env.example .env.local   # optional; defaults are safe for local use
npm run dev                  # http://localhost:3000
```

Brand preview: http://localhost:3000/internal/brand

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | Playwright against a production build (bundled Chromium) |
| `npm run test:e2e:chrome` | Same, using installed Google Chrome (macOS 12) |
| `npm run verify` | Lint, typecheck, unit tests and build |
| `npm run brand:generate` | Regenerate logo SVGs, favicons and PWA icons |

## Documentation

- [Implementation brief and PRD](docs/product-requirements.md)
- [Implementation plan and milestone log](docs/implementation-plan.md)
- [Frontend API contracts](docs/frontend-api-contracts.md)
- [Brand guidelines — Emerald Atelier](docs/brand-guidelines.md)
- [Frontend architecture](docs/frontend-architecture.md)
- [Design system](docs/design-system.md)
- Agent guidance: [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md)

## Fonts and licences
Cormorant Garamond and Manrope are licensed under the SIL Open Font Licence 1.1.
