import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms for using GlowHub AI. Draft for legal review.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      sections={[
        {
          heading: "About these terms",
          body: [
            "These terms will govern your use of GlowHub AI's website and workspace. They are a structured draft for legal review and are not yet in effect.",
          ],
        },
        {
          heading: "Your workspace and data",
          body: [
            "You own the records you put into your workspace. You are responsible for having the right to store customer information you add, including any consent it requires.",
          ],
        },
        {
          heading: "AI features",
          body: [
            "GlowHub Intelligence and Glow Scan provide suggestions, not instructions. Actions that change stock, prices, purchases or messages require your confirmation. Figures are calculated from your records; AI-generated text is labelled and may be incomplete.",
            "Glow Scan offers cosmetic guidance only and is not medical advice, diagnosis or treatment.",
          ],
        },
        {
          heading: "Product evidence",
          body: [
            "Evidence badges describe which review was completed and when. They are not a guarantee that a particular unit is genuine, safe or suitable for an individual.",
          ],
        },
        {
          heading: "Plans and billing",
          body: [
            "Plan prices, billing periods, renewals, grace periods and refunds are described on the Pricing page and will be confirmed in the final terms. Renewal only happens with your authorisation.",
          ],
        },
      ]}
    />
  );
}
