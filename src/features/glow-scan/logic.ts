/**
 * Pure, deterministic Glow Scan rules. These run on any data the backend returns,
 * so a service response can never surface an unavailable product, an excluded
 * ingredient or a price the merchant didn't publish.
 */
import type { EmergencySymptom, ReferralSymptom } from "@/features/glow-scan/options";
import type {
  GlowScanPreferences,
  ProductCategory,
  ProductMatch,
  RoutineStep,
  Sensitivity,
} from "@/features/glow-scan/types";

/* ---------- Safety screening ---------- */

export type ScreeningOutcome = "continue" | "refer" | "urgent";

export function screenSymptoms(symptoms: ReadonlyArray<ReferralSymptom | EmergencySymptom>): ScreeningOutcome {
  if (symptoms.some((s) => s === "breathing" || s === "swelling")) return "urgent";
  if (symptoms.length > 0) return "refer";
  return "continue";
}

/* ---------- Image files ---------- */

export const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"] as const;
export const maxImageBytes = 10 * 1024 * 1024;

export type ImageCheck = { ok: true } | { ok: false; message: string };

export function checkImageFile(file: { type: string; size: number }): ImageCheck {
  if (!(acceptedImageTypes as readonly string[]).includes(file.type)) {
    return { ok: false, message: "Choose a JPEG, PNG, WebP or HEIC photo." };
  }
  if (file.size === 0) return { ok: false, message: "That file is empty. Choose another photo." };
  if (file.size > maxImageBytes) return { ok: false, message: "Choose a photo smaller than 10 MB." };
  return { ok: true };
}

/* ---------- Ingredient exclusions ---------- */

/** INCI fragments that identify each self-reported sensitivity. */
const sensitivityTerms: Record<Sensitivity, readonly string[]> = {
  fragrance: ["parfum", "fragrance", "aroma"],
  "essential-oils": ["essential oil", "lavandula", "citrus aurantium", "mentha piperita", "eucalyptus", "tea tree", "melaleuca"],
  "drying-alcohol": ["alcohol denat", "sd alcohol", "isopropyl alcohol"],
  retinoids: ["retinol", "retinal", "retinyl", "tretinoin", "adapalene"],
  acids: ["glycolic acid", "lactic acid", "salicylic acid", "mandelic acid"],
  "nut-oils": ["prunus amygdalus", "almond", "macadamia", "argania", "corylus", "juglans", "butyrospermum", "shea"],
  lanolin: ["lanolin"],
};

export function exclusionTerms(prefs: Pick<GlowScanPreferences, "sensitivities" | "otherExclusions">) {
  return [
    ...prefs.sensitivities.flatMap((s) => sensitivityTerms[s]),
    ...prefs.otherExclusions.map((t) => t.trim().toLowerCase()).filter(Boolean),
  ];
}

export function parseExclusions(text: string): string[] {
  return [...new Set(text.split(/[,;\n]/).map((t) => t.trim().toLowerCase()).filter((t) => t.length >= 2))];
}

/* ---------- Match constraints ---------- */

export type ExcludedMatch = {
  match: ProductMatch;
  reason: "out-of-stock" | "stock-unknown" | "excluded-ingredient" | "ingredients-unknown" | "over-budget";
  detail?: string;
};

export type ConstrainedMatches = {
  shown: ProductMatch[];
  excluded: ExcludedMatch[];
};

/**
 * Keeps only products that are known to be in stock, contain none of the
 * excluded ingredients (an unknown ingredient list counts as unverifiable when
 * exclusions exist), and fit the budget individually.
 */
export function constrainMatches(matches: readonly ProductMatch[], prefs: GlowScanPreferences): ConstrainedMatches {
  const terms = exclusionTerms(prefs);
  const shown: ProductMatch[] = [];
  const excluded: ExcludedMatch[] = [];

  for (const match of matches) {
    if (match.stock === "out-of-stock") {
      excluded.push({ match, reason: "out-of-stock" });
      continue;
    }
    if (match.stock === "unknown") {
      excluded.push({ match, reason: "stock-unknown" });
      continue;
    }
    if (terms.length > 0) {
      if (!match.ingredients || match.ingredients.length === 0) {
        excluded.push({ match, reason: "ingredients-unknown" });
        continue;
      }
      const hit = match.ingredients.find((ing) => terms.some((t) => ing.toLowerCase().includes(t)));
      if (hit) {
        excluded.push({ match, reason: "excluded-ingredient", detail: hit });
        continue;
      }
    }
    if (prefs.budget && match.price.minor > prefs.budget.minor) {
      excluded.push({ match, reason: "over-budget" });
      continue;
    }
    shown.push(match);
  }
  return { shown, excluded };
}

/* ---------- General order of use ---------- */

const morningOrder: readonly ProductCategory[] = ["cleanser", "toner", "serum", "moisturiser", "sunscreen"];
const eveningOrder: readonly ProductCategory[] = ["cleanser", "exfoliant", "toner", "serum", "moisturiser"];

const stepNotes: Record<ProductCategory, string> = {
  cleanser: "Massage onto damp skin, then rinse.",
  toner: "Apply to clean skin before thicker layers.",
  serum: "A few drops before moisturiser. Introduce one new active at a time.",
  moisturiser: "Seal in hydration while skin is slightly damp.",
  sunscreen: "Last morning step. Use a generous amount and reapply when outdoors.",
  exfoliant: "Two or three evenings a week at most, not every night.",
};

/**
 * General, non-personalised order of use for the chosen product types. It is a
 * layering convention, not a prescription, and carries no product names.
 */
export function generalRoutine(categories: readonly ProductCategory[]): RoutineStep[] {
  const chosen = new Set(categories);
  const steps = (time: RoutineStep["time"], order: readonly ProductCategory[]) =>
    order
      .filter((c) => chosen.has(c) && !(time === "evening" && c === "sunscreen"))
      .map((category) => ({ id: `${time}-${category}`, time, category, note: stepNotes[category] }));
  return [...steps("morning", morningOrder), ...steps("evening", eveningOrder)];
}

export function moveStep(steps: readonly RoutineStep[], id: string, direction: -1 | 1): RoutineStep[] {
  const index = steps.findIndex((s) => s.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= steps.length || steps[target].time !== steps[index].time) {
    return [...steps];
  }
  const next = [...steps];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
