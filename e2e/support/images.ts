import { expect, type Page } from "@playwright/test";

/** Forces lazy images to load, then fails on any image that did not decode. */
export async function expectImagesLoaded(page: Page) {
  await page.$$eval("img", (imgs) => imgs.forEach((img) => (img.loading = "eager")));
  await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete));
  const broken = await page.$$eval("img", (imgs) =>
    imgs.filter((img) => img.naturalWidth === 0).map((img) => img.getAttribute("src")),
  );
  expect(broken).toEqual([]);
}
