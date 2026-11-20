import type { Metadata } from "next";

import { Container, PageHeader } from "@/components/marketing/section";
import { config } from "@/config/env";
import { ContactForm } from "@/features/forms/contact-form";

export const metadata: Metadata = {
  title: "Support",
  description: "Get in touch with the GlowHub AI team about your account, Glow Scan or privacy.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { supportEmail, privacyEmail } = config.legal;
  return (
    <>
      <PageHeader eyebrow="Support" title="We're here to help." intro="Questions about your account, Glow Scan or privacy? Send us a note." />
      <div className="bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm supportEmail={supportEmail} />
          <div className="space-y-4 text-sm">
            <div className="border-t border-line pt-5">
              <h2 className="font-semibold text-plum">Support</h2>
              <p className="mt-1 text-taupe">
                {supportEmail ? (
                  <a href={`mailto:${supportEmail}`} className="text-plum underline decoration-rose underline-offset-4">
                    {supportEmail}
                  </a>
                ) : (
                  "Our support email is being confirmed. Please use the form."
                )}
              </p>
            </div>
            <div className="border-t border-line pt-5">
              <h2 className="font-semibold text-plum">Privacy</h2>
              <p className="mt-1 text-taupe">
                {privacyEmail ? (
                  <a href={`mailto:${privacyEmail}`} className="text-plum underline decoration-rose underline-offset-4">
                    {privacyEmail}
                  </a>
                ) : (
                  "Our privacy contact is being confirmed. Please use the form and choose “Privacy”."
                )}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
