import { describe, expect, it } from "vitest";

import { questionnaireSchema, toPreferences } from "@/features/glow-scan/questionnaire";

const base = {
  screening: "none",
  symptoms: [],
  skinFeel: null,
  goals: false,
  currentProducts: [],
  sensitivities: "fragrance",
  otherExclusions: "Niacinamide, shea butter",
  categories: ["moisturiser"],
  budget: "25,000",
  routine: null,
};

describe("questionnaireSchema", () => {
  it("accepts unanswered optional questions as react-hook-form sends them", () => {
    const parsed = questionnaireSchema.parse(base);
    const prefs = toPreferences(parsed);
    expect(prefs.skinFeel).toBeUndefined();
    expect(prefs.goals).toEqual([]);
    expect(prefs.sensitivities).toEqual(["fragrance"]);
    expect(prefs.otherExclusions).toEqual(["niacinamide", "shea butter"]);
    expect(prefs.budget).toEqual({ minor: 2_500_000, currency: "NGN" });
  });

  it("requires a product type, a screening answer and symptoms when screening is yes", () => {
    expect(questionnaireSchema.safeParse({ ...base, categories: [] }).success).toBe(false);
    expect(questionnaireSchema.safeParse({ ...base, screening: undefined }).success).toBe(false);
    expect(questionnaireSchema.safeParse({ ...base, screening: "some" }).success).toBe(false);
  });

  it("rejects malformed budgets", () => {
    expect(questionnaireSchema.safeParse({ ...base, budget: "abc" }).success).toBe(false);
    expect(questionnaireSchema.safeParse({ ...base, budget: "500" }).success).toBe(false);
  });
});
