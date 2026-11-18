import { Camera, Check, MessageSquareText, ShieldAlert, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ConsultVisual } from "@/components/marketing/feature-visuals";
import { CtaBand, PageHeader, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { glowScanCta } from "@/config/site";

export const metadata: Metadata = {
  title: "For shoppers",
  description:
    "Find skincare that suits your routine and budget from participating beauty sellers, with clear ingredient reasons and an optional text-only consultation.",
};

const routes = [
  {
    icon: MessageSquareText,
    title: "Text-only consultation",
    body: "Answer a few questions about your goals, routine, budget and any allergies. No photo needed — always available.",
  },
  {
    icon: Camera,
    title: "Optional photo (Glow Scan)",
    body: "A future, opt-in way to start. In this prototype the camera preview stays on your device and photos are never analysed or stored.",
  },
];

const gets = [
  "Suggestions only from products the seller actually has in stock",
  "The reason for each product, its key ingredients and its price",
  "A simple morning and evening routine",
  "Cautions such as patch testing and products to introduce slowly",
];

const nevers = [
  "Diagnose skin conditions or prescribe treatments",
  "Estimate your age or score your skin tone or looks",
  "Promote skin lightening",
  "Save your answers without asking",
];

export default function ForShoppersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For shoppers"
        photo={{
          shot: "Shopper: close-up beauty portrait, natural coils, applying moisturiser, soft morning light.",
          folder: "beauty-editorial",
          src: "/images/beauty-editorial/hands-cream.webp",
          alt: "Close-up of hands smoothing cream onto deep brown skin.",
        }}
        title="Your skin. Your glow."
        intro="Discover a skincare routine that fits your goals and budget, with clear reasons for every product — from beauty sellers who use GlowHub."
      >
        <Button asChild size="lg">
          <Link href={glowScanCta.href}>{glowScanCta.label}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/early-access">Get early access</Link>
        </Button>
      </PageHeader>

      <Section headingId="shopper-routes" tone="white" eyebrow="Two ways to start" title="Photo or no photo — your choice.">
        <ul className="grid gap-4 md:grid-cols-2">
          {routes.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-xl border bg-white p-6">
              <Icon aria-hidden className="size-6 text-rose" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-600">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section headingId="shopper-gets" eyebrow="What you get" title="Clear, honest guidance.">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1.1fr]">
          <div>
            <h3 className="text-lg font-semibold">You get</h3>
            <ul className="mt-3 space-y-3">
              {gets.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-sage-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">GlowHub will never</h3>
            <ul className="mt-3 space-y-3">
              {nevers.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <X aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ConsultVisual />
        </div>
      </Section>

      <Section headingId="shopper-safety" tone="blush" eyebrow="Your safety" title="Cosmetic guidance, not medical advice.">
        <p className="flex max-w-3xl gap-3 rounded-xl border bg-white p-5 text-base leading-relaxed">
          <ShieldAlert aria-hidden className="mt-1 size-5 shrink-0 text-danger" />
          <span>
            If you have severe or persistent symptoms, a worsening rash, signs of infection or a suspected allergic
            reaction, GlowHub stops suggesting products and recommends a qualified healthcare professional. For
            breathing difficulty or other emergency signs, get urgent medical help.
          </span>
        </p>
      </Section>

      <Section headingId="shopper-buy" tone="white" eyebrow="Where to buy" title="From sellers you can see.">
        <p className="max-w-3xl text-base leading-relaxed text-plum-600">
          At launch you&apos;ll browse each seller&apos;s own GlowHub storefront and enquire directly. Any evidence
          badge says exactly which review was completed and when — it isn&apos;t a guarantee. A GlowHub marketplace
          with checkout may follow later; it is not available yet.
        </p>
      </Section>

      <CtaBand
        title="Want to know when it's ready?"
        body="Join early access and we'll let you know when GlowHub storefronts open near you."
      />
    </>
  );
}
