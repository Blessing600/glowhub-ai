import { describe, expect, it } from "vitest";

import { loadRoutine, storeRoutine } from "@/features/glow-scan/routine-store";
import { recommendFromSample, SAMPLE_MERCHANT } from "@/features/glow-scan/sample-catalogue";
import type { GlowScanPreferences } from "@/features/glow-scan/types";
import { naira } from "@/lib/money";

const base: GlowScanPreferences = {
  goals: [],
  currentProducts: [],
  sensitivities: [],
  otherExclusions: [],
  categories: ["moisturiser"],
};

describe("recommendFromSample", () => {
  it("ranks by goal and skin feel, and explains why", () => {
    const r = recommendFromSample({ ...base, skinFeel: "dry", goals: ["hydration"] });
    expect(r.matches[0].name).toBe("Rich Moisturiser");
    expect(r.matches[0].reasons.join(" ")).toMatch(/dry/i);
    expect(r.matches[0].reasons.join(" ")).toMatch(/hydrated/i);
    expect(r.matches.every((m) => m.merchant === SAMPLE_MERCHANT)).toBe(true);
  });

  it("only returns the requested categories", () => {
    const r = recommendFromSample({ ...base, categories: ["sunscreen", "cleanser"] });
    expect(new Set(r.matches.map((m) => m.category))).toEqual(new Set(["sunscreen", "cleanser"]));
  });

  it("never builds the routine from out-of-stock, unknown-stock or excluded products", () => {
    const r = recommendFromSample({
      ...base,
      categories: ["serum", "exfoliant", "sunscreen"],
      goals: ["hydration", "oil-balance"],
      sensitivities: ["fragrance"],
    });
    const used = r.routine.map((s) => s.productId);
    expect(used).not.toContain("s-hyaluronic-serum"); // out of stock
    expect(used).not.toContain("s-bha-exfoliant"); // stock unknown
    expect(used).not.toContain("s-gel-spf"); // contains parfum
    expect(r.routine.find((s) => s.category === "sunscreen")?.productId).toBe("s-mineral-spf");
  });

  it("puts sunscreen in the morning only and links each step to a product", () => {
    const r = recommendFromSample({ ...base, categories: ["cleanser", "sunscreen"] });
    expect(r.routine.filter((s) => s.category === "sunscreen").map((s) => s.time)).toEqual(["morning"]);
    expect(r.routine.every((s) => s.productId)).toBe(true);
  });

  it("says when nothing fits and when the routine total exceeds the budget", () => {
    const none = recommendFromSample({ ...base, budget: naira(1_000) });
    expect(none.routine).toEqual([]);
    expect(none.missingInformation[0]).toMatch(/moisturiser/);

    const over = recommendFromSample({ ...base, categories: ["cleanser", "moisturiser", "sunscreen"], budget: naira(14_000) });
    expect(over.missingInformation.join(" ")).toMatch(/above your ₦14,000 budget/);
  });
});

describe("routine store", () => {
  function memory() {
    const data = new Map<string, string>();
    return {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
      removeItem: (k: string) => void data.delete(k),
    };
  }

  it("round-trips a routine", () => {
    const s = memory();
    const ok = storeRoutine(
      [{ id: "morning-cleanser", time: "morning", category: "cleanser", note: "n", productId: "p", productName: "Gel" }],
      "sample",
      s,
      new Date("2026-11-20T10:00:00Z"),
    );
    expect(ok).toBe(true);
    expect(loadRoutine(s)).toMatchObject({ source: "sample", savedAt: "2026-11-20T10:00:00.000Z", steps: [{ productName: "Gel" }] });
  });

  it("ignores corrupt data and reports a refused write", () => {
    const s = memory();
    s.setItem("glowhub.glow-scan.routine.v1", "{not json");
    expect(loadRoutine(s)).toBeNull();
    const full = { setItem: () => { throw new Error("QuotaExceeded"); } };
    expect(storeRoutine([], "sample", full)).toBe(false);
  });
});
