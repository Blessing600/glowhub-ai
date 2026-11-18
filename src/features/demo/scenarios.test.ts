import { describe, expect, it } from "vitest";

import {
  consultationBudget,
  consultationProducts,
  consultationSummary,
  draftBundle,
  extractedFields,
  lowConfidenceThreshold,
  restockRows,
  scenarios,
} from "@/features/demo/scenarios";
import { naira } from "@/lib/money";

describe("demo scenarios", () => {
  it("restock suggestions match the brief: 24, 18, 12", () => {
    expect(restockRows.map((r) => r.reorder)).toEqual([24, 18, 12]);
  });

  it("consultation stays within budget: ₦28,000 total, ₦2,000 remaining", () => {
    expect(consultationSummary.total).toEqual(naira(28_000));
    expect(consultationSummary.remaining).toEqual(naira(2_000));
    expect(consultationSummary.total.minor).toBeLessThanOrEqual(consultationBudget.minor);
  });

  it("only recommends products that are in stock", () => {
    for (const product of consultationProducts) expect(product.inStock).toBeGreaterThan(0);
  });

  it("flags every low-confidence field for correction", () => {
    for (const field of extractedFields) {
      if (field.confidence < lowConfidenceThreshold) expect(field.check).toBe("needs-correction");
    }
    expect(extractedFields.some((f) => f.check === "mismatch")).toBe(true);
  });

  it("bundle saving is list minus bundle price", () => {
    expect(draftBundle.savingLabel).toBe("₦1,350");
  });

  it("has two business and two shopper prompts", () => {
    expect(scenarios.filter((s) => s.tab === "business")).toHaveLength(2);
    expect(scenarios.filter((s) => s.tab === "shopper")).toHaveLength(2);
  });
});
