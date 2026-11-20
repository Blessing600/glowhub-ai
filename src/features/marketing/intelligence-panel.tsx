import { Check, MessageSquareText, ShieldCheck } from "lucide-react";

/**
 * The anatomy of a GlowHub Intelligence answer, drawn as interface structure.
 * Deliberately carries no figures, products or generated text: real answers come
 * only from a business's own authorised records.
 */
const sources = ["Sales", "Stock and batches", "Expiry dates", "Supplier costs", "Customer purchases"];

export function IntelligencePanel() {
  return (
    <figure className="rounded-lg border border-ivory/15 bg-espresso p-4 text-ivory sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/15 pb-4">
        <p className="font-mono text-xs tracking-[0.16em] text-gold uppercase">GlowHub Intelligence</p>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-ivory/20 px-3 py-1 text-xs">
          <ShieldCheck aria-hidden className="size-3.5 text-gold" />
          Your workspace only
        </p>
      </div>

      <ol className="mt-5 space-y-5">
        <li>
          <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">01 · You ask</p>
          <div className="mt-2 flex items-center gap-3 rounded-md bg-plum px-4 py-3 text-sm">
            <MessageSquareText aria-hidden className="size-4 shrink-0 text-gold" />
            <span>
              <span className="sr-only">Example question: </span>
              &ldquo;What should I reorder before the weekend?&rdquo;
            </span>
          </div>
        </li>
        <li>
          <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">02 · It reads</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {sources.map((s) => (
              <li key={s} className="rounded-full border border-ivory/20 px-3 py-1 text-xs">
                {s}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">03 · It shows its working</p>
          <div className="mt-2 space-y-2 rounded-md bg-plum p-4" aria-hidden>
            <div className="h-2 w-11/12 rounded-full bg-ivory/25" />
            <div className="h-2 w-4/5 rounded-full bg-ivory/25" />
            <div className="h-2 w-2/3 rounded-full bg-ivory/25" />
            <div className="mt-3 flex gap-2">
              <span className="h-5 w-20 rounded-full border border-gold/50" />
              <span className="h-5 w-24 rounded-full border border-gold/50" />
            </div>
          </div>
          <p className="mt-2 text-xs text-ivory">Every figure links to the records and formula behind it.</p>
        </li>
        <li>
          <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">04 · You decide</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 rounded-md border border-ivory/20 p-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-ivory px-3 py-2 font-semibold text-plum">
              <Check aria-hidden className="size-4" /> Review draft
            </span>
            <span className="text-xs text-ivory">Nothing is ordered, changed or sent until you approve.</span>
          </div>
        </li>
      </ol>
      <figcaption className="mt-5 border-t border-ivory/15 pt-4 text-xs text-ivory">
        Structure of an answer. Real answers use only your business&apos;s authorised records.
      </figcaption>
    </figure>
  );
}
