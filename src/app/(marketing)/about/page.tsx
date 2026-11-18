import type { Metadata } from "next";

import { ProductStill } from "@/components/marketing/product-art";
import { CtaBand, PageHeader, Section } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "About",
  description: "Why GlowHub exists, what we're building first, and how AERA Technologies supports it.",
};

/**
 * Founder identity, operating entity and story are not yet approved for
 * publication (PRD §7) — do not add names, photos or biography until they are.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About GlowHub"
        photo={{
          shot: "About: beauty entrepreneurs at work in a bright Lagos salon or studio, natural candid moment.",
          folder: "beauty-businesses",
          src: "/images/beauty-businesses/beauty-creator.webp",
          alt: "A smiling woman sits at a table of cosmetics, ready to film.",
        }}
        title="A trusted beauty ecosystem, built from the business up."
      />

      <Section headingId="about-why" tone="white" eyebrow="Why we started" title="The problem is personal.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-plum-600">
            <p>
              GlowHub began with a founder&apos;s own frustration: struggling to find authentic skincare, products that
              were often out of stock, discovery scattered across social media, costly international shipping and
              vendors that were hard to trust.
            </p>
            <p>
              Beauty businesses face the other side of the same problem — they need better ways to manage stock, show
              where their products come from and reach the right customers. One person&apos;s experience isn&apos;t
              proof of a nationwide problem, so we&apos;re testing these ideas with retailers, brands and beauty
              professionals before launch.
            </p>
          </div>
          <ProductStill className="mx-auto max-w-md" />
        </div>
      </Section>

      <Section headingId="about-approach" eyebrow="Our approach" title="Useful first. Marketplace later.">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-plum-600">
          <p>
            The long-term vision is a trusted beauty ecosystem connecting shoppers with reliable sellers. We&apos;re
            starting with software that is useful to a single beauty business on day one — stock, sales, customers,
            consultations and supplier evidence — with AI doing real operational work.
          </p>
          <p>
            A connected marketplace comes later, once there are enough sellers, solid trust processes and dependable
            delivery. We&apos;re starting in Nigeria, with a first pilot city proposed as Lagos.
          </p>
        </div>
      </Section>

      <Section headingId="about-aera" tone="white" eyebrow="Who's building it" title="Founder-led, with AERA Technologies.">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-plum-600">
          <p>
            The founder leads customer research, partnerships, commercial decisions and business operations. AERA
            Technologies contributes product, engineering, design and operational support to take GlowHub from idea to
            launch.
          </p>
          <p>
            GlowHub is pre-launch. We have no customers, revenue or partnerships to announce yet, and we won&apos;t
            claim any until they&apos;re real.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
