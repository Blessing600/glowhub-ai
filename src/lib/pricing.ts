import {
  billingCycles,
  plans,
  type BillingCycleId,
  type PlanId,
} from "@/config/pricing";
import { applyRate, money, multiply, subtract, type Money } from "@/lib/money";

export type PlanQuote = {
  planId: PlanId;
  cycleId: BillingCycleId;
  months: number;
  /** Monthly list price × months, before discount. */
  listTotal: Money;
  /** Prepaid amount payable for the whole period. */
  total: Money;
  /** total ÷ months, rounded to the nearest kobo. */
  effectiveMonthly: Money;
  /** listTotal − total. */
  savings: Money;
  discountBps: number;
};

/**
 * PRD §3: price = monthly list price × billing months × (1 − discount).
 * Longer plans are prepaid; no discount stacking.
 */
export function quotePlan(planId: PlanId, cycleId: BillingCycleId): PlanQuote {
  const plan = plans.find((p) => p.id === planId);
  const cycle = billingCycles.find((c) => c.id === cycleId);
  if (!plan || !cycle) {
    throw new Error(`Unknown plan or billing cycle: ${planId} / ${cycleId}`);
  }
  const listTotal = multiply(plan.monthlyPrice, cycle.months);
  const savings = applyRate(listTotal, cycle.discountBps / 10_000);
  const total = subtract(listTotal, savings);
  return {
    planId,
    cycleId,
    months: cycle.months,
    listTotal,
    total,
    effectiveMonthly: money(Math.round(total.minor / cycle.months), total.currency),
    savings,
    discountBps: cycle.discountBps,
  };
}
