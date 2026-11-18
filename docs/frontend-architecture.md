# Frontend architecture

## Stack
Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · shadcn/ui on
Radix · Motion for React · Lucide · React Hook Form + Zod 4 · TanStack Query and Table ·
Recharts · Vitest + Testing Library · Playwright. Node ≥ 22.

## Repository layout

```
src/
  app/                 routes — (marketing), (auth), beauty, business, store, admin, legal
  components/
    ui/                shadcn primitives, customised to GlowHub tokens
    brand/             Logo and brand components
    marketing/ consumer/ skin-scan/ products/ workspace/ forms/ charts/
    intelligence/ verification/ billing/ legal/
  features/<module>/   module-specific components, hooks and view logic
  services/            typed service interfaces + mock implementations
  mocks/               deterministic seed data
  lib/                 pure logic (money, pricing, stock, sales, reports) — no React
  config/              brand tokens, env/feature flags, pricing config
  types/               shared domain types
  hooks/               shared React hooks
e2e/                   Playwright specs
scripts/brand/         logo and icon generator
public/brand/          generated logo suite
public/images/         optimised, licensed imagery
docs/                  requirements, plan, design, architecture, contracts, reviews
```

### Why a single app, not `apps/web` + `packages/*`
The brief suggests a workspace monorepo with shared `ui`, `types`, `validation`,
`business-logic` and `config` packages. There is currently one consumer (the web app),
and a workspace setup adds install, build and memory cost on the development machine.
The same boundaries are kept as folders:

| Suggested package | Current location | Rule |
| --- | --- | --- |
| `business-logic` | `src/lib` | Pure TypeScript, no React or Next imports |
| `validation` | `src/lib/validation` (M2+) | Zod schemas shared by forms and services |
| `types` | `src/types` | Domain types only |
| `config` | `src/config` | Brand, env, pricing |
| `ui` | `src/components/ui` | shadcn primitives |

When a second consumer appears (e.g. the NestJS backend reusing pricing or validation),
move the folder into `packages/<name>` unchanged and switch to npm workspaces.

## Data and services
- One deterministic seed (`src/mocks`) shared by marketing demo, consumer, merchant,
  storefront and admin views, so status changes (e.g. quarantine) propagate everywhere.
- Services expose typed async interfaces (`src/services/*`) consumed through TanStack
  Query. Mock implementations read/write the in-memory seed; a future API client
  implements the same interfaces. A "Reset demo" action restores the seed.
- Persistence is in-memory or explicitly demo-only. Never persist face images, health
  information, passwords or card data.

## Calculations
Money is integer minor units (`src/lib/money.ts`). Pricing, stock, sales, COGS, margin and
report logic are pure functions with unit tests; components only format results.

## Configuration
`src/config/env.ts` parses `NEXT_PUBLIC_*` variables with Zod. No domain or secret is
hardcoded. Live scan, marketplace and payments are locked off and throw if enabled.
Indexing is allowed only on an approved production deploy; staging is always `noindex`.

## Future backend (not built in this phase)
NestJS + PostgreSQL + Prisma on Azure (Container Apps, PostgreSQL Flexible Server, Blob
Storage, Azure OpenAI/Foundry, Document Intelligence, Service Bus, Key Vault, Monitor),
per PRD §8. Paystack proposed for payments: server-initialised transactions, verified
webhooks, idempotency and reconciliation — the client callback is never trusted.
Integration contracts are documented in `docs/integration-contracts.md` (M5–M8).
