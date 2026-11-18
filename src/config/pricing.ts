/**
 * Proposed launch pricing (PRD §3). A hypothesis to test with pilots, not final.
 * Prices are monthly list prices in integer kobo; discounts in basis points.
 * All derived amounts come from src/lib/pricing.ts — never compute them in components.
 */
import { naira, type Money } from "@/lib/money";

export type PlanId = "starter" | "professional" | "business";
export type BillingCycleId = "monthly" | "quarterly" | "six-months" | "annual";

export type BillingCycle = {
  id: BillingCycleId;
  label: string;
  months: number;
  /** 1000 = 10% */
  discountBps: number;
};

export const billingCycles: readonly BillingCycle[] = [
  { id: "monthly", label: "Monthly", months: 1, discountBps: 0 },
  { id: "quarterly", label: "Quarterly", months: 3, discountBps: 1000 },
  { id: "six-months", label: "Six months", months: 6, discountBps: 1500 },
  { id: "annual", label: "Annual", months: 12, discountBps: 2000 },
];

export type Plan = {
  id: PlanId;
  name: string;
  summary: string;
  monthlyPrice: Money;
  seats: number;
  locations: number;
  activeSkus: number;
  aiRequestsPerMonth: number;
};

export const plans: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    summary: "For a single shop or solo beauty professional.",
    monthlyPrice: naira(10_000),
    seats: 1,
    locations: 1,
    activeSkus: 300,
    aiRequestsPerMonth: 100,
  },
  {
    id: "professional",
    name: "Professional",
    summary: "For growing retailers and brands with a small team.",
    monthlyPrice: naira(25_000),
    seats: 5,
    locations: 1,
    activeSkus: 2_000,
    aiRequestsPerMonth: 500,
  },
  {
    id: "business",
    name: "Business",
    summary: "For multi-location retailers and distributors.",
    monthlyPrice: naira(60_000),
    seats: 15,
    locations: 3,
    activeSkus: 10_000,
    aiRequestsPerMonth: 2_000,
  },
];

/** Plan the 14-day no-card trial runs on (PRD §3). */
export const trialPlanId: PlanId = "professional";
export const trialDays = 14;

/** Feature rows for the plan comparison (PRD §3 entitlements table). */
export const entitlementRows: ReadonlyArray<{
  feature: string;
  values: Record<PlanId, string>;
}> = [
  { feature: "Seats / locations", values: { starter: "1 / 1", professional: "5 / 1", business: "15 / 3" } },
  { feature: "Active SKUs", values: { starter: "300", professional: "2,000", business: "10,000" } },
  {
    feature: "Core stock, sales, CRM, expiry tracking",
    values: { starter: "Included", professional: "Included", business: "Included" },
  },
  { feature: "AI requests per month", values: { starter: "100", professional: "500", business: "2,000" } },
  {
    feature: "AI consultant / ingredient checker",
    values: { starter: "Included", professional: "Included", business: "Included" },
  },
  {
    feature: "Supplier evidence and risk review",
    values: { starter: "Basic", professional: "Advanced", business: "Multi-location + audit" },
  },
  {
    feature: "Forecasts, marketing, analytics",
    values: { starter: "Basic insights", professional: "Advanced", business: "Advanced + exports" },
  },
  {
    feature: "Storefront",
    values: { starter: "Single catalogue", professional: "Branded catalogue", business: "Multi-location catalogue" },
  },
  {
    feature: "Support",
    values: { starter: "Standard", professional: "Priority", business: "Priority + onboarding" },
  },
];
