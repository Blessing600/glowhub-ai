"use client";

import { ArrowDown, ArrowUp, FlaskConical, Pencil, RefreshCw, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { ServiceNotice } from "@/features/forms/form-parts";
import { constrainMatches, generalRoutine, moveStep, parseExclusions } from "@/features/glow-scan/logic";
import { categoryOptions, goalOptions, labelFor, sensitivityOptions, skinFeelOptions } from "@/features/glow-scan/options";
import { storeRoutine } from "@/features/glow-scan/routine-store";
import { recommendFromSample, SAMPLE_MERCHANT } from "@/features/glow-scan/sample-catalogue";
import type { GlowScanPreferences, GlowScanResult, ProductMatch, RoutineStep } from "@/features/glow-scan/types";
import { formatMoney, naira } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { ServiceResult } from "@/services/api-client";
import { requestRecommendations, saveRoutine } from "@/services/glow-scan";

const panelClass = "rounded-lg border border-line bg-white p-5 sm:p-7";
const h3Class = "font-display text-2xl font-medium text-plum";

const stockLabel: Record<ProductMatch["stock"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
  unknown: "Stock unknown",
};

function Chip({ children, onRemove, removeLabel }: { children: React.ReactNode; onRemove?: () => void; removeLabel?: string }) {
  return (
    <li className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line bg-ivory py-1 pr-1 pl-3 text-sm">
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="inline-flex size-7 items-center justify-center rounded-full text-taupe hover:bg-sand hover:text-ink"
        >
          <X aria-hidden className="size-3.5" />
        </button>
      ) : (
        <span className="w-2" />
      )}
    </li>
  );
}

/* ---------- Profile summary with inline budget / exclusion edits ---------- */

