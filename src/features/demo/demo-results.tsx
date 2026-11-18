import {
  CircleAlert,
  CircleCheck,
  FileText,
  Info,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import {
  consultationBudget,
  consultationProducts,
  consultationSummary,
  draftBundle,
  expiryRisks,
  extractedFields,
  glowScanSample,
  invoice,
  leadReviewDays,
  lowConfidenceThreshold,
  restockRows,
  routine,
  stockAsOf,
  type ExtractedField,
  type ScenarioId,
} from "@/features/demo/scenarios";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

/** A result is revealed block by block; each block is one card. */
export type ResultBlock = { key: string; node: React.ReactNode };

function Card({ title, children, tone = "white" }: { title: string; children: React.ReactNode; tone?: "white" | "blush" }) {
  return (
    <div className={cn("rounded-lg border p-4", tone === "blush" ? "bg-blush" : "bg-white")}>
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="mt-2 text-sm leading-relaxed text-plum-600">{children}</div>
    </div>
  );
}

function Note({
  icon: Icon,
  tone,
  children,
}: {
  icon: typeof Info;
  tone: "info" | "warning" | "danger";
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex gap-2 rounded-lg border p-3 text-sm leading-relaxed",
        tone === "info" && "bg-white text-plum",
        tone === "warning" && "border-warning/40 bg-white text-warning",
        tone === "danger" && "border-danger/40 bg-white text-danger",
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function Sources({ items, uncertainty }: { items: readonly string[]; uncertainty: string }) {
  return (
    <Card title="Sources and uncertainty">
      <ul className="list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2">{uncertainty}</p>
    </Card>
  );
}

// ── Stock ──────────────────────────────────────────────────────────────────

function stockBlocks(): ResultBlock[] {
  const [first] = restockRows;
  return [
    {
      key: "restock",
      node: (
        <Card title={`Suggested restock (as of ${stockAsOf})`}>
          <ul className="space-y-2">
            {restockRows.map((row) => (
              <li key={row.product} className="rounded-md border bg-cream p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="font-semibold text-plum">{row.product}</span>
                  <span className="font-semibold text-plum">Order {row.reorder}</span>
                </div>
                <p className="mt-1 text-xs">
                  {row.available} available · {row.demandOverPeriod} expected demand · {row.safetyStock} safety
                  stock · {row.confirmedIncoming} incoming
                </p>
              </li>
            ))}
          </ul>
        </Card>
      ),
    },
    {
      key: "formula",
      node: (
        <Card title="How this was calculated">
          <p>
            Suggested order = max(0, expected demand over the next {leadReviewDays} days + safety stock − available −
            confirmed incoming)
          </p>
          <p className="mt-1">
            {first.product}: {first.demandOverPeriod} + {first.safetyStock} − {first.available} −{" "}
            {first.confirmedIncoming} = <strong className="text-plum">{first.reorder}</strong>
          </p>
        </Card>
      ),
    },
    {
      key: "expiry",
      node: (
        <>
          {expiryRisks.map((risk) => (
            <Note key={risk.batch} icon={TriangleAlert} tone="warning">
              Expiry risk: {risk.product}, batch {risk.batch} — {risk.units} units expire {risk.expires} (
              {risk.daysLeft} days). {risk.note}
            </Note>
          ))}
        </>
      ),
    },
    {
      key: "bundle",
      node: (
        <Card title={`Draft bundle: ${draftBundle.name}`} tone="blush">
          <ul>
            {draftBundle.items.map((item) => (
              <li key={item.product}>
                {item.product} — {item.priceLabel}
              </li>
            ))}
          </ul>
          <p className="mt-1">
            Bundle price <strong className="text-plum">{draftBundle.priceLabel}</strong> (list {draftBundle.listLabel},
            customer saves {draftBundle.savingLabel}). {draftBundle.reason}
          </p>
        </Card>
      ),
    },
    {
      key: "sources",
      node: (
        <Sources
          items={["Inventory records (fictional)", "Sales from the last 4 weeks (fictional)", "Supplier lead time: 7 days"]}
          uncertainty="Demand is projected from 4 weeks of fictional sales; seasonal changes and promotions are not modelled."
        />
      ),
    },
  ];
}

// ── Verification ──────────────────────────────────────────────────────────

const checkLabels: Record<ExtractedField["check"], { label: string; icon: typeof Info; className: string }> = {
  match: { label: "Matches", icon: CircleCheck, className: "text-sage-700" },
  mismatch: { label: "Mismatch", icon: TriangleAlert, className: "text-warning" },
  "needs-correction": { label: "Needs correction", icon: CircleAlert, className: "text-danger" },
  "not-checkable": { label: "Not checkable", icon: Info, className: "text-plum-600" },
};

function verificationBlocks(): ResultBlock[] {
  const mismatches = extractedFields.filter((f) => f.check === "mismatch").length;
  const corrections = extractedFields.filter((f) => f.check === "needs-correction").length;
  return [
    {
      key: "invoice",
      node: (
        <div className="rounded-lg border border-dashed border-plum-600 bg-white p-4 text-sm">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-plum-600 uppercase">
            <FileText aria-hidden className="size-4" /> Synthetic invoice for this demo
          </p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-plum-600">Supplier</dt>
            <dd>{invoice.supplier}</dd>
            <dt className="text-plum-600">Invoice</dt>
            <dd>
              {invoice.number} · {invoice.date}
            </dd>
            <dt className="text-plum-600">Line</dt>
            <dd>{invoice.line}</dd>
          </dl>
        </div>
      ),
    },
    {
      key: "fields",
      node: (
        <Card title="Extracted fields">
          <ul className="divide-y">
            {extractedFields.map((field) => {
              const status = checkLabels[field.check];
              const StatusIcon = status.icon;
              return (
                <li key={field.field} className="py-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span>
                      <span className="text-plum-600">{field.field}: </span>
                      <span className="font-semibold text-plum">{field.value}</span>
                    </span>
                    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", status.className)}>
                      <StatusIcon aria-hidden className="size-3.5" />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs">
                    Confidence {field.confidence}%{field.confidence < lowConfidenceThreshold ? " (low)" : ""}
                    {field.note ? ` · ${field.note}` : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        </Card>
      ),
    },
    {
      key: "status",
      node: (
        <div className="rounded-lg border-2 border-warning bg-white p-4 text-sm">
          <p className="flex items-center gap-2 font-semibold text-warning">
            <ShieldAlert aria-hidden className="size-4" />
            Status: Needs human review
          </p>
          <p className="mt-1 text-plum-600">
            {mismatches} mismatch and {corrections} field needing correction. A reviewer must check the evidence and
            record a decision before any status is shown to shoppers.
          </p>
        </div>
      ),
    },
    {
      key: "limits",
      node: (
        <Note icon={Info} tone="info">
          GlowHub does not decide whether a product is genuine or counterfeit. A registration reference or barcode is
          not proof that a specific unit is genuine.
        </Note>
      ),
    },
  ];
}

// ── Consultation ──────────────────────────────────────────────────────────

function SafetyNote() {
  return (
    <Note icon={ShieldAlert} tone="danger">
      Cosmetic guidance only, not a diagnosis. If you have a worsening rash, swelling, signs of infection or a
      suspected allergic reaction, stop and see a qualified healthcare professional. For breathing difficulty, get
      urgent medical help.
    </Note>
  );
}

function consultationBlocks(): ResultBlock[] {
  return [
    {
      key: "safety",
      node: <SafetyNote />,
    },
    {
      key: "products",
      node: (
        <Card title="Suggested from this shop's stock">
          <ol className="space-y-2">
            {consultationProducts.map((p) => (
              <li key={p.product} className="rounded-md border bg-cream p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="font-semibold text-plum">
                    {p.step}: {p.product}
                  </span>
                  <span className="font-semibold text-plum">{formatMoney(p.price)}</span>
                </div>
                <p className="mt-1 text-xs">
                  {p.inStock} in stock · Key ingredients: {p.keyIngredients}
                </p>
                <p className="mt-1">{p.reason}</p>
              </li>
            ))}
          </ol>
        </Card>
      ),
    },
    {
      key: "budget",
      node: (
        <Card title="Budget" tone="blush">
          <p>
            Total <strong className="text-plum">{formatMoney(consultationSummary.total)}</strong> of{" "}
            {formatMoney(consultationBudget)} — {formatMoney(consultationSummary.remaining)} remaining.
          </p>
        </Card>
      ),
    },
    {
      key: "routine",
      node: (
        <Card title="Simple routine">
          <p>
            <strong className="text-plum">Morning:</strong> {routine.morning.join(" → ")}
          </p>
          <p className="mt-1">
            <strong className="text-plum">Evening:</strong> {routine.evening.join(" → ")}
          </p>
        </Card>
      ),
    },
    {
      key: "cautions",
      node: (
        <Sources
          items={[
            "Ingredient lists from the products' fictional labels",
            "Stock and prices from this shop's catalogue (fictional)",
          ]}
          uncertainty="Patch test each new product and introduce one at a time. Ingredients can't predict how your skin will respond. Follow each product's instructions."
        />
      ),
    },
  ];
}

// ── Glow Scan sample ──────────────────────────────────────────────────────

function glowScanBlocks(): ResultBlock[] {
  return [
    {
      key: "sample",
      node: (
        <div className="space-y-2">
          <Note icon={Info} tone="info">
            Fictional sample image with scripted observations. Nothing here comes from a real photograph, and this
            prototype does not analyse photos.
          </Note>
          <PhotoPlaceholder
            shot="Fictional sample portrait for the Glow Scan demo (generated or fully released model; never a customer)."
            folder="skin-scan"
            className="min-h-48"
          />
        </div>
      ),
    },
    {
      key: "quality",
      node: (
        <Card title="Sample image quality">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {glowScanSample.imageQuality.map((q) => (
              <div key={q.label} className="contents">
                <dt>{q.label}</dt>
                <dd className="text-plum">{q.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ),
    },
    {
      key: "observations",
      node: (
        <Card title="Sample observations (scripted)" tone="blush">
          <ul className="list-disc space-y-1 pl-5">
            {glowScanSample.observations.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs">Cosmetic appearance only — no diagnosis, age estimate or skin-tone score.</p>
        </Card>
      ),
    },
    {
      key: "questionnaire",
      node: (
        <Card title="Questionnaire answers (sample)">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {glowScanSample.questionnaire.map((q) => (
              <div key={q.question} className="contents">
                <dt>{q.question}</dt>
                <dd className="text-plum">{q.answer}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ),
    },
    {
      key: "priorities",
      node: (
        <Card title="Priorities and product types">
          <p>
            <strong className="text-plum">Priorities:</strong> {glowScanSample.priorities.join(", ")}
          </p>
          <p className="mt-1">
            <strong className="text-plum">Look for:</strong> {glowScanSample.categories.join(", ")}
          </p>
        </Card>
      ),
    },
    { key: "safety", node: <SafetyNote /> },
  ];
}

export function resultBlocks(id: ScenarioId): ResultBlock[] {
  switch (id) {
    case "stock":
      return stockBlocks();
    case "verification":
      return verificationBlocks();
    case "consultation":
      return consultationBlocks();
    case "glow-scan":
      return glowScanBlocks();
  }
}

/** Simulated approval action for each scenario (brief §5: review action). */
export const scenarioActions: Partial<Record<ScenarioId, { label: string; result: string }>> = {
  stock: {
    label: "Create draft purchase list",
    result:
      "Simulated. In the workspace this creates a draft purchase list for the owner to approve. Nothing was ordered.",
  },
  verification: {
    label: "Send to reviewer queue",
    result: "Simulated. In the workspace a human reviewer would check the evidence and record a decision.",
  },
  consultation: {
    label: "Save this selection",
    result: "Simulated. Saving would need your consent. Nothing was saved.",
  },
};
