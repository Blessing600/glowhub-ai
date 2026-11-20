"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { categoryOptions, labelFor } from "@/features/glow-scan/options";
import { clearRoutine, loadRoutine, type SavedRoutine } from "@/features/glow-scan/routine-store";

/**
 * The routine saved in this browser, if any. Read after mount so server and client
 * render the same markup; nothing renders when storage is empty or unavailable.
 */
export function SavedRoutinePanel() {
  const [routine, setRoutine] = useState<SavedRoutine | null>(null);

  useEffect(() => {
    // Browser storage is only readable after hydration.
    setRoutine(loadRoutine());
  }, []);

  if (!routine || routine.steps.length === 0) return null;

  const saved = new Date(routine.savedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section aria-labelledby="saved-routine-heading" className="mb-10 rounded-lg border border-line bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 id="saved-routine-heading" className="font-display text-2xl text-plum">
          Your saved routine
        </h3>
        <p className="text-sm text-taupe">Saved on this device · {saved}</p>
      </div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        {(["morning", "evening"] as const).map((time) => {
          const steps = routine.steps.filter((s) => s.time === time);
          return (
            <div key={time}>
              <h4 className="font-display text-lg text-plum italic">{time === "morning" ? "Morning" : "Evening"}</h4>
              {steps.length === 0 ? (
                <p className="mt-2 text-sm text-taupe">No steps.</p>
              ) : (
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  {steps.map((s) => (
                    <li key={s.id}>
                      <span className="font-semibold">{labelFor(categoryOptions, s.category)}</span>
                      {s.productName && <span className="text-taupe"> · {s.productName}</span>}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          );
        })}
      </div>
      {routine.source === "sample" && (
        <p className="mt-4 text-xs text-taupe">Products are from the sample catalogue and aren&apos;t for sale.</p>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-5 h-11"
        onClick={() => {
          clearRoutine();
          setRoutine(null);
        }}
      >
        Delete saved routine
      </Button>
    </section>
  );
}
