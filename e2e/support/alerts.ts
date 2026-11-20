import type { Page } from "@playwright/test";

/** role="alert" regions on the page, excluding Next.js's always-present route announcer. */
export const alerts = (page: Page) => page.locator('[role="alert"]:not(#__next-route-announcer__)');
