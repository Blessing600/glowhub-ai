import type { Metadata } from "next";

import { Logo, type LogoVariant } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { brandCopy, contrastPairs, fonts, palette } from "@/config/brand";
import { contrastRatio, wcagMinimum } from "@/lib/brand/contrast";

export const metadata: Metadata = {
  title: "Brand preview",
  robots: { index: false, follow: false },
};

const swatches: Array<{ key: keyof typeof palette; name: string; role: string }> = [
  { key: "plum", name: "Deep plum", role: "Primary text, primary CTA, dark sections" },
  { key: "rose", name: "Hibiscus rose", role: "Logo period, large accents, icons, focus ring" },
  { key: "rose700", name: "Rose 700", role: "Rose text and links (AA on cream)" },
  { key: "cream", name: "Warm ivory", role: "Page background" },
  { key: "blush", name: "Blush", role: "Soft panels and selected states" },
  { key: "sage", name: "Soft sage", role: "Status graphics only (not a brand colour)" },
  { key: "sage700", name: "Sage 700", role: "Positive status text" },
  { key: "gold", name: "Antique gold", role: "Decorative; text only on plum or espresso" },
  { key: "terracotta", name: "Terracotta", role: "Decorative accents and graphics" },
  { key: "terracotta700", name: "Terracotta 700", role: "Terracotta text" },
  { key: "bronze", name: "Bronze", role: "Hero accent text ≥24px" },
  { key: "bronze700", name: "Bronze 700", role: "Explore Glow Scan button" },
  { key: "danger", name: "Danger", role: "Errors and destructive actions" },
  { key: "warning", name: "Warning", role: "Caution text" },
];

