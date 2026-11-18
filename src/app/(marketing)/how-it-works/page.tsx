import type { Metadata } from "next";
import Link from "next/link";

import { Container, CtaBand, PageHeader } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { howItWorksSteps } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From setting up your workspace to catalogue, stock, consultations, evidence review, sales and reports.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        photo={{
          shot: "Set-up: entrepreneur at a studio table photographing a new skincare delivery for her catalogue.",
          folder: "beauty-businesses",
          src: "/images/consultation/mirror-phone.webp",
          alt: "A woman records her beauty routine on a phone propped against a mirror.",
        }}
        title="From first product to first insight."
        intro="The goal: set up a small starter catalogue in about 15 minutes, record your first sale and see your first stock insight."
      >
        <Button asChild size="lg">
          <Link href="/early-access">Get early access</Link>
        </Button>
      </PageHeader>

      <div className="bg-white py-16 sm:py-24">
        <Container>
          <ol className="relative mx-auto max-w-3xl space-y-6">
            {howItWorksSteps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex gap-4 rounded-xl border p-5 sm:gap-6 sm:p-6">
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-plum font-display text-xl font-semibold text-cream"
                >
                  {i + 1}
                </span>
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {title}
                    <Icon aria-hidden className="size-5 text-rose" />
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-plum-600">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      <CtaBand />
    </>
  );
}
