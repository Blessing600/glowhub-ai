import type { Metadata } from "next";
import Link from "next/link";

import { Container, CtaBand, Eyebrow, PageHeader, RuledList, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { getStartedHref } from "@/config/site";
import { intelligenceAnatomy, sellingJourneys, trustPrinciples } from "@/features/marketing/content";
import { IntelligencePanel } from "@/features/marketing/intelligence-panel";
import { ModuleTabs } from "@/features/marketing/module-tabs";

export const metadata: Metadata = {
  title: "Product",
  description:
    "GlowHub Intelligence, guided selling, Glow Scan and the operations every beauty business runs on — inventory, products, suppliers, sales, staff and reports.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        photo={{
          shot: "Product: hands scrolling a phone beside small pots of cosmetics.",
          folder: "consultation",
          src: "/images/consultation/phone-cosmetics.webp",
          alt: "Hands scroll a phone beside small pots of cosmetics.",
          position: "50% 40%",
        }}
        title="Intelligence in every part of your beauty business."
        intro="GlowHub connects selling, customers and operations, with AI built into each workflow — explaining what it finds and waiting for your approval before anything changes."
      >
        <Button asChild size="lg">
          <Link href={getStartedHref}>Get started</Link>
        </Button>
      </PageHeader>

      <section aria-labelledby="intel-heading" className="bg-plum py-20 text-ivory sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow className="text-gold">GlowHub Intelligence</Eyebrow>
            <h2
              id="intel-heading"
              className="mt-4 font-display text-[2.25rem] leading-[1.06] font-medium tracking-[-0.02em] sm:text-[3rem]"
            >
              Ask your business anything.
            </h2>
            <ul className="mt-8 space-y-5">
              {intelligenceAnatomy.map((s) => (
                <li key={s.title}>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <IntelligencePanel />
          </div>
        </Container>
      </section>

      <Section headingId="selling-heading" eyebrow="Selling" title="Guided selling that respects every customer." tone="white">
        <RuledList items={sellingJourneys.map((j) => ({ title: j.title, body: `${j.body} ${j.outcome}.` }))} />
        <Button asChild variant="outline" className="mt-10">
          <Link href="/glow-scan">Explore Glow Scan</Link>
        </Button>
      </Section>

      <Section headingId="ops-heading" eyebrow="Operations" title="The foundations every insight relies on.">
        <ModuleTabs />
      </Section>

      <Section headingId="safeguards-heading" tone="white" eyebrow="Safeguards" title="Built-in boundaries.">
        <RuledList items={trustPrinciples} />
      </Section>

      <CtaBand />
    </>
  );
}
