import { Check, X } from "lucide-react";
import type { Metadata } from "next";

import { Container, CtaBand, PageHeader } from "@/components/marketing/section";
import { InteractiveDemo } from "@/features/demo/interactive-demo";

export const metadata: Metadata = {
  title: "Interactive demo",
  description:
    "See GlowHub answer restock, supplier invoice and skincare consultation questions using a fictional shop's data.",
};

const shows = [
  "How answers link to records and show calculations",
  "Where GlowHub flags uncertainty and asks a person to decide",
  "How consultations stay within budget and in-stock products",
];

const doesNot = [
  "Use a live AI model — every answer is scripted",
  "Use any real business or customer data",
  "Order stock, send messages or save anything",
];

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive demo • fictional data"
        title="See GlowHub in action."
        intro="Pick a question for a fictional beauty shop and watch how GlowHub works it through."
      />
      <div className="bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <InteractiveDemo />
          <div className="space-y-6">
            <div className="rounded-xl border p-6">
              <h2 className="text-lg font-semibold">What this demo shows</h2>
              <ul className="mt-3 space-y-2">
                {shows.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-sage-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-6">
              <h2 className="text-lg font-semibold">What it doesn&apos;t do</h2>
              <ul className="mt-3 space-y-2">
                {doesNot.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <X aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <CtaBand />
    </>
  );
}
