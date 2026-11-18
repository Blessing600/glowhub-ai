import { Check, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container, CtaBand, PageHeader, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { coreManagement, features } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Glow Intelligence, Glow Match, Glow Check, Glow Verify, Glow Routine, Glow Scan and core business management.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        photo={{
          shot: "Product: a beauty retailer and a customer comparing two serums at a counter, warm shop light.",
          folder: "beauty-businesses",
          src: "/images/consultation/phone-cosmetics.webp",
          alt: "Hands scroll a phone beside small pots of cosmetics.",
        }}
        title="AI built into every workflow."
        intro="Each feature does real work on your records and shows its reasoning. Each one also says how much of it this prototype shows."
      >
        <Button asChild size="lg">
          <Link href="/demo">See it in action</Link>
        </Button>
      </PageHeader>

      <div className="bg-white py-16 sm:py-24">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-2">
            {features.map(({ name, icon: Icon, title, body, status, points }) => (
              <li key={name} id={name.toLowerCase().replace(/\s+/g, "-")} className="flex flex-col rounded-xl border p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-blush">
                    <Icon aria-hidden className="size-6 text-rose-700" />
                  </span>
                  <h2 className="font-display text-[1.75rem] font-semibold">{name}</h2>
                </div>
                <p className="mt-4 text-lg font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-plum-600">{body}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-sage-700" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex gap-2 pt-5 text-xs font-semibold text-plum-600">
                  <Info aria-hidden className="size-4 shrink-0 text-rose-700" />
                  {status}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Section headingId="core-heading" eyebrow="Core business management" title="The foundations every feature uses.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreManagement.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border bg-white p-5 text-sm">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-sage-700" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-plum-600">
          Workspace screenshots will be added here as each part of the prototype is built.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
