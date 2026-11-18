/**
 * Small product mock-ups for the marketing pages, built from the same fictional
 * demo data so numbers match the interactive demo.
 */
import { CircleAlert, CircleCheck, ShieldAlert, TriangleAlert } from "lucide-react";

import { ProductTrio } from "@/components/marketing/product-art";
import {
  consultationBudget,
  consultationSummary,
  expiryRisks,
  extractedFields,
  invoice,
  restockRows,
} from "@/features/demo/scenarios";
import { formatMoney } from "@/lib/money";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl bg-blush p-5 sm:p-8">
      <div className="rounded-xl border bg-white p-5 shadow-xs">
        <p className="text-xs font-semibold tracking-[0.18em] text-plum-600 uppercase">{label}</p>
        {children}
      </div>
      <p className="mt-3 text-xs text-plum-600">Prototype view · fictional data</p>
    </div>
  );
}

export function StockVisual() {
  const risk = expiryRisks[0];
  return (
    <Frame label="Stock and expiry">
      <ul className="mt-4 divide-y text-sm">
        {restockRows.map((row) => (
          <li key={row.product} className="flex items-center justify-between gap-3 py-3">
            <span>
              <span className="block font-semibold">{row.product}</span>
              <span className="text-xs text-plum-600">{row.available} in stock</span>
            </span>
            <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-semibold">
              Reorder {row.reorder}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex gap-2 rounded-lg border border-warning/40 p-3 text-xs text-warning">
        <TriangleAlert aria-hidden className="size-4 shrink-0" />
        {risk.product} · batch {risk.batch} · {risk.units} units expire in {risk.daysLeft} days
      </p>
    </Frame>
  );
}

export function EvidenceVisual() {
  const shown = extractedFields.filter((f) => ["Batch", "Expiry", "Pack size", "Registration reference"].includes(f.field));
  return (
    <Frame label="Supplier evidence">
      <p className="mt-3 text-sm">
        <span className="font-semibold">{invoice.number}</span>
        <span className="text-plum-600"> · {invoice.supplier}</span>
      </p>
      <ul className="mt-3 divide-y text-sm">
        {shown.map((f) => (
          <li key={f.field} className="flex items-center justify-between gap-3 py-2.5">
            <span>
              <span className="text-plum-600">{f.field}: </span>
              <span className="font-semibold">{f.value}</span>
            </span>
            {f.check === "match" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-700">
                <CircleCheck aria-hidden className="size-3.5" /> Matches
              </span>
            ) : f.check === "mismatch" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-warning">
                <TriangleAlert aria-hidden className="size-3.5" /> Mismatch
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-danger">
                <CircleAlert aria-hidden className="size-3.5" /> Check
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-warning px-3 py-1 text-xs font-semibold text-warning">
        <ShieldAlert aria-hidden className="size-4" /> Needs human review
      </p>
    </Frame>
  );
}

export function ConsultVisual() {
  return (
    <div className="relative rounded-2xl bg-cream">
      <ProductTrio className="mx-auto max-w-md" />
      <div className="mx-auto -mt-6 w-fit max-w-[90%] rounded-xl border bg-white p-4 text-sm shadow-xs sm:absolute sm:top-6 sm:right-4 sm:mt-0">
        <p className="text-xs font-semibold tracking-[0.18em] text-plum-600 uppercase">Routine · in stock</p>
        <p className="mt-1">
          <span className="font-display text-2xl font-semibold lining-nums">{formatMoney(consultationSummary.total)}</span>
          <span className="text-plum-600"> of {formatMoney(consultationBudget)}</span>
        </p>
        <p className="text-xs text-sage-700">{formatMoney(consultationSummary.remaining)} under budget</p>
      </div>
    </div>
  );
}
