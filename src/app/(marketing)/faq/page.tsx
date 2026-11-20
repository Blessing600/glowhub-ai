import type { Metadata } from "next";

import { FaqList } from "@/components/marketing/faq-list";
import { Container, CtaBand, PageHeader } from "@/components/marketing/section";
import { faqs } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about GlowHub AI, GlowHub Intelligence, Glow Scan and your photo, diagnosis limits, authenticity and plans.",
  alternates: { canonical: "/faq" },
};

const topics = [...new Set(faqs.map((f) => f.topic))];

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Questions, answered." />
      <div className="bg-white py-12 sm:py-16">
        <Container className="max-w-4xl space-y-10">
          {topics.map((topic) => (
            <section key={topic} aria-labelledby={`faq-${topic}`}>
              <h2 id={`faq-${topic}`} className="mb-4 font-display text-[1.75rem] font-medium text-plum">
                {topic}
              </h2>
              <FaqList items={faqs.filter((f) => f.topic === topic)} />
            </section>
          ))}
        </Container>
      </div>
      <CtaBand />
    </>
  );
}
