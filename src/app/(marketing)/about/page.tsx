import type { Metadata } from "next";

import { CtaBand, PageHeader, Section } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "About",
  description: "Why GlowHub AI exists and how we approach intelligence for Africa's beauty businesses.",
  alternates: { canonical: "/about" },
};

/**
 * Founder identity, operating entity and story are not approved for publication —
 * do not add names, photos, biography, customer counts or partners until they are.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About GlowHub AI"
        photo={{
          shot: "Studio portrait of a beauty founder.",
          folder: "hero",
          src: "/images/hero/portrait-studio.webp",
          alt: "Studio beauty portrait of a woman with deep brown skin resting her chin on her hand.",
          position: "50% 25%",
        }}
        title="Intelligence, built for the business of beauty."
      />

      <Section headingId="about-why" tone="white" eyebrow="Why we exist" title="Great beauty businesses deserve great tools.">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-taupe">
          <p>
            Across Africa, beauty businesses are built by people with deep knowledge of their customers — and too
            little time. Stock lives in notebooks, sales in chats, supplier evidence in folders, and the decisions that
            shape a month&apos;s profit are made on instinct.
          </p>
          <p>
            GlowHub AI brings those threads together and puts intelligence to work on them: helping owners understand
            their customers, sell with confidence and run operations with clarity.
          </p>
        </div>
      </Section>

      <Section headingId="about-approach" eyebrow="Our approach" title="Useful, honest, in your control.">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-taupe">
          <p>
            We build AI that works inside real workflows rather than beside them. It reads the records you authorise,
            shows its working, says when it doesn&apos;t know, and waits for your approval before anything changes.
          </p>
          <p>
            For shoppers, Glow Scan offers personal, cosmetic skincare guidance with dignity: no diagnosis, no scoring
            of anyone&apos;s skin and no photo processing without clear permission.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
