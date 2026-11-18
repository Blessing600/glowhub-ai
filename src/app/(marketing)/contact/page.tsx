import type { Metadata } from "next";

import { Container, PageHeader } from "@/components/marketing/section";
import { config } from "@/config/env";
import { ContactForm } from "@/features/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the GlowHub team.",
};

export default function ContactPage() {
  const { supportEmail, privacyEmail } = config.legal;
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to us." intro="Questions about GlowHub, pilots or privacy? Send us a note." />
      <div className="bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <div className="space-y-4 text-sm">
            <div className="rounded-xl border p-5">
              <h2 className="font-semibold">Support</h2>
              <p className="mt-1 text-plum-600">
                {supportEmail ? (
                  <a href={`mailto:${supportEmail}`} className="text-rose-700 underline underline-offset-4">
                    {supportEmail}
                  </a>
                ) : (
                  "Support email to be confirmed before launch."
                )}
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <h2 className="font-semibold">Privacy</h2>
              <p className="mt-1 text-plum-600">
                {privacyEmail ? (
                  <a href={`mailto:${privacyEmail}`} className="text-rose-700 underline underline-offset-4">
                    {privacyEmail}
                  </a>
                ) : (
                  "Privacy contact to be confirmed before launch."
                )}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
