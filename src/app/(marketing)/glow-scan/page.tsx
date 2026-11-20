import type { Metadata } from "next";
import Link from "next/link";

import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import { Container, Eyebrow, RuledList, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { GlowScanFlow } from "@/features/glow-scan/glow-scan-flow";

export const metadata: Metadata = {
  title: "Glow Scan",
  description:
    "Personal skincare guidance from your own answers — skin feel, goals, sensitivities and budget in naira. Photo optional. Cosmetic guidance, never a diagnosis.",
  alternates: { canonical: "/glow-scan" },
};

const steps = [
  {
    title: "Tell us about your skin",
    body: "How it feels, what you'd like from your routine, what it reacts to and what you want to spend. Every question but product type is optional.",
  },
  {
    title: "Get matched to real products",
    body: "Suggestions come only from participating merchants' live catalogues: real names, real naira prices, in stock — never a generic basket.",
  },
  {
    title: "Build a routine you control",
    body: "See a morning and evening order of use, compare products, adjust your budget and exclude ingredients at any time.",
  },
];

const nevers = [
  { title: "No diagnosis", body: "Glow Scan offers cosmetic guidance only. Painful, spreading or persistent problems are referred to a qualified clinician." },
  { title: "No scoring", body: "No skin-tone, age or attractiveness scores, no ethnicity inference and no lightening goals — ever." },
  { title: "No silent uploads", body: "Your photo is optional, stays on your device today, and will never be processed without your separate, informed permission." },
];

export default function GlowScanPage() {
  return (
    <>
      <section aria-labelledby="glow-scan-heading" className="overflow-hidden bg-ivory">
        <Container className="grid items-center gap-10 pt-10 pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-14 lg:pb-24">
          <div className="lg:col-span-6">
            <Eyebrow>Glow Scan · Personal skincare guidance</Eyebrow>
            <h1
              id="glow-scan-heading"
              className="mt-5 font-display text-[2.75rem] leading-[1.02] font-medium tracking-[-0.02em] text-plum sm:text-[4rem] lg:text-[4.75rem]"
            >
              Skincare that starts with <em className="text-rose">you.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-taupe">
              Answer a few thoughtful questions — and add a photo only if you want to. Glow Scan turns what you tell
              us into a clear routine and, from participating beauty merchants, products that genuinely fit your skin
              and budget.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href="#start">Start Glow Scan</Link>
              </Button>
              <Link
                href="#how"
                className="inline-flex min-h-11 items-center font-semibold text-plum underline decoration-rose underline-offset-4 hover:decoration-2"
              >
                How it works
              </Link>
            </div>
            <p className="mt-8 max-w-md text-sm text-taupe">
              Cosmetic guidance, not medical advice. No account needed to start.
            </p>
          </div>
          <div className="relative lg:col-span-6">
            <PhotoPlaceholder
              shot="Glow Scan hero: a woman applying moisturiser in soft morning light."
              folder="beauty-editorial"
              src="/images/beauty-editorial/morning-cream.webp"
              alt="A woman in a bathrobe smooths cream onto her cheek in the morning."
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              position="72% 40%"
              className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[calc(100svh-8rem)] lg:w-full"
            />
            <p className="absolute bottom-4 left-4 rounded-md bg-ivory px-3 py-2 font-mono text-[11px] text-taupe">
              Model photograph. Not a Glow Scan user or result.
            </p>
          </div>
        </Container>
      </section>

      <Section id="how" headingId="how-heading" tone="white" eyebrow="How it works" title="Three calm steps to a routine that fits.">
        <ol className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-plum/20 pt-5">
              <span aria-hidden className="font-display text-5xl text-rose">
                {i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-plum">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-taupe">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section id="start" aria-label="Glow Scan" className="scroll-mt-20 border-y border-line bg-sand py-16 sm:py-24">
        <Container>
          <GlowScanFlow />
        </Container>
      </section>

      <Section headingId="never-heading" eyebrow="Our boundaries" title="Beauty guidance, with dignity.">
        <RuledList items={nevers} />
      </Section>

      <Section
        headingId="merchants-heading"
        tone="plum"
        eyebrow="For beauty merchants"
        title="Better-informed shoppers, matched to your shelf."
        intro="When your catalogue is connected to GlowHub, Glow Scan can suggest your in-stock products — with your prices and your ingredient lists — to shoppers who have told us what they need."
      >
        <Button asChild size="lg" variant="ivory">
          <Link href="/for-businesses">Explore GlowHub for business</Link>
        </Button>
      </Section>
    </>
  );
}
