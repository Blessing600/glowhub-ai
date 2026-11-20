import { describe, expect, it } from "vitest";

import {
  checkImageFile,
  constrainMatches,
  generalRoutine,
  moveStep,
  parseExclusions,
  screenSymptoms,
} from "@/features/glow-scan/logic";
import type { GlowScanPreferences, ProductMatch } from "@/features/glow-scan/types";
import { naira } from "@/lib/money";

// Test-only fixtures. Never imported by application code.
const product = (overrides: Partial<ProductMatch>): ProductMatch => ({
  id: "p1",
  name: "Test Cream",
  brand: "Test Brand",
  merchant: "Test Merchant",
  category: "moisturiser",
  price: naira(8_000),
  stock: "in-stock",
  ingredients: ["Aqua", "Glycerin"],
  reasons: [],
  cautions: [],
  ...overrides,
});

const prefs = (overrides: Partial<GlowScanPreferences> = {}): GlowScanPreferences => ({
  goals: [],
  currentProducts: [],
  sensitivities: [],
  otherExclusions: [],
  categories: ["moisturiser"],
  ...overrides,
});

describe("screenSymptoms", () => {
  it("continues with no symptoms", () => expect(screenSymptoms([])).toBe("continue"));
  it("refers for persistent or painful symptoms", () => expect(screenSymptoms(["pain"])).toBe("refer"));
  it("escalates emergency signs above referrals", () =>
    expect(screenSymptoms(["pain", "swelling"])).toBe("urgent"));
});

describe("checkImageFile", () => {
  it("accepts a normal photo", () => expect(checkImageFile({ type: "image/jpeg", size: 2_000_000 })).toEqual({ ok: true }));
  it("rejects other file types", () => expect(checkImageFile({ type: "application/pdf", size: 100 }).ok).toBe(false));
  it("rejects empty and oversized files", () => {
    expect(checkImageFile({ type: "image/png", size: 0 }).ok).toBe(false);
    expect(checkImageFile({ type: "image/png", size: 11 * 1024 * 1024 }).ok).toBe(false);
  });
});

describe("constrainMatches", () => {
  it("never shows out-of-stock or unknown-stock products", () => {
    const { shown, excluded } = constrainMatches(
      [product({ id: "a", stock: "out-of-stock" }), product({ id: "b", stock: "unknown" }), product({ id: "c" })],
      prefs(),
    );
    expect(shown.map((m) => m.id)).toEqual(["c"]);
    expect(excluded.map((e) => e.reason)).toEqual(["out-of-stock", "stock-unknown"]);
  });

  it("removes products containing an excluded ingredient", () => {
    const { shown, excluded } = constrainMatches(
      [product({ id: "a", ingredients: ["Aqua", "Parfum"] }), product({ id: "b" })],
      prefs({ sensitivities: ["fragrance"] }),
    );
    expect(shown.map((m) => m.id)).toEqual(["b"]);
    expect(excluded[0]).toMatchObject({ reason: "excluded-ingredient", detail: "Parfum" });
  });

  it("treats a missing ingredient list as unverifiable when exclusions exist", () => {
    const { shown, excluded } = constrainMatches(
      [product({ ingredients: undefined })],
      prefs({ otherExclusions: ["niacinamide"] }),
    );
    expect(shown).toEqual([]);
    expect(excluded[0].reason).toBe("ingredients-unknown");
  });

  it("keeps products without ingredient lists when nothing is excluded", () => {
    expect(constrainMatches([product({ ingredients: undefined })], prefs()).shown).toHaveLength(1);
  });

  it("drops products priced above the budget", () => {
    const { shown } = constrainMatches(
      [product({ id: "a", price: naira(20_000) }), product({ id: "b", price: naira(5_000) })],
      prefs({ budget: naira(10_000) }),
    );
    expect(shown.map((m) => m.id)).toEqual(["b"]);
  });
});

describe("parseExclusions", () => {
  it("splits, trims, lower-cases and de-duplicates", () => {
    expect(parseExclusions("Niacinamide, shea butter;\nniacinamide, a")).toEqual(["niacinamide", "shea butter"]);
  });
});

describe("generalRoutine", () => {
  it("orders chosen categories and keeps sunscreen to the morning", () => {
    const steps = generalRoutine(["sunscreen", "moisturiser", "cleanser"]);
    expect(steps.map((s) => s.id)).toEqual([
      "morning-cleanser",
      "morning-moisturiser",
      "morning-sunscreen",
      "evening-cleanser",
      "evening-moisturiser",
    ]);
    expect(steps.every((s) => s.productId === undefined)).toBe(true);
  });

  it("moves a step within its time of day only", () => {
    const steps = generalRoutine(["cleanser", "moisturiser"]);
    expect(moveStep(steps, "morning-moisturiser", -1).map((s) => s.id)[0]).toBe("morning-moisturiser");
    expect(moveStep(steps, "morning-moisturiser", 1)).toEqual(steps);
  });
});
