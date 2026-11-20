import type { Metadata } from "next";
import Link from "next/link";

import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import { Container, CtaBand, Eyebrow, PageHeader, RuledList, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { getStartedHref } from "@/config/site";
import { audiences, trustPrinciples } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "For beauty businesses",
  description:
    "GlowHub AI for skincare retailers, beauty brands, salons, spas and distributors: sell smarter, run operations clearly and decide with confidence.",
  alternates: { canonical: "/for-businesses" },
};

const solutionDetail: Record<string, { image: string; alt: string; points: readonly string[] }> = {
  retail: {
    image: "/images/beauty-businesses/shop-owner.webp",
    alt: "A smiling beauty entrepreneur beside shelves of skincare in her boutique.",
    points: ["Batch and expiry tracking with first-expiry-first-out prompts", "Reorder suggestions you approve", "Guided consultations from your own stock"],
  },
  brands: {
    image: "/images/skincare-products/bottles-marble.webp",
    alt: "Unbranded skincare bottles and a jar on marble.",
    points: ["Catalogue with full ingredient lists and versions", "Retailer and direct sales in one place", "Clear product education for customers"],
  },
  salons: {
    image: "/images/beauty-editorial/hands-cream.webp",
    alt: "Close-up of hands smoothing cream onto deep brown skin.",
    points: ["Structured consultations with safety screening", "Retail recommendations after appointments", "Follow-ups drafted for your approval"],
  },
  distributors: {
    image: "/images/consultation/phone-cosmetics.webp",
    alt: "Hands scroll a phone beside small pots of cosmetics.",
    points: ["Supplier evidence reviewed by people", "Business-to-business orders and batches", "Multi-location stock with an audit trail"],
  },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For beauty businesses"
        photo={{
          shot: "A beauty creator at her table of products.",
          folder: "beauty-businesses",
          src: "/images/beauty-businesses/beauty-creator.webp",
          alt: "A smiling beauty creator sits at a table of cosmetics with a mirror.",
          position: "50% 30%",
        }}
        title="Built for the way beauty businesses really work."
        intro="Whether you run one boutique, a growing brand, a salon or a distribution business, GlowHub fits your day — and grows with you."
      >
        <Button asChild size="lg">
          <Link href={getStartedHref}>Get started</Link>
        </Button>
      </PageHeader>

      <div className="bg-white py-20 sm:py-28">
        <Container className="space-y-20 sm:space-y-28">
          {audiences.map((a, i) => {
            const detail = solutionDetail[a.id];
            return (
              <article key={a.id} id={a.id} aria-labelledby={`${a.id}-heading`} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <PhotoPlaceholder
                  shot={a.title}
                  folder=""
                  src={detail.image}
                  alt={detail.alt}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={`aspect-[4/3] lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}
                />
                <div className="lg:col-span-6">
                  <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                  <h2
                    id={`${a.id}-heading`}
                    className="mt-3 font-display text-[2rem] leading-[1.08] font-medium tracking-[-0.02em] text-plum sm:text-[2.75rem]"
                  >
                    {a.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-taupe">{a.body}</p>
                  <ul className="mt-6 space-y-3">
                    {detail.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-rose" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </Container>
      </div>

      <Section headingId="biz-trust" tone="sand" eyebrow="You stay in control" title="Helpful, never hasty.">
        <RuledList items={trustPrinciples.slice(0, 4)} columns={2} />
        <Button asChild variant="outline" className="mt-10">
          <Link href="/pricing">See plans and pricing</Link>
        </Button>
      </Section>

      <CtaBand />
    </>
  );
}
