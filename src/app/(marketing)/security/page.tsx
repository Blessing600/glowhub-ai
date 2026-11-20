import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Security",
  description: "How GlowHub AI approaches security and responsible AI. Draft for legal review.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security and responsible AI"
      sections={[
        {
          heading: "Separation between businesses",
          body: [
            "Each business's records are kept in its own workspace. Staff see only what their role allows, and AI features read only the records the signed-in person is permitted to see.",
          ],
        },
        {
          heading: "People approve consequential actions",
          body: [
            "AI suggestions are read-only by default. Stock and price changes, purchase drafts, customer messages, refunds and publishing wait for explicit confirmation, and each is recorded.",
          ],
        },
        {
          heading: "Sensitive images",
          body: [
            "Glow Scan photos are never uploaded without separate, explicit consent and an approved processing destination. Today, photo analysis is not connected and photos stay on the device.",
          ],
        },
        {
          heading: "Reporting a concern",
          body: [
            "If you believe you have found a security issue, please contact us through the Support page and choose “Privacy”. Please don't include personal or customer data in your report.",
          ],
        },
      ]}
    />
  );
}
