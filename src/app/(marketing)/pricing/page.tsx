import type { Metadata } from "next";

import { CtaBand, PageHeader, Section } from "@/components/marketing/section";
import { PlanComparison } from "@/features/pricing/plan-comparison";
import { PricingPlans } from "@/features/pricing/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Proposed GlowHub plans in naira: Starter, Professional and Business, billed monthly or prepaid quarterly, six-monthly or annually.",
};

const rules = [
  {
    title: "AI allowance",
    body: "Allowances reset every month, even on prepaid plans. You'll see a warning at 80%. At 100%, AI features pause until next month unless you choose a clearly priced add-on. Manual workflows keep working, and there are no surprise fees.",
  },
  {
    title: "Renewal and cancellation",
    body: "Renewal happens only with your authorisation, and we remind you before it does. Cancelling stops the next renewal; you keep access until the end of the period you paid for.",
  },
  {
    title: "Changing plans",
    body: "Upgrades take effect straight away with a prorated charge shown before you pay. Downgrades take effect at renewal.",
  },
  {
    title: "Failed payments",
    body: "A proposed seven-day grace period with reminders, then read-only access. You can always export your data or close your account.",
  },
  {
    title: "Refunds",
    body: "Duplicate or failed charges are refunded, and eligible cancellations are handled according to the law and our published policy. Your statutory rights are not affected.",
  },
  {
    title: "Larger businesses",
    body: "Need more seats, locations or products? Enterprise pricing is by quote.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple plans in naira."
        intro="Pay monthly, or prepay for three, six or twelve months and save. Every plan includes the core tools and GlowHub Intelligence."
      />

      <Section headingId="plans-heading" tone="white" title="Choose a plan">
        <PricingPlans />
      </Section>

      <Section headingId="compare-heading" title="Compare plans">
        <PlanComparison />
      </Section>

      <Section headingId="rules-heading" tone="white" title="Billing, plainly explained">
        <dl className="grid gap-4 md:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule.title} className="rounded-xl border p-5">
              <dt className="font-semibold">{rule.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-plum-600">{rule.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-plum-600">
          GlowHub is pre-launch: no payments are taken on this site.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
