import { expect, test, type Page } from "@playwright/test";

import { alerts } from "./support/alerts";

/**
 * Replaces getUserMedia with a canvas stream so camera flows run without hardware,
 * and records whether every track was stopped. `deny` simulates a blocked permission.
 */
async function fakeCamera(page: Page, mode: "allow" | "deny") {
  await page.addInitScript((m) => {
    const w = window as unknown as { __tracks: MediaStreamTrack[] };
    w.__tracks = [];
    navigator.mediaDevices.getUserMedia = async () => {
      if (m === "deny") throw new DOMException("Permission denied", "NotAllowedError");
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 800;
      const ctx = canvas.getContext("2d")!;
      const paint = () => {
        ctx.fillStyle = "#8a6a55";
        ctx.fillRect(0, 0, 640, 800);
        requestAnimationFrame(paint);
      };
      paint();
      const stream = canvas.captureStream(15);
      w.__tracks.push(...stream.getTracks());
      return stream;
    };
  }, mode);
}

const allTracksStopped = (page: Page) =>
  page.evaluate(() =>
    (window as unknown as { __tracks: MediaStreamTrack[] }).__tracks.every((t) => t.readyState === "ended"),
  );

/** A 1×1 PNG. */
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

async function goToPhotoStep(page: Page) {
  await page.goto("/glow-scan#start");
  await page.getByRole("button", { name: "Add a photo" }).click();
  const proceed = page.getByRole("button", { name: "Continue to camera" });
  await expect(proceed).toBeDisabled();
  await page.getByLabel(/my photo stays on this device/).check();
  await proceed.click();
}

async function answerMinimum(page: Page) {
  await page.getByLabel("No, none of these").check();
  await page.getByRole("checkbox", { name: "Moisturiser or face cream" }).first().check();
}

test.describe("Glow Scan", () => {
  test.use({ reducedMotion: "reduce" });

  test("hero Start Glow Scan opens the flow", async ({ page }) => {
    await page.goto("/glow-scan");
    await page.getByRole("link", { name: "Start Glow Scan" }).click();
    await expect(page.getByRole("heading", { name: "How would you like to start?" })).toBeInViewport();
  });

  test("camera: allow, capture, retake, remove and every track stops", async ({ page }) => {
    await fakeCamera(page, "allow");
    await goToPhotoStep(page);
    await page.getByRole("button", { name: "Open camera" }).click();
    await expect(page.getByLabel("Live camera preview")).toBeVisible();
    await page.getByRole("button", { name: "Take photo" }).click();
    await expect(page.getByRole("img", { name: "Your photo preview" })).toBeVisible();
    expect(await allTracksStopped(page)).toBe(true);

    await page.getByRole("button", { name: "Retake" }).click();
    await expect(page.getByLabel("Live camera preview")).toBeVisible();
    await page.getByRole("button", { name: "Close camera" }).click();
    expect(await allTracksStopped(page)).toBe(true);
  });

  test("camera: leaving the step stops the camera", async ({ page }) => {
    await fakeCamera(page, "allow");
    await goToPhotoStep(page);
    await page.getByRole("button", { name: "Open camera" }).click();
    await expect(page.getByLabel("Live camera preview")).toBeVisible();
    await page.getByRole("button", { name: "Continue to questions" }).click();
    expect(await allTracksStopped(page)).toBe(true);
  });

  test("camera: a blocked permission explains the alternatives", async ({ page }) => {
    await fakeCamera(page, "deny");
    await goToPhotoStep(page);
    await page.getByRole("button", { name: "Open camera" }).click();
    await expect(alerts(page)).toContainText("Camera access was blocked");
  });

  test("upload: invalid file is rejected; a photo previews, analyse is unavailable, nothing is uploaded", async ({ page }) => {
    const uploads: string[] = [];
    page.on("request", (req) => {
      if (req.method() !== "GET") uploads.push(`${req.method()} ${req.url()}`);
    });
    await goToPhotoStep(page);
    const input = page.locator('input[type="file"]');
    await input.setInputFiles({ name: "notes.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF") });
    await expect(alerts(page)).toContainText("Choose a JPEG, PNG, WebP or HEIC photo");

    await input.setInputFiles({ name: "me.png", mimeType: "image/png", buffer: png });
    await expect(page.getByRole("img", { name: "Your photo preview" })).toBeVisible();
    await page.getByRole("button", { name: "Analyse photo" }).click();
    await expect(alerts(page)).toContainText("Photo analysis isn't connected yet");

    await page.getByRole("button", { name: "Remove photo" }).click();
    await expect(page.getByRole("img", { name: "Your photo preview" })).toHaveCount(0);
    expect(uploads).toEqual([]);
  });

  test("no-photo path: validation, then honest results with editable routine", async ({ page }) => {
    await page.goto("/glow-scan#start");
    await page.getByRole("button", { name: "Answer questions" }).click();
    await page.getByRole("button", { name: "See my guidance" }).click();
    await expect(page.getByText("Tell us whether any of these apply to you")).toBeVisible();
    await expect(page.getByText("Choose at least one type of product")).toBeVisible();

    await answerMinimum(page);
    await page.getByRole("checkbox", { name: "Sunscreen" }).first().check();
    await page.getByLabel("Total budget in naira").fill("abc");
    await page.getByRole("button", { name: "See my guidance" }).click();
    await expect(page.getByText("Enter a whole amount in naira")).toBeVisible();
    await page.getByLabel("Total budget in naira").fill("25,000");
    await page.getByRole("button", { name: "See my guidance" }).click();

    await expect(page.getByRole("heading", { name: "Your Glow Scan" })).toBeFocused();
    await expect(page.getByText("Sample catalogue.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your routine" })).toBeVisible();

    await page.getByLabel("Exclude an ingredient").fill("niacinamide");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await expect(page.getByRole("button", { name: "Stop excluding niacinamide" })).toBeVisible();

    await page.getByRole("button", { name: "Remove Sunscreen from the morning" }).click();
    await expect(page.getByRole("button", { name: "Remove Sunscreen from the morning" })).toHaveCount(0);

    await page.getByRole("button", { name: "Save routine" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Saved on this device" })).toBeVisible();

    // The saved routine survives a reload and can be deleted.
    await page.reload();
    const saved = page.getByRole("region", { name: "Your saved routine" });
    await expect(saved).toContainText("Moisturiser or face cream");
    await expect(saved).not.toContainText("Sunscreen");
    await saved.getByRole("button", { name: "Delete saved routine" }).click();
    await expect(page.getByRole("region", { name: "Your saved routine" })).toHaveCount(0);
  });

  test("red-flag symptoms stop suggestions; emergency signs escalate", async ({ page }) => {
    await page.goto("/glow-scan#start");
    await page.getByRole("button", { name: "Answer questions" }).click();
    await page.getByLabel("Yes, one or more").check();
    await page.getByRole("checkbox", { name: "Swelling of the face, lips, tongue or eyes" }).check();
    await page.getByRole("checkbox", { name: "Moisturiser or face cream" }).first().check();
    await page.getByRole("button", { name: "See my guidance" }).click();
    await expect(alerts(page)).toContainText("Get urgent medical help now");
    await expect(page.getByText("Sample catalogue.")).toHaveCount(0);
  });
});
