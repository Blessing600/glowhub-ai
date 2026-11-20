import { z } from "zod";

import type { GlowScanRequest, GlowScanResult, RoutineStep } from "@/features/glow-scan/types";
import { apiRequest, notConnected, type ServiceResult } from "@/services/api-client";

/**
 * Glow Scan adapter. Proposed contract: docs/frontend-api-contracts.md §Glow Scan.
 *
 * Photo analysis is locked off (NEXT_PUBLIC_LIVE_SCAN_ENABLED) until its release
 * gates are met, so `analysePhoto` never transmits an image from this build.
 */

const money = z.object({ minor: z.number().int().nonnegative(), currency: z.literal("NGN") });
const category = z.enum(["cleanser", "toner", "serum", "moisturiser", "sunscreen", "exfoliant"]);

const resultSchema = z.object({
  requestId: z.string(),
  observations: z.array(
    z.object({
      label: z.string(),
      description: z.string(),
      confidence: z.enum(["low", "medium", "high"]),
      method: z.string(),
    }),
  ),
  matches: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      brand: z.string(),
      merchant: z.string(),
      category,
      price: money,
      imageUrl: z.url().optional(),
      stock: z.enum(["in-stock", "low-stock", "out-of-stock", "unknown"]),
      ingredients: z.array(z.string()).optional(),
      reasons: z.array(z.string()),
      cautions: z.array(z.string()),
    }),
  ),
  routine: z.array(
    z.object({
      id: z.string(),
      time: z.enum(["morning", "evening"]),
      category,
      note: z.string(),
      productId: z.string().optional(),
    }),
  ),
  missingInformation: z.array(z.string()),
});

export function requestRecommendations(
  request: Omit<GlowScanRequest, "image">,
  signal?: AbortSignal,
): Promise<ServiceResult<GlowScanResult>> {
  return apiRequest("/glow-scan/recommendations", {
    body: request,
    signal,
    timeoutMs: 20_000,
    parse: (json) => resultSchema.parse(json),
  });
}

/**
 * Always "not-connected" in this build: no image leaves the device. The consented
 * upload is implemented here only once live scan's release gates are met.
 */
export async function analysePhoto(): Promise<ServiceResult<GlowScanResult>> {
  return notConnected;
}

export function saveRoutine(steps: readonly RoutineStep[]): Promise<ServiceResult<{ routineId: string }>> {
  return apiRequest("/glow-scan/routines", {
    body: { steps },
    parse: (json) => z.object({ routineId: z.string() }).parse(json),
  });
}
