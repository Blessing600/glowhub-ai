import { expect, test, type Page } from "@playwright/test";

import { alerts } from "./support/alerts";
import { expectImagesLoaded } from "./support/images";

const routes = [
  "/",
  "/features",
  "/for-businesses",
  "/glow-scan",
  "/how-it-works",
  "/pricing",
  "/about",
  "/faq",
  "/contact",
  "/sign-in",
  "/register",
  "/privacy",
  "/terms",
  "/security",
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
    await expect(page.getByRole("heading", { level: 1, name: "Plans in naira, built to grow with you." })).toBeVisible();
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

test.describe("homepage", () => {
  test.use({ reducedMotion: "reduce" });

  test("hero offers one action for shoppers and one for businesses", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("region", { name: "Beauty, beautifully understood." });
    await hero.getByRole("link", { name: "Explore Glow Scan" }).click();
    await expect(page).toHaveURL(/\/glow-scan$/);
    await page.goto("/");
    await hero.getByRole("link", { name: "For beauty businesses" }).click();
    await expect(page).toHaveURL(/\/for-businesses$/);
  });

  test("the match vignette is a labelled run of the sample catalogue", async ({ page }) => {
    await page.goto("/");
    const match = page.getByRole("region", { name: /Chosen for your needs/ });
    await expect(match.getByText("Gentle Gel Cleanser")).toBeVisible();
    await expect(match.getByText(/sample catalogue: illustrative products, not for sale/i)).toBeVisible();
  });

  test("workspace module tabs switch with arrow keys and show empty states", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard checked on desktop");
    await page.goto("/features");
    const tabs = page.getByRole("tablist", { name: "Workspace modules" });
    await tabs.getByRole("tab", { name: "Inventory" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", { name: "Products" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Your catalogue is empty.")).toBeVisible();
  });

  test("public pages show no waitlist, demo or pre-launch messaging", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      const text = await page.locator("body").innerText();
      expect(text, route).not.toMatch(/early access|waitlist|coming soon|launching soon|try (the )?demo|demo mode|sample data|pre-launch|prototype|fictional|proposed|atelier/i);
    }
  });

  test("retired routes redirect", async ({ page }) => {
    for (const [from, to] of [
      ["/demo", "/how-it-works"],
      ["/early-access", "/register"],
      ["/for-shoppers", "/glow-scan"],
    ]) {
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`${to}$`));
    }
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

  test("registration requires terms and privacy acknowledgement", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Work email").fill("ada@example.com");
    await page.getByLabel("Business name").fill("Ada Beauty");
    await page.getByLabel("Password").fill("a-long-passphrase");
    await page.getByRole("button", { name: "Create workspace" }).click();
    await expect(page.getByText("Confirm you accept the terms to continue")).toBeVisible();
    await page.getByLabel(/I accept the Terms/).check();
    await page.getByLabel(/I have read the Privacy Notice/).check();
    await page.getByRole("button", { name: "Create workspace" }).click();
    // No backend is configured: the form must say so, never claim success.
    await expect(alerts(page)).toContainText("Account creation isn't connected yet");
    await expect(page.getByText("No account was created")).toBeVisible();
    await expect(page.getByLabel("Your name")).toHaveValue("Ada");
  });

  test("contact form reports that messaging is not connected", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Topic").selectOption("general");
    await page.getByLabel("Message").fill("How do I import my products?");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(alerts(page)).toContainText("Online messaging isn't connected yet");
    await expect(page.getByText("Message sent")).toHaveCount(0);
  });
});
