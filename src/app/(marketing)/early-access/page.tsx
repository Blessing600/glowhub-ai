import { Check } from "lucide-react";
import type { Metadata } from "next";

import { Container, PageHeader } from "@/components/marketing/section";
import { EarlyAccessForm } from "@/features/forms/early-access-form";

export const metadata: Metadata = {
  title: "Get early access",
  description: "Join the GlowHub early-access list for beauty businesses and shoppers.",
};

const expect = [
  "News when pilots open in your city (proposed first city: Lagos)",
  "A chance to shape the product before launch",
  "A 14-day Professional trial with no card at launch",
];

export default function EarlyAccessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Early access"
        title="Be first to try GlowHub."
        intro="We're recruiting a small group of beauty businesses for pilots, and we'd love shoppers' input too."
      />
      <div className="bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <EarlyAccessForm />
          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">What to expect</h2>
            <ul className="mt-3 space-y-2">
              {expect.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-sage-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
}
