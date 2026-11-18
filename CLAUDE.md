@AGENTS.md

## Claude Code notes

- This Mac runs macOS 12 with 8 GB RAM: Playwright's bundled Chromium is unsupported, so
  use `npm run test:e2e:chrome`. Avoid running a dev server and a production build at the
  same time — they share `.next/` and memory is tight.
- Resume work from the first unchecked item in `docs/implementation-plan.md`.