function Profile({
  prefs,
  onChange,
  onEdit,
}: {
  prefs: GlowScanPreferences;
  onChange: (prefs: GlowScanPreferences) => void;
  onEdit: () => void;
}) {
  const budgetId = useId();
  const excludeId = useId();
  const [budget, setBudget] = useState(prefs.budget ? String(prefs.budget.minor / 100) : "");
  const [exclusion, setExclusion] = useState("");
  const budgetValid = budget === "" || (/^\d+$/.test(budget.replace(/,/g, "")) && Number(budget.replace(/,/g, "")) >= 1_000);

  return (
    <section aria-labelledby="profile-heading" className={panelClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 id="profile-heading" className={h3Class}>
          What you told us
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={onEdit} className="h-11">
          <Pencil aria-hidden /> Change answers
        </Button>
      </div>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-mono text-xs tracking-[0.14em] text-taupe uppercase">Skin feels</dt>
          <dd className="mt-1 text-ink">{prefs.skinFeel ? labelFor(skinFeelOptions, prefs.skinFeel) : "Not answered"}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-[0.14em] text-taupe uppercase">Looking for</dt>
          <dd className="mt-1 text-ink">{prefs.categories.map((c) => labelFor(categoryOptions, c)).join(", ")}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-xs tracking-[0.14em] text-taupe uppercase">Goals</dt>
          <dd className="mt-1 text-ink">
            {prefs.goals.length ? prefs.goals.map((g) => labelFor(goalOptions, g)).join(", ") : "Not answered"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!budgetValid) return;
            const value = budget.replace(/,/g, "");
            onChange({ ...prefs, budget: value ? naira(Number(value)) : undefined });
          }}
          className="flex flex-col gap-1.5"
        >
          <label htmlFor={budgetId} className="text-sm font-semibold">
            Budget (₦)
          </label>
          <div className="flex gap-2">
            <input
              id={budgetId}
              inputMode="numeric"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              aria-invalid={!budgetValid}
              aria-describedby={`${budgetId}-hint`}
              className="h-11 min-w-0 flex-1 rounded-md border border-input bg-white px-3 text-base focus-visible:border-plum focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none aria-invalid:border-danger"
            />
            <Button type="submit" variant="outline">
              Update
            </Button>
          </div>
          <p id={`${budgetId}-hint`} className={cn("text-sm", budgetValid ? "text-taupe" : "text-danger")}>
            {budgetValid ? "Leave blank for no limit." : "Enter a whole amount of at least ₦1,000."}
          </p>
        </form>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const added = parseExclusions(exclusion);
            if (!added.length) return;
            onChange({ ...prefs, otherExclusions: [...new Set([...prefs.otherExclusions, ...added])] });
            setExclusion("");
          }}
          className="flex flex-col gap-1.5"
        >
          <label htmlFor={excludeId} className="text-sm font-semibold">
            Exclude an ingredient
          </label>
          <div className="flex gap-2">
            <input
              id={excludeId}
              value={exclusion}
              onChange={(e) => setExclusion(e.target.value)}
              className="h-11 min-w-0 flex-1 rounded-md border border-input bg-white px-3 text-base focus-visible:border-plum focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
            />
            <Button type="submit" variant="outline">
              Add
            </Button>
          </div>
        </form>
      </div>

      {(prefs.sensitivities.length > 0 || prefs.otherExclusions.length > 0) && (
        <div className="mt-5">
          <p className="text-sm font-semibold">Excluded</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {prefs.sensitivities.map((s) => (
              <Chip
                key={s}
                removeLabel={`Stop excluding ${labelFor(sensitivityOptions, s)}`}
                onRemove={() => onChange({ ...prefs, sensitivities: prefs.sensitivities.filter((x) => x !== s) })}
              >
                {labelFor(sensitivityOptions, s)}
              </Chip>
            ))}
            {prefs.otherExclusions.map((t) => (
              <Chip
                key={t}
                removeLabel={`Stop excluding ${t}`}
                onRemove={() => onChange({ ...prefs, otherExclusions: prefs.otherExclusions.filter((x) => x !== t) })}
              >
                {t}
              </Chip>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/* ---------- Matches ---------- */

function MatchCard({
  match,
  compared,
  onCompare,
  compareDisabled,
}: {
  match: ProductMatch;
  compared: boolean;
  onCompare: (checked: boolean) => void;
  compareDisabled: boolean;
}) {
  const id = useId();
  return (
    <li className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
      {match.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- merchant-hosted catalogue image
        <img src={match.imageUrl} alt="" loading="lazy" className="aspect-square w-full bg-sand object-cover" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs tracking-[0.14em] text-rose-700 uppercase">
          {labelFor(categoryOptions, match.category)}
        </p>
        <h4 className="mt-2 text-lg font-semibold text-ink">{match.name}</h4>
        <p className="text-sm text-taupe">
          {match.merchant === SAMPLE_MERCHANT ? "Sample product · not for sale" : `${match.brand} · sold by ${match.merchant}`}
        </p>
        <p className="mt-3 flex items-baseline justify-between gap-3">
          <span className="text-lg font-semibold">{formatMoney(match.price)}</span>
          <span className="text-sm text-success">{stockLabel[match.stock]}</span>
        </p>
        {match.reasons.length > 0 && (
          <>
            <p className="mt-4 text-sm font-semibold">Why it was selected</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-taupe">
              {match.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </>
        )}
        {match.cautions.length > 0 && (
          <>
            <p className="mt-4 text-sm font-semibold">Cautions</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-taupe">
              {match.cautions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-auto flex min-h-11 items-center gap-2 pt-4">
          <input
            id={id}
            type="checkbox"
            checked={compared}
            disabled={compareDisabled && !compared}
            onChange={(e) => onCompare(e.target.checked)}
            className="size-5 accent-plum"
          />
          <label htmlFor={id} className="text-sm">
            Compare
          </label>
        </div>
      </div>
    </li>
  );
}

function Comparison({ items }: { items: ProductMatch[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <caption className="sr-only">Comparison of selected products</caption>
        <thead className="bg-sand">
          <tr>
            <th scope="col" className="p-3 font-semibold">
              Product
            </th>
            <th scope="col" className="p-3 font-semibold">
              Price
            </th>
            <th scope="col" className="p-3 font-semibold">
              Stock
            </th>
            <th scope="col" className="p-3 font-semibold">
              Key ingredients
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {items.map((m) => (
            <tr key={m.id}>
              <th scope="row" className="p-3 font-medium">
                {m.name}
                <span className="block text-xs font-normal text-taupe">{m.brand}</span>
              </th>
              <td className="p-3">{formatMoney(m.price)}</td>
              <td className="p-3">{stockLabel[m.stock]}</td>
              <td className="p-3 text-taupe">{m.ingredients?.slice(0, 5).join(", ") ?? "Not published"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MatchesView({ result, prefs }: { result: GlowScanResult; prefs: GlowScanPreferences }) {
  const { shown, excluded } = constrainMatches(result.matches, prefs);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const compared = shown.filter((m) => compareIds.includes(m.id));

  if (shown.length === 0) {
    return (
      <p className="rounded-lg border border-line bg-white p-5 text-sm text-taupe">
        No products fit your answers right now. Try a different budget or fewer exclusions.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.slice(0, 6).map((m) => (
          <MatchCard
            key={m.id}
            match={m}
            compared={compareIds.includes(m.id)}
            compareDisabled={compareIds.length >= 3}
            onCompare={(checked) =>
              setCompareIds((ids) => (checked ? [...ids, m.id] : ids.filter((x) => x !== m.id)))
            }
          />
        ))}
      </ul>
      {compared.length >= 2 && <Comparison items={compared} />}
      {excluded.length > 0 && (
        <p className="text-sm text-taupe">
          {excluded.length} {excluded.length === 1 ? "product was" : "products were"} left out because of stock,
          ingredients or budget.
        </p>
      )}
      {result.missingInformation.length > 0 && (
        <div className="rounded-lg border border-line bg-white p-4 text-sm">
          <p className="font-semibold">What we couldn&apos;t check</p>
          <ul className="mt-1 list-disc pl-5 text-taupe">
            {result.missingInformation.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Routine ---------- */

function RoutineEditor({
  initial,
  personalised,
  products,
  source,
}: {
  initial: RoutineStep[];
  personalised: boolean;
  /** Product names by id, for steps linked to a match. */
  products: ReadonlyMap<string, string>;
  source: "sample" | "live";
}) {
  const [steps, setSteps] = useState(initial);
  const [saveOutcome, setSaveOutcome] = useState<"saved" | "saved-device" | "not-connected" | "error" | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <section aria-labelledby="routine-heading" className={panelClass}>
      <h3 id="routine-heading" className={h3Class}>
        {personalised ? "Your routine" : "General order of use"}
      </h3>
      <p className="mt-2 text-sm text-taupe">
        {personalised
          ? "Suggested from your matches. Reorder or remove steps to suit you."
          : "A common layering order for the products you chose — not a personalised prescription. Reorder or remove steps to suit you."}
      </p>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {(["morning", "evening"] as const).map((time) => {
          const timeSteps = steps.filter((s) => s.time === time);
          return (
            <div key={time}>
              <h4 className="font-display text-xl text-plum italic">{time === "morning" ? "Morning" : "Evening"}</h4>
              {timeSteps.length === 0 ? (
                <p className="mt-2 text-sm text-taupe">No steps.</p>
              ) : (
                <ol className="mt-3 space-y-2">
                  {timeSteps.map((step, i) => {
                    const name = labelFor(categoryOptions, step.category);
                    return (
                      <li key={step.id} className="flex items-start gap-3 rounded-md border border-line p-3">
                        <span aria-hidden className="font-mono text-sm text-rose-700">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold">{name}</p>
                          {step.productId && products.get(step.productId) && (
                            <p className="text-sm text-ink">{products.get(step.productId)}</p>
                          )}
                          <p className="text-sm text-taupe">{step.note}</p>
                        </div>
                        <div className="flex shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Move ${name} earlier in the ${time}`}
                            disabled={i === 0}
                            onClick={() => setSteps((s) => moveStep(s, step.id, -1))}
                          >
                            <ArrowUp aria-hidden />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Move ${name} later in the ${time}`}
                            disabled={i === timeSteps.length - 1}
                            onClick={() => setSteps((s) => moveStep(s, step.id, 1))}
                          >
                            <ArrowDown aria-hidden />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Remove ${name} from the ${time}`}
                            onClick={() => setSteps((s) => s.filter((x) => x.id !== step.id))}
                          >
                            <X aria-hidden />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
      </div>
      <ul className="mt-6 space-y-1 border-t border-line pt-5 text-sm text-taupe">
        <li>Patch test each new product on a small area for a few days before using it on your face.</li>
        <li>Introduce one new product at a time, and follow each manufacturer&apos;s instructions.</li>
        <li>This is cosmetic guidance, not medical advice. For persistent or painful skin problems, see a qualified clinician.</li>
      </ul>
      <div className="mt-6 space-y-3">
        <Button
          type="button"
          variant="outline"
          disabled={saving || steps.length === 0}
          onClick={async () => {
            setSaving(true);
            const result = await saveRoutine(steps);
            if (result.status === "not-connected") {
              // Account saving isn't connected: keep it in this browser instead, and say so.
              const named = steps.map((s) => ({ ...s, productName: s.productId ? products.get(s.productId) : undefined }));
              setSaveOutcome(storeRoutine(named, source) ? "saved-device" : "not-connected");
            } else {
              setSaveOutcome(result.status === "ok" ? "saved" : result.status);
            }
            setSaving(false);
          }}
        >
          {saving ? "Saving…" : "Save routine"}
        </Button>
        {saveOutcome === "saved" && (
          <p role="status" className="text-sm text-success">
            Routine saved.
          </p>
        )}
        {saveOutcome === "saved-device" && (
          <p role="status" className="text-sm text-success">
            Saved on this device. You&apos;ll find it at the top of Glow Scan next time. It isn&apos;t linked to an
            account.
          </p>
        )}
        {(saveOutcome === "not-connected" || saveOutcome === "error") && (
          <ServiceNotice outcome={saveOutcome} feature="Saving routines">
            {saveOutcome === "not-connected"
              ? "This browser wouldn't store it, so your routine wasn't saved. Keep this page open or write the steps down."
              : undefined}
          </ServiceNotice>
        )}
      </div>
    </section>
  );
}

/* ---------- Results page ---------- */

type Load = { status: "loading" } | { status: "sample"; data: GlowScanResult } | ServiceResult<GlowScanResult>;

export function GlowScanResults({
  prefs,
  onPrefsChange,
  onEdit,
}: {
  prefs: GlowScanPreferences;
  onPrefsChange: (prefs: GlowScanPreferences) => void;
  onEdit: () => void;
}) {
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoad({ status: "loading" });
    void requestRecommendations({ preferences: prefs }, controller.signal).then((result) => {
      if (controller.signal.aborted) return;
      // No merchant catalogue connected: match against the labelled sample catalogue.
      setLoad(result.status === "not-connected" ? { status: "sample", data: recommendFromSample(prefs) } : result);
    });
    return () => controller.abort();
  }, [prefs, attempt]);

  const data = load.status === "ok" || load.status === "sample" ? load.data : null;
  const routine = data && data.routine.length > 0 ? data.routine : generalRoutine(prefs.categories);
  const products = new Map((data?.matches ?? []).map((m) => [m.id, m.name]));

  return (
    <div className="space-y-6">
      <Profile prefs={prefs} onChange={onPrefsChange} onEdit={onEdit} />

      <section aria-labelledby="matches-heading" aria-busy={load.status === "loading"} className={panelClass}>
        <h3 id="matches-heading" className={h3Class}>
          Product matches
        </h3>
        <div className="mt-5" aria-live="polite">
          {load.status === "loading" && (
            <div className="space-y-3">
              <p className="text-sm text-taupe">Looking for products that fit your answers…</p>
              <div className="grid gap-4 sm:grid-cols-3" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-40 animate-pulse rounded-lg bg-sand" />
                ))}
              </div>
            </div>
          )}
          {load.status === "sample" && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 rounded-lg bg-sand p-4 text-sm">
                <FlaskConical aria-hidden className="mt-0.5 size-5 shrink-0 text-rose-700" />
                <p>
                  <span className="font-semibold text-ink">Sample catalogue.</span>{" "}
                  <span className="text-taupe">
                    Illustrative products that show how matching works. They aren&apos;t real products or merchants and
                    aren&apos;t for sale.
                  </span>
                </p>
              </div>
              <MatchesView result={load.data} prefs={prefs} />
            </div>
          )}
          {load.status === "error" && (
            <div className="space-y-3">
              <ServiceNotice outcome="error" feature="Finding products">
                {load.message} Your answers are kept.
              </ServiceNotice>
              <Button type="button" variant="outline" onClick={() => setAttempt((n) => n + 1)}>
                <RefreshCw aria-hidden /> Try again
              </Button>
            </div>
          )}
          {load.status === "ok" && <MatchesView result={load.data} prefs={prefs} />}
        </div>
      </section>

      <RoutineEditor
        key={routine.map((s) => s.id).join()}
        initial={routine}
        personalised={!!data && data.routine.length > 0}
        products={products}
        source={load.status === "ok" ? "live" : "sample"}
      />
    </div>
  );
}
