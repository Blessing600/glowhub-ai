/**
 * Saves a Glow Scan routine in this browser only (localStorage), used while account
 * saving (POST /glow-scan/routines) isn't connected. No photo or personal details are
 * stored: only routine steps and the product names they point to. Every access is
 * guarded because storage can be unavailable (private mode, blocked site data).
 */
import { z } from "zod";

import type { RoutineStep } from "@/features/glow-scan/types";

const KEY = "glowhub.glow-scan.routine.v1";

const savedRoutineSchema = z.object({
  savedAt: z.string(),
  source: z.enum(["sample", "live"]),
  steps: z.array(
    z.object({
      id: z.string(),
      time: z.enum(["morning", "evening"]),
      category: z.enum(["cleanser", "toner", "serum", "moisturiser", "sunscreen", "exfoliant"]),
      note: z.string(),
      productId: z.string().optional(),
      productName: z.string().optional(),
    }),
  ),
});

export type SavedRoutine = z.infer<typeof savedRoutineSchema>;
export type SavedStep = SavedRoutine["steps"][number];

export function loadRoutine(storage: Pick<Storage, "getItem"> | undefined = safeStorage()): SavedRoutine | null {
  try {
    const raw = storage?.getItem(KEY);
    if (!raw) return null;
    const parsed = savedRoutineSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Returns false when the browser refuses to store it. */
export function storeRoutine(
  steps: readonly (RoutineStep & { productName?: string })[],
  source: SavedRoutine["source"],
  storage: Pick<Storage, "setItem"> | undefined = safeStorage(),
  now: Date = new Date(),
): boolean {
  if (!storage) return false;
  const value: SavedRoutine = { savedAt: now.toISOString(), source, steps: steps.map((s) => ({ ...s })) };
  try {
    storage.setItem(KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function clearRoutine(storage: Pick<Storage, "removeItem"> | undefined = safeStorage()) {
  try {
    storage?.removeItem(KEY);
  } catch {
    /* nothing stored, nothing to clear */
  }
}

function safeStorage(): Storage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.localStorage;
  } catch {
    return undefined;
  }
}