const logoRows: Array<{ variant: LogoVariant; label: string; dark?: boolean; height: number }> = [
  { variant: "wordmark", label: "Primary wordmark", height: 56 },
  { variant: "wordmark-reverse", label: "Reverse wordmark", dark: true, height: 56 },
  { variant: "lockup", label: "Extended lockup with tagline", height: 96 },
  { variant: "lockup-reverse", label: "Reverse lockup", dark: true, height: 96 },
  { variant: "extended", label: "Extended “glowhub ai”", height: 56 },
  { variant: "extended-reverse", label: "Reverse extended", dark: true, height: 56 },
  { variant: "wordmark-mono", label: "Monochrome", height: 56 },
  { variant: "wordmark-mono-white", label: "Monochrome white", dark: true, height: 56 },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6 border-t border-border py-12" aria-labelledby={title}>
      <h2 id={title} className="font-display text-3xl font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BrandPreviewPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-8">
      <header className="flex flex-col gap-4 py-12">
        <Badge variant="secondary" className="w-fit">
          Internal · not indexed
        </Badge>
        <h1 className="font-display text-[2.5rem] leading-tight font-semibold sm:text-6xl">
          Brand preview
        </h1>
        <p className="max-w-2xl text-plum-600">
          Prototype identity for {brandCopy.name}, pending brand approval. Logos are
          generated as vector outlines by <code>npm run brand:generate</code>; colour
          ratios below are computed from <code>src/config/brand.ts</code>.
        </p>
      </header>

      <Section title="Logos">
        <ul className="grid gap-4 md:grid-cols-2">
          {logoRows.map(({ variant, label, dark, height }) => (
            <li
              key={variant}
              className={`flex min-h-44 flex-col justify-between gap-6 rounded-xl border p-6 ${dark ? "border-plum bg-plum text-cream" : "bg-card"}`}
            >
              <span className="text-sm font-medium">{label}</span>
              <Logo variant={variant} height={height} className="max-w-full object-contain object-left" />
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["monogram-rose", "monogram-plum", "compact"] as const).map((variant) => (
            <li key={variant} className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6">
              <Logo variant={variant} height={96} />
              <span className="text-sm">{variant}</span>
            </li>
          ))}
          <li className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6">
            <Logo variant="monogram-plum" height={96} alt="" className="rounded-[22%]" />
            <span className="text-sm">favicon / app icon</span>
          </li>
        </ul>
      </Section>

      <Section title="Small-size test">
        <div className="flex flex-wrap items-end gap-8 rounded-xl border bg-card p-6">
          {[16, 24, 32, 48].map((size) => (
            <figure key={size} className="flex flex-col items-center gap-2">
              <Logo variant="monogram-plum" height={size} alt="" />
              <figcaption className="text-xs text-plum-600">{size}px</figcaption>
            </figure>
          ))}
          {[16, 20, 24, 32].map((size) => (
            <figure key={`w${size}`} className="flex flex-col items-start gap-2">
              <Logo variant="wordmark" height={size} alt="" />
              <figcaption className="text-xs text-plum-600">wordmark {size}px</figcaption>
            </figure>
          ))}
        </div>
        <p className="text-sm text-plum-600">
          Below ~20px tall, prefer the monogram: the rose period is the first detail to
          fade.
        </p>
      </Section>

      <Section title="Colour">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map(({ key, name, role }) => (
            <li key={key} className="overflow-hidden rounded-xl border bg-card">
              <div className="h-20" style={{ backgroundColor: palette[key] }} />
              <div className="space-y-1 p-3">
                <p className="text-sm font-semibold">{name}</p>
                <p className="font-mono text-xs">{palette[key]}</p>
                <p className="text-xs text-plum-600">{role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Approved colour pairings and WCAG contrast</caption>
            <thead className="border-b bg-muted">
              <tr>
                <th scope="col" className="p-3">Sample</th>
                <th scope="col" className="p-3">Pairing</th>
                <th scope="col" className="p-3">Use</th>
                <th scope="col" className="p-3">Ratio</th>
                <th scope="col" className="p-3">Result</th>
              </tr>
            </thead>
            <tbody>
              {contrastPairs.map(({ fg, bg, use, note }) => {
                const ratio = contrastRatio(palette[fg], palette[bg]);
                const pass = ratio >= wcagMinimum[use];
                return (
                  <tr key={`${fg}-${bg}-${use}`} className="border-b last:border-0">
                    <td className="p-3">
                      <span
                        className="inline-block rounded-md px-3 py-1 font-semibold"
                        style={{ color: palette[fg], backgroundColor: palette[bg] }}
                      >
                        Aa
                      </span>
                    </td>
                    <td className="p-3">
                      {fg} on {bg}
                      <span className="block text-xs text-plum-600">{note}</span>
                    </td>
                    <td className="p-3">
                      {use} (≥{wcagMinimum[use]}:1)
                    </td>
                    <td className="p-3 font-mono">{ratio.toFixed(2)}:1</td>
                    <td className={`p-3 font-semibold ${pass ? "text-sage-700" : "text-danger"}`}>
                      {pass ? "✓ Pass" : "✗ Fail"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-6 rounded-xl border bg-card p-6">
          <p className="text-sm text-plum-600">
            Display: {fonts.display} · UI and body: {fonts.body}
          </p>
          <p className="font-display text-[2.5rem] leading-[1.05] font-semibold sm:text-[4.75rem]">
            Beautiful businesses. Intelligent commerce.
          </p>
          <p className="text-xs text-plum-600">Hero — 40px mobile / 76px desktop, Playfair Display 500</p>
          <p className="font-display text-4xl font-semibold">Beauty deserves better than guesswork.</p>
          <p className="text-xs text-plum-600">Section heading — 36px, Playfair Display 500</p>
          <p className="text-lg font-semibold">Run a more intelligent beauty business.</p>
          <p className="max-w-2xl text-base">
            Body 16px Manrope. Manage stock, recommend the right products, review sourcing
            evidence and grow your beauty business with AI built into every workflow.
          </p>
          <p className="text-sm">Application 14px Manrope — tables, forms and dense workspace UI.</p>
          <p className="text-xs font-semibold tracking-[0.24em] uppercase">{brandCopy.tagline}</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-6">
          <Button>Get Early Access</Button>
          <Button variant="bronze">Explore Glow Scan</Button>
          <Button variant="outline">See GlowHub in Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Quarantine batch</Button>
          <Button disabled>Disabled</Button>
        </div>
        <p className="text-sm text-plum-600">
          Default and large buttons are 44px and 48px tall — the minimum primary touch
          target in the brief.
        </p>
      </Section>
    </main>
  );
}
