import { describe, expect, it } from "vitest";

import { billingCycles, plans, type BillingCycleId, type PlanId } from "@/config/pricing";
import { naira } from "@/lib/money";
import { quotePlan } from "@/lib/pricing";

/** The PRD §3 matrix, in naira. */
const prdMatrix: Record<BillingCycleId, Record<PlanId, number>> = {
  monthly: { starter: 10_000, professional: 25_000, business: 60_000 },
  quarterly: { starter: 27_000, professional: 67_500, business: 162_000 },
  "six-months": { starter: 51_000, professional: 127_500, business: 306_000 },
  annual: { starter: 96_000, professional: 240_000, business: 576_000 },
};

describe("quotePlan", () => {
  for (const cycle of billingCycles) {
    for (const plan of plans) {
      it(`${plan.name} ${cycle.label} matches the PRD matrix`, () => {
        expect(quotePlan(plan.id, cycle.id).total).toEqual(naira(prdMatrix[cycle.id][plan.id]));
      });
    }
  }

  it("Professional annual saves ₦60,000 versus twelve monthly payments", () => {
    const quote = quotePlan("professional", "annual");
    expect(quote.listTotal).toEqual(naira(300_000));
    expect(quote.savings).toEqual(naira(60_000));
    expect(quote.effectiveMonthly).toEqual(naira(20_000));
  });

  it("monthly billing has no discount or savings", () => {
    const quote = quotePlan("starter", "monthly");
    expect(quote.savings).toEqual(naira(0));
    expect(quote.total).toEqual(quote.listTotal);
    expect(quote.months).toBe(1);
  });

  it("total always equals list total minus savings", () => {
    for (const cycle of billingCycles) {
      for (const plan of plans) {
        const q = quotePlan(plan.id, cycle.id);
        expect(q.total.minor + q.savings.minor).toBe(q.listTotal.minor);
        expect(Number.isSafeInteger(q.effectiveMonthly.minor)).toBe(true);
      }
    }
  });

  it("rejects unknown plans", () => {
    expect(() => quotePlan("enterprise" as PlanId, "monthly")).toThrow();
  });
});
