import { expect, test, type Page } from "@playwright/test";

import { expectImagesLoaded } from "./support/images";

const widths = [360, 390, 768, 1024, 1440];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe("foundation", () => {
  test("home renders the brand proposition and is not indexable", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Meet the AI agent running the future of beauty commerce." }),
    ).toBeVisible();
    await expectImagesLoaded(page);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("brand preview shows every logo and only passing colour pairs", async ({ page }) => {
    await page.goto("/internal/brand");
    await page.waitForLoadState("load");
    await expectImagesLoaded(page);
    const results = page.getByRole("table").locator("tbody tr td:last-child");
    await expect(results.first()).toBeVisible();
    await expect(results.filter({ hasText: "Fail" })).toHaveCount(0);
  });

  for (const width of widths) {
    test(`brand preview has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/internal/brand");
      await expectNoHorizontalOverflow(page);
    });
  }

  test("primary action is keyboard reachable with a visible focus ring", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard navigation is checked on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
    const link = page.getByRole("banner").getByRole("link", { name: "Get early access" });
    for (let i = 0; i < 15 && !(await link.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press("Tab");
    }
    await expect(link).toBeFocused();
    // Buttons draw focus as a solid rose ring (box-shadow) rather than an outline.
    const focus = await link.evaluate((el) => {
      const style = getComputedStyle(el);
      return { outline: style.outlineStyle, shadow: style.boxShadow };
    });
    expect(focus.outline !== "none" || focus.shadow.includes("rgb(185, 82, 124)")).toBe(true);
  });

  test("manifest icons, favicon and robots are served", async ({ request }) => {
    const manifest = await request.get("/manifest.webmanifest");
    expect(manifest.ok()).toBe(true);
    const { icons } = (await manifest.json()) as { icons: Array<{ src: string; purpose?: string }> };
    expect(icons.some((icon) => icon.purpose === "maskable")).toBe(true);
    for (const icon of icons) {
      expect((await request.get(icon.src)).ok(), icon.src).toBe(true);
    }
    expect((await request.get("/favicon.ico")).ok()).toBe(true);
    expect((await request.get("/brand/apple-touch-icon.png")).ok()).toBe(true);

    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Disallow: \//);
  });
});
