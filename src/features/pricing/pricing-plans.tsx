"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { getStartedHref } from "@/config/site";
import { billingCycles, plans, trialDays, trialPlanId, type BillingCycleId } from "@/config/pricing";
import { formatMoney } from "@/lib/money";
import { quotePlan } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingPlans() {
  const [cycleId, setCycleId] = useState<BillingCycleId>("monthly");

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold">Billing period</legend>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg bg-sand p-1 sm:inline-grid sm:grid-cols-4">
          {billingCycles.map((cycle) => (
            <label
              key={cycle.id}
              className="flex h-11 cursor-pointer items-center justify-center gap-1 rounded-md px-4 text-sm font-semibold text-taupe has-checked:bg-white has-checked:text-plum has-checked:shadow-xs has-focus-visible:outline-2 has-focus-visible:outline-rose"
            >
              <input
                type="radio"
                name="billing-cycle"
                value={cycle.id}
                checked={cycleId === cycle.id}
                onChange={() => setCycleId(cycle.id)}
                className="sr-only"
              />
              {cycle.label}
              {cycle.discountBps > 0 && (
                <span className="text-xs font-medium text-rose-700">−{cycle.discountBps / 100}%</span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      <ul className="mt-8 grid gap-4 lg:grid-cols-3" aria-live="polite">
        {plans.map((plan) => {
          const quote = quotePlan(plan.id, cycleId);
          const isTrialPlan = plan.id === trialPlanId;
          return (
            <li
              key={plan.id}
              className={cn(
                "flex flex-col rounded-lg border border-line bg-white p-6 sm:p-7",
                isTrialPlan && "border-2 border-plum",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-[1.75rem] font-medium text-plum">{plan.name}</h3>
                {isTrialPlan && (
                  <span className="rounded-full bg-plum px-3 py-1 text-xs font-semibold text-ivory">
                    {trialDays}-day trial plan
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-taupe">{plan.summary}</p>

              <p className="mt-6">
                <span className="text-[2.25rem] leading-none font-semibold tracking-tight text-ink tabular-nums">
                  {formatMoney(quote.total)}
                </span>
                <span className="ml-1 text-sm text-taupe">
                  {quote.months === 1 ? "per month" : `for ${quote.months} months, prepaid`}
                </span>
              </p>
              <p className="mt-2 min-h-10 text-sm text-taupe">
                {quote.months === 1 ? (
                  "Billed monthly. Cancel any time before renewal."
                ) : (
                  <>
                    {formatMoney(quote.effectiveMonthly)} a month equivalent. You save{" "}
                    <strong className="text-ink">{formatMoney(quote.savings)}</strong> versus {quote.months} monthly
                    payments.
                  </>
                )}
              </p>

              <ul className="mt-6 space-y-2 text-sm">
                {[
                  `${plan.seats} ${plan.seats === 1 ? "seat" : "seats"}, ${plan.locations} ${plan.locations === 1 ? "location" : "locations"}`,
                  `${plan.activeSkus.toLocaleString("en-NG")} active products (SKUs)`,
                  `${plan.aiRequestsPerMonth.toLocaleString("en-NG")} AI requests a month`,
                  "Stock, sales, customers and expiry tracking",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button asChild className="mt-8" variant={isTrialPlan ? "default" : "outline"}>
                <Link href={`${getStartedHref}?plan=${plan.id}`}>
                  Get started<span className="sr-only"> with {plan.name}</span>
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 space-y-1 text-sm text-taupe">
        <p>Prices in Nigerian naira.</p>
        <p>
          The {trialDays}-day Professional trial needs no card and never turns into a paid plan automatically. No
          payment is taken on this website.
        </p>
      </div>
    </div>
  );
}
