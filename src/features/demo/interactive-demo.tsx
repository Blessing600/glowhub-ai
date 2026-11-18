"use client";

import { Check, LoaderCircle, Play, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { resultBlocks, scenarioActions } from "@/features/demo/demo-results";
import { scenarios, type DemoTab, type ScenarioId } from "@/features/demo/scenarios";
import { cn } from "@/lib/utils";

const STEP_MS = 650;
const BLOCK_MS = 380;

const tabs: ReadonlyArray<{ id: DemoTab; label: string }> = [
  { id: "business", label: "For businesses" },
  { id: "shopper", label: "For shoppers" },
];

type Run = { id: ScenarioId; stepsDone: number; blocksShown: number; runKey: number };

/**
 * Scripted interactive demo (brief §5). No live model and no network calls.
 * Deep links: #demo starts the first business prompt; #glow-scan starts the
 * Glow Scan sample.
 */
export function InteractiveDemo({
  className,
  initialScenario,
  collapsible = false,
}: {
  className?: string;
  /** Render this scenario's finished answer on first paint, so the panel is never empty. */
  initialScenario?: ScenarioId;
  /** On small screens, show only the first cards of the initial answer until expanded. */
  collapsible?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const initial = initialScenario ? scenarios.find((s) => s.id === initialScenario) : undefined;
  const [tab, setTab] = useState<DemoTab>(initial?.tab ?? "business");
  const [run, setRun] = useState<Run | null>(
    initial
      ? { id: initial.id, stepsDone: initial.steps.length, blocksShown: Number.POSITIVE_INFINITY, runKey: 0 }
      : null,
  );
  const [actionDone, setActionDone] = useState(false);
  const [expanded, setExpanded] = useState(!collapsible);
  const rootRef = useRef<HTMLDivElement>(null);

  const scenario = run ? scenarios.find((s) => s.id === run.id)! : null;
  const blocks = run ? resultBlocks(run.id) : [];
  const working = !!run && !!scenario && run.stepsDone < scenario.steps.length;
  const finished = !!run && !!scenario && !working && run.blocksShown >= blocks.length;

  const start = useCallback(
    (id: ScenarioId) => {
      const target = scenarios.find((s) => s.id === id)!;
      setTab(target.tab);
      setActionDone(false);
      setExpanded(true);
      setRun((prev) => ({
        id,
        stepsDone: reduceMotion ? target.steps.length : 0,
        blocksShown: reduceMotion ? Number.POSITIVE_INFINITY : 0,
        runKey: (prev?.runKey ?? 0) + 1,
      }));
    },
    [reduceMotion],
  );

  // Advance the scripted progress: steps first, then result blocks.
  useEffect(() => {
    if (!run || !scenario) return;
    if (run.stepsDone < scenario.steps.length) {
      const t = setTimeout(() => setRun((r) => r && { ...r, stepsDone: r.stepsDone + 1 }), STEP_MS);
      return () => clearTimeout(t);
    }
    if (run.blocksShown < blocks.length) {
      const t = setTimeout(() => setRun((r) => r && { ...r, blocksShown: r.blocksShown + 1 }), BLOCK_MS);
      return () => clearTimeout(t);
    }
  }, [run, scenario, blocks.length]);

  // Deep links from the hero CTA and the header's "Try Glow Scan".
  useEffect(() => {
    function fromHash() {
      if (window.location.hash === "#glow-scan") start("glow-scan");
      else if (window.location.hash === "#demo") start("stock");
      else return;
      rootRef.current?.focus({ preventScroll: true });
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [start]);

  const action = run ? scenarioActions[run.id] : undefined;
  const visibleBlocks = blocks.slice(0, run?.blocksShown ?? 0);
  const PREVIEW_BLOCKS = 2;
  /** Hidden below lg until expanded; display:none also removes it from focus order. */
  const mobileHidden = expanded ? undefined : "max-lg:hidden";

  return (
    <div
      ref={rootRef}
      id="demo"
      tabIndex={-1}
      className={cn("scroll-mt-20 rounded-xl border bg-cream shadow-xs outline-none", className)}
      role="region"
      aria-label="GlowHub interactive demo"
    >
      <span id="glow-scan" className="block scroll-mt-20" aria-hidden />
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 sm:px-5">
        <p className="font-display text-xl font-semibold">GlowHub Intelligence</p>
        <p className="rounded-full border border-rose-700 px-3 py-1 text-xs font-semibold text-rose-700">
          Interactive demo • fictional data
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <div role="tablist" aria-label="Demo audience" className="grid grid-cols-2 gap-1 rounded-lg bg-blush p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`demo-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="demo-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => {
                setTab(t.id);
                setRun(null);
              }}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
                e.preventDefault();
                const index = tabs.findIndex((x) => x.id === t.id);
                const next =
                  e.key === "Home" ? 0
                  : e.key === "End" ? tabs.length - 1
                  : (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
                setTab(tabs[next].id);
                setRun(null);
                document.getElementById(`demo-tab-${tabs[next].id}`)?.focus();
              }}
              className="h-11 rounded-md text-sm font-semibold text-plum-600 aria-selected:bg-white aria-selected:text-plum aria-selected:shadow-xs"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${tab}`} className="mt-4">
          <p id="demo-prompts-label" className="text-sm font-semibold">
            Choose a question
          </p>
          <ul aria-labelledby="demo-prompts-label" className="mt-2 flex flex-col gap-2">
            {scenarios
              .filter((s) => s.tab === tab)
              .map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => start(s.id)}
                    aria-pressed={run?.id === s.id}
                    className="flex min-h-11 w-full items-start gap-2 rounded-lg border bg-white px-3 py-2.5 text-left text-sm hover:border-rose aria-pressed:border-rose-700 aria-pressed:bg-blush"
                  >
                    <Play aria-hidden className="mt-0.5 size-4 shrink-0 text-rose-700" />
                    <span>
                      <span className="block font-semibold">{s.label}</span>
                      <span className="block text-plum-600">“{s.prompt}”</span>
                    </span>
                  </button>
                </li>
              ))}
          </ul>

          <div className="mt-4" aria-live="polite" aria-busy={working}>
            {!run && (
              <p className="rounded-lg border border-dashed bg-white p-4 text-sm text-plum-600">
                Answers are scripted from a fictional shop&apos;s records to show how GlowHub works. No live AI, no
                real customer data, and nothing you do here changes anything.
              </p>
            )}

            {run && scenario && (
              <div key={run.runKey} className="space-y-3">
                <p className="ml-auto w-fit max-w-[90%] rounded-lg rounded-br-sm bg-plum px-3 py-2 text-sm text-cream">
                  {scenario.prompt}
                </p>

                <ol className="space-y-1 text-sm text-plum-600" aria-label="Progress">
                  {scenario.steps.map((step, i) => {
                    const done = i < run.stepsDone;
                    const active = i === run.stepsDone && working;
                    if (!done && !active) return null;
                    return (
                      <li key={step} className="flex items-center gap-2">
                        {done ? (
                          <Check aria-hidden className="size-4 text-sage-700" />
                        ) : (
                          <LoaderCircle aria-hidden className="size-4 animate-spin text-rose-700" />
                        )}
                        {step}
                        <span className="sr-only">{done ? " — done" : " — in progress"}</span>
                      </li>
                    );
                  })}
                </ol>

                {visibleBlocks.map((block, i) => (
                  <motion.div
                    key={block.key}
                    className={i >= PREVIEW_BLOCKS ? mobileHidden : undefined}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {block.node}
                  </motion.div>
                ))}

                {!expanded && finished && blocks.length > PREVIEW_BLOCKS && (
                  <Button variant="outline" className="w-full lg:hidden" onClick={() => setExpanded(true)}>
                    Show the full answer
                  </Button>
                )}

                {finished && run.id === "glow-scan" && (
                  <Button variant="outline" onClick={() => start("consultation")}>
                    Prefer no photo? Try the text-only consultation
                  </Button>
                )}

                {finished && action && (
                  <div className={cn("space-y-2", mobileHidden)}>
                    <Button onClick={() => setActionDone(true)} disabled={actionDone}>
                      {action.label} (simulated)
                    </Button>
                    {actionDone && (
                      <p role="status" className="rounded-lg border bg-white p-3 text-sm">
                        {action.result}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {run && (
            <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => start(run.id)}>
                <RotateCcw aria-hidden /> Replay
              </Button>
              <Button variant="ghost" onClick={() => setRun(null)}>
                Reset
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
