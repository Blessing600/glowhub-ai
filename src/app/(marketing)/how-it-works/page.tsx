import type { Metadata } from "next";
import Link from "next/link";

import { Container, CtaBand, PageHeader } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { getStartedHref } from "@/config/site";
import { howItWorksSteps } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From creating your workspace to catalogue, batches, sales, consultations, GlowHub Intelligence and Glow Scan.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        photo={{
          shot: "A beauty professional recording her routine on a phone.",
          folder: "consultation",
          src: "/images/consultation/mirror-phone.webp",
          alt: "A woman records her beauty routine on a phone propped against a mirror.",
          position: "40% 50%",
        }}
        title="From first product to first insight."
        intro="Set up your workspace, add what you sell and let GlowHub connect the dots — at your pace, with you approving every important change."
      >
        <Button asChild size="lg">
          <Link href={getStartedHref}>Get started</Link>
        </Button>
      </PageHeader>

      <div className="bg-white py-16 sm:py-24">
        <Container>
          <ol className="mx-auto max-w-4xl">
            {howItWorksSteps.map(({ title, body }, i) => (
              <li key={title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-line py-8 sm:grid-cols-[6rem_1fr]">
                <span aria-hidden className="font-display text-4xl text-rose sm:text-5xl">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-plum">
                    <span className="sr-only">Step {i + 1}: </span>
                    {title}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-taupe">{body}</p>
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
