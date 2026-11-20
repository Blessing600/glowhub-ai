import { Container, Eyebrow } from "@/components/marketing/section";
import { config } from "@/config/env";

export type LegalSection = { heading: string; body: readonly string[] };

/**
 * Structured legal draft. Entity and contacts come only from config — never invented —
 * and every page is labelled as a draft until counsel approves it.
 */
export function LegalPage({ title, sections }: { title: string; sections: readonly LegalSection[] }) {
  const { legal } = config;
  return (
    <div className="bg-ivory py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Eyebrow>Draft for legal review · version {legal.version}</Eyebrow>
        <h1 className="mt-4 font-display text-[2.5rem] leading-tight font-medium text-plum sm:text-[3.25rem]">
          {title}
        </h1>
        <dl className="mt-6 grid gap-2 rounded-lg border border-line bg-white p-5 text-sm sm:grid-cols-[10rem_1fr]">
          <dt className="font-semibold">Operator</dt>
          <dd className="text-taupe">{legal.entityName ?? "Operating entity to be confirmed"}</dd>
          <dt className="font-semibold">Effective date</dt>
          <dd className="text-taupe">{legal.effectiveDate ?? "To be confirmed on approval"}</dd>
          <dt className="font-semibold">Contact</dt>
          <dd className="text-taupe">{legal.privacyEmail ?? legal.supportEmail ?? "Use the support form on our Support page"}</dd>
        </dl>
        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="text-xl font-semibold text-plum">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed text-taupe">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
