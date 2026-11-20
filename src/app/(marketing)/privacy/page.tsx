import type { Metadata } from "next";

import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How GlowHub AI handles personal information, including Glow Scan photos. Draft for legal review.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      sections={[
        {
          heading: "What this notice covers",
          body: [
            "This notice explains what personal information GlowHub AI collects through this website, the GlowHub workspace and Glow Scan, why, and the choices you have. It is a draft prepared for legal review against the Nigeria Data Protection Act 2023 and will be finalised before it takes effect.",
          ],
        },
        {
          heading: "Information you give us",
          body: [
            "Account details (name, work email, business name), messages you send to support, and the records a business chooses to keep in its workspace, such as products, stock, sales and customer preferences with consent.",
            "Glow Scan answers you choose to give, such as how your skin feels, goals, sensitivities and budget.",
          ],
        },
        {
          heading: "Glow Scan photos",
          body: [
            "A photo is always optional. Photo analysis is not currently connected: a photo you add stays on your device as a preview, and is not uploaded, stored, logged or analysed. It is discarded when you remove it or leave the page.",
            "Before photo analysis is ever enabled, Glow Scan will ask for your separate, explicit permission and tell you who processes the photo, where, for what purpose and for how long. You will be able to decline and still use Glow Scan in full.",
            "Glow Scan never infers ethnicity, age, health conditions or identity, and never scores skin tone or attractiveness.",
          ],
        },
        {
          heading: "How we use information",
          body: [
            "To provide and secure the service, respond to you, and — only with your consent — send occasional news. We do not sell personal information, and we do not train AI models on a business's private records without separate, documented authorisation.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can ask to access, correct, export or delete your personal information, withdraw consent at any time, and complain to the Nigeria Data Protection Commission. Contact details appear above once confirmed.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "This website uses only cookies needed for it to work. No analytics or advertising cookies are set. See Cookie preferences in the footer.",
          ],
        },
      ]}
    />
  );
}
