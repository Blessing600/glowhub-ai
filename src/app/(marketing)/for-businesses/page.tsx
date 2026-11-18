import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { StockVisual } from "@/components/marketing/feature-visuals";
import { CtaBand, IconGrid, PageHeader, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { audiences, businessCapabilities, coreManagement } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "For businesses",
  description:
    "Stock, expiry, sales, customers, consultations and supplier evidence for beauty retailers, brands, distributors and salons — with AI built in.",
};

const safeguards = [
  "Read-only by default: AI suggests, you approve any stock, price, purchase, message or refund.",
  "Every number links to your records and shows how it was calculated.",
  "Says when evidence is missing instead of filling the gap.",
  "Your records stay in your workspace, never visible to other businesses.",
  "Human reviewers make every verification decision.",
];

export default function ForBusinessesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For businesses"
        photo={{
          shot: "Founder: Nigerian beauty retailer in her own shop, shelves of skincare behind her, checking stock on her phone.",
          folder: "beauty-businesses",
          src: "/images/beauty-businesses/shop-owner.webp",
          alt: "A smiling woman stands beside shelves of skincare in a beauty shop.",
        }}
        title="Run a more intelligent beauty business."
        intro="GlowHub brings your catalogue, batches, sales, customers and supplier evidence together — and puts AI to work on the busywork: restock suggestions, expiry warnings, consultations and sales insight."
      >
        <Button asChild size="lg">
          <Link href="/early-access">Get early access</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/demo">See it in action</Link>
        </Button>
      </PageHeader>

      <Section headingId="biz-capabilities" tone="white" eyebrow="What you can do" title="Everything your shop runs on.">
        <IconGrid items={businessCapabilities} />
      </Section>

      <Section headingId="biz-core" eyebrow="Core management" title="The everyday essentials, done properly.">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <ul className="space-y-3">
            {coreManagement.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-sage-700" />
                {item}
              </li>
            ))}
          </ul>
          <StockVisual />
        </div>
      </Section>

      <Section
        headingId="biz-safeguards"
        tone="blush"
        eyebrow="AI you stay in control of"
        title="Helpful, never hasty."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {safeguards.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border bg-white p-5 text-sm leading-relaxed">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-sage-700" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section headingId="biz-audiences" tone="white" eyebrow="Who it's for" title="From one shop to many locations.">
        <IconGrid items={audiences.slice(0, 4)} columns={2} />
        <Button asChild variant="outline" className="mt-8">
          <Link href="/pricing">See plans and pricing</Link>
        </Button>
      </Section>

      <CtaBand />
    </>
  );
}
