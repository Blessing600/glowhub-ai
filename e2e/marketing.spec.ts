import { expect, test, type Page } from "@playwright/test";

import { expectImagesLoaded } from "./support/images";

const routes = [
  "/",
  "/for-businesses",
  "/for-shoppers",
  "/features",
  "/how-it-works",
  "/pricing",
  "/demo",
  "/about",
  "/faq",
  "/contact",
  "/early-access",
  "/sign-in",
  "/register",
];
const widths = [360, 390, 768, 1024, 1440];

async function overflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

test.describe("public site", () => {
  test.use({ reducedMotion: "reduce" });

  for (const route of routes) {
    test(`${route} renders one h1, loads images and is noindex`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expectImagesLoaded(page);
    });
  }

  test("no horizontal overflow on any route at any tested width", async ({ page, isMobile }) => {
    test.skip(isMobile, "widths are set explicitly on the desktop project");
    test.setTimeout(180_000);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(route);
        expect(await overflow(page), `${route} at ${width}px`).toBeLessThanOrEqual(0);
      }
    }
  });

  test("every internal link resolves", async ({ page, request, isMobile }) => {
    test.skip(isMobile, "link targets are the same on mobile");
    const hrefs = new Set<string>();
    for (const route of routes) {
      await page.goto(route);
      for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!))) {
        hrefs.add(href.split("#")[0]);
      }
    }
    for (const href of hrefs) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
  });

  test("sitemap lists every public route", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const route of routes) {
      expect(xml).toContain(`${route === "/" ? "" : route}</loc>`);
    }
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "menu is used below the xl breakpoint");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const nav = page.getByRole("navigation", { name: "Mobile" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(nav).toBeHidden();
    await expect(page.getByRole("heading", { level: 1, name: "Simple plans in naira." })).toBeVisible();
  });

  test("cookie preferences explain that no optional cookies are used", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Cookie preferences" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("Analytics — not used")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test.describe("interactive demo", () => {
  test.use({ reducedMotion: "reduce" });

  test("business restock answer shows calculations and a simulated action", async ({ page }) => {
    await page.goto("/demo");
    const demo = page.getByRole("region", { name: "GlowHub interactive demo" });
    await expect(demo.getByText("Interactive demo • fictional data")).toBeVisible();
    await demo.getByRole("button", { name: /Restock and sales/ }).click();
    await expect(demo.getByText("Order 24")).toBeVisible();
    await expect(demo.getByText("Order 18")).toBeVisible();
    await expect(demo.getByText("Order 12")).toBeVisible();
    await expect(demo.getByText(/Expiry risk/)).toBeVisible();
    await demo.getByRole("button", { name: /Create draft purchase list/ }).click();
    await expect(demo.getByRole("status")).toContainText("Nothing was ordered");
  });

  test("invoice check needs human review and makes no authenticity claim", async ({ page }) => {
    await page.goto("/demo");
    const demo = page.getByRole("region", { name: "GlowHub interactive demo" });
    await demo.getByRole("button", { name: /Check an invoice/ }).click();
    await expect(demo.getByText("Status: Needs human review")).toBeVisible();
    await expect(demo.getByText("Mismatch", { exact: true })).toBeVisible();
    await expect(demo.getByText(/does not decide whether a product is genuine/)).toBeVisible();
  });

  test("shopper consultation stays within budget with a safety referral", async ({ page }) => {
    await page.goto("/demo");
    const demo = page.getByRole("region", { name: "GlowHub interactive demo" });
    await demo.getByRole("tab", { name: "For shoppers" }).click();
    await demo.getByRole("button", { name: /Routine on a budget/ }).click();
    await expect(demo.getByText(/₦2,000 remaining/)).toBeVisible();
    await expect(demo.getByText("₦28,000")).toBeVisible();
    await expect(demo.getByText(/qualified healthcare professional/)).toBeVisible();
  });

  test("Explore Glow Scan opens the labelled fictional sample", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("banner").getByRole("link", { name: "Explore Glow Scan" }).click();
    await expect(page).toHaveURL(/\/demo#glow-scan$/);
    const demo = page.getByRole("region", { name: "GlowHub interactive demo" });
    await expect(demo.getByText(/Fictional sample image with scripted observations/)).toBeVisible();
    await expect(demo.getByText("Sample observations (scripted)")).toBeVisible();
    await demo.getByRole("button", { name: /text-only consultation/ }).click();
    await expect(demo.getByText(/₦2,000 remaining/)).toBeVisible();
  });

  test("demo tabs support arrow keys, and reset clears the answer", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard checked on desktop");
    await page.goto("/demo");
    const demo = page.getByRole("region", { name: "GlowHub interactive demo" });
    await demo.getByRole("tab", { name: "For businesses" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(demo.getByRole("tab", { name: "For shoppers" })).toBeFocused();
    await expect(demo.getByRole("tab", { name: "For shoppers" })).toHaveAttribute("aria-selected", "true");
    await demo.getByRole("button", { name: /Routine on a budget/ }).click();
    await demo.getByRole("button", { name: "Reset" }).click();
    await expect(demo.getByText(/₦2,000 remaining/)).toHaveCount(0);
  });
});

test.describe("pricing and forms", () => {
  test("annual billing shows the PRD total and saving", async ({ page }) => {
    await page.goto("/pricing");
    await page.locator("label", { hasText: "Annual" }).click();
    const professional = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Professional" }) });
    await expect(professional).toContainText("₦240,000");
    await expect(professional).toContainText("₦60,000");
    await expect(professional).toContainText("₦20,000 a month equivalent");
  });

  test("early access validates, then confirms nothing was stored", async ({ page }) => {
    await page.goto("/early-access");
    await page.getByRole("button", { name: "Request early access" }).click();
    await expect(page.getByText("Enter your name")).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeFocused();
    await expect(page.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");

    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("What best describes you?").selectOption("retailer");
    await expect(page.getByLabel(/occasional GlowHub news/)).not.toBeChecked();
    await page.getByRole("button", { name: "Request early access" }).click();
    await expect(page.getByRole("heading", { name: "Thank you, Ada." })).toBeFocused();
    await expect(page.getByText(/not sent or stored/)).toBeVisible();
  });

  test("registration requires terms and privacy acknowledgement", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Work email").fill("ada@example.com");
    await page.getByLabel("Business name").fill("Ada Beauty");
    await page.getByLabel("Password").fill("a-long-passphrase");
    await page.getByRole("button", { name: "Start 14-day trial" }).click();
    await expect(page.getByText("Confirm you accept the terms to continue")).toBeVisible();
    await page.getByLabel(/I accept the Terms/).check();
    await page.getByLabel(/I have read the Privacy Notice/).check();
    await page.getByRole("button", { name: "Start 14-day trial" }).click();
    await expect(page.getByText(/no account or workspace was\s+created/)).toBeVisible();
  });
});
