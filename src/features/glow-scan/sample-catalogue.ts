/**
 * Glow Scan SAMPLE catalogue — illustrative, unbranded products used only while no
 * merchant catalogue is connected (see docs/frontend-api-contracts.md §Glow Scan).
 *
 * These are not real products, merchants, prices or stock. Every screen that shows
 * them labels them "Sample catalogue". Matching runs the same pure rules a live
 * catalogue will (constrainMatches), so the experience is real even though the
 * catalogue is not. Replace with the backend response once it exists.
 */
import { constrainMatches, generalRoutine } from "@/features/glow-scan/logic";
import { categoryOptions, goalOptions, labelFor } from "@/features/glow-scan/options";
import type {
  GlowScanPreferences,
  GlowScanResult,
  ProductCategory,
  ProductMatch,
  RoutineStep,
  SkinFeel,
  SkinGoal,
} from "@/features/glow-scan/types";
import { formatMoney, naira, sum } from "@/lib/money";

export const SAMPLE_MERCHANT = "GlowHub sample catalogue";
export const SAMPLE_BRAND = "Sample";

type SampleProduct = Omit<ProductMatch, "reasons" | "brand" | "merchant" | "ingredients"> & {
  ingredients: readonly string[];
  suits: readonly SkinFeel[];
  goals: readonly SkinGoal[];
  /** Ingredient that delivers each goal, used to explain the match. */
  because: Partial<Record<SkinGoal, string>>;
};

const allFeels: readonly SkinFeel[] = ["dry", "oily", "combination", "normal", "sensitive", "not-sure"];

export const sampleCatalogue: readonly SampleProduct[] = [
  {
    id: "s-gel-cleanser",
    name: "Gentle Gel Cleanser",
    category: "cleanser",
    price: naira(6_500),
    stock: "in-stock",
    ingredients: ["aqua", "glycerin", "coco-glucoside", "panthenol", "allantoin"],
    suits: ["oily", "combination", "normal", "sensitive", "not-sure"],
    goals: ["gentle-routine", "oil-balance"],
    because: { "gentle-routine": "mild coco-glucoside cleansers", "oil-balance": "a low-residue gel texture" },
    cautions: [],
  },
  {
    id: "s-cream-cleanser",
    name: "Cream Cleanser",
    category: "cleanser",
    price: naira(7_200),
    stock: "in-stock",
    ingredients: ["aqua", "glycerin", "cetearyl alcohol", "butyrospermum parkii butter", "ceramide np", "parfum"],
    suits: ["dry", "normal"],
    goals: ["hydration"],
    because: { hydration: "shea butter and ceramides" },
    cautions: ["Contains fragrance."],
  },
  {
    id: "s-hydrating-toner",
    name: "Hydrating Toner",
    category: "toner",
    price: naira(5_800),
    stock: "in-stock",
    ingredients: ["aqua", "glycerin", "sodium hyaluronate", "panthenol"],
    suits: allFeels,
    goals: ["hydration", "gentle-routine"],
    because: { hydration: "sodium hyaluronate", "gentle-routine": "a short, fragrance-free formula" },
    cautions: [],
  },
  {
    id: "s-balancing-toner",
    name: "Balancing Toner",
    category: "toner",
    price: naira(6_200),
    stock: "low-stock",
    ingredients: ["aqua", "niacinamide", "zinc pca", "hamamelis virginiana water", "alcohol denat."],
    suits: ["oily", "combination"],
    goals: ["oil-balance", "smoother-texture"],
    because: { "oil-balance": "niacinamide and zinc PCA", "smoother-texture": "niacinamide" },
    cautions: ["Contains drying alcohol; skip it if your skin feels tight afterwards."],
  },
  {
    id: "s-niacinamide-serum",
    name: "Niacinamide Serum",
    category: "serum",
    price: naira(9_500),
    stock: "in-stock",
    ingredients: ["aqua", "niacinamide", "glycerin", "zinc pca", "panthenol"],
    suits: ["oily", "combination", "normal", "not-sure"],
    goals: ["oil-balance", "even-looking-tone", "smoother-texture"],
    because: {
      "oil-balance": "niacinamide and zinc PCA",
      "even-looking-tone": "niacinamide",
      "smoother-texture": "niacinamide",
    },
    cautions: ["Start every other day if your skin is easily irritated."],
  },
  {
    id: "s-vitamin-c-serum",
    name: "Vitamin C Serum",
    category: "serum",
    price: naira(14_500),
    stock: "in-stock",
    ingredients: ["aqua", "ascorbic acid", "ferulic acid", "tocopherol", "glycerin"],
    suits: ["dry", "oily", "combination", "normal"],
    goals: ["even-looking-tone"],
    because: { "even-looking-tone": "vitamin C (ascorbic acid)" },
    cautions: ["Use in the morning under sunscreen. May tingle at first."],
  },
  {
    id: "s-hyaluronic-serum",
    name: "Hyaluronic Serum",
    category: "serum",
    price: naira(8_800),
    stock: "out-of-stock",
    ingredients: ["aqua", "sodium hyaluronate", "glycerin", "panthenol"],
    suits: allFeels,
    goals: ["hydration"],
    because: { hydration: "sodium hyaluronate" },
    cautions: [],
  },
  {
    id: "s-rich-moisturiser",
    name: "Rich Moisturiser",
    category: "moisturiser",
    price: naira(11_000),
    stock: "in-stock",
    ingredients: ["aqua", "butyrospermum parkii butter", "glycerin", "ceramide np", "squalane", "cholesterol"],
    suits: ["dry", "normal"],
    goals: ["hydration", "gentle-routine"],
    because: { hydration: "shea butter, squalane and ceramides", "gentle-routine": "a fragrance-free formula" },
    cautions: [],
  },
  {
    id: "s-gel-moisturiser",
    name: "Light Gel Moisturiser",
    category: "moisturiser",
    price: naira(9_000),
    stock: "in-stock",
    ingredients: ["aqua", "glycerin", "sodium hyaluronate", "niacinamide", "allantoin"],
    suits: ["oily", "combination", "normal", "sensitive", "not-sure"],
    goals: ["hydration", "oil-balance"],
    because: { hydration: "glycerin and sodium hyaluronate", "oil-balance": "a light, oil-free gel" },
    cautions: [],
  },
  {
    id: "s-barrier-cream",
    name: "Fragrance-free Barrier Cream",
    category: "moisturiser",
    price: naira(12_500),
    stock: "low-stock",
    ingredients: ["aqua", "glycerin", "ceramide np", "colloidal oatmeal", "panthenol"],
    suits: ["sensitive", "dry"],
    goals: ["gentle-routine", "hydration"],
    because: { "gentle-routine": "colloidal oatmeal, fragrance-free", hydration: "ceramides and glycerin" },
    cautions: [],
  },
  {
    id: "s-mineral-spf",
    name: "Sheer Mineral Sunscreen SPF 50",
    category: "sunscreen",
    price: naira(13_500),
    stock: "in-stock",
    ingredients: ["aqua", "zinc oxide", "glycerin", "tocopherol"],
    suits: allFeels,
    goals: ["sun-protection"],
    because: { "sun-protection": "zinc oxide, SPF 50" },
    cautions: ["Rub in well; mineral filters can leave a light cast."],
  },
  {
    id: "s-gel-spf",
    name: "Invisible Gel Sunscreen SPF 50",
    category: "sunscreen",
    price: naira(11_500),
    stock: "in-stock",
    ingredients: [
      "aqua",
      "ethylhexyl methoxycinnamate",
      "bis-ethylhexyloxyphenol methoxyphenyl triazine",
      "glycerin",
      "alcohol denat.",
      "parfum",
    ],
    suits: ["oily", "combination", "normal"],
    goals: ["sun-protection"],
    because: { "sun-protection": "broad-spectrum filters, SPF 50" },
    cautions: ["Contains fragrance and drying alcohol."],
  },
  {
    id: "s-lactic-exfoliant",
    name: "Gentle Lactic Exfoliant",
    category: "exfoliant",
    price: naira(10_500),
    stock: "in-stock",
    ingredients: ["aqua", "lactic acid", "glycerin", "panthenol"],
    suits: ["dry", "normal", "combination"],
    goals: ["smoother-texture", "even-looking-tone"],
    because: { "smoother-texture": "lactic acid", "even-looking-tone": "lactic acid" },
    cautions: ["Contains an acid: two or three evenings a week at most, and wear sunscreen daily."],
  },
  {
    id: "s-bha-exfoliant",
    name: "Clarifying BHA Exfoliant",
    category: "exfoliant",
    price: naira(9_800),
    stock: "unknown",
    ingredients: ["aqua", "salicylic acid", "niacinamide", "glycerin"],
    suits: ["oily", "combination"],
    goals: ["oil-balance", "smoother-texture"],
    because: { "oil-balance": "salicylic acid", "smoother-texture": "salicylic acid" },
    cautions: ["Contains an acid: start twice a week and wear sunscreen daily."],
  },
];

const feelReason: Record<Exclude<SkinFeel, "not-sure">, string> = {
  dry: "Suits skin that often feels dry or tight.",
  oily: "Suits skin that often feels oily.",
  combination: "Suits combination skin.",
  normal: "Suits skin that's usually comfortable.",
  sensitive: "Gentle enough for skin that reacts easily.",
};

function score(p: SampleProduct, prefs: GlowScanPreferences) {
  const goalHits = prefs.goals.filter((g) => p.goals.includes(g)).length;
  const feelHit = prefs.skinFeel && p.suits.includes(prefs.skinFeel) ? 1 : 0;
  return goalHits * 2 + feelHit;
}

function toMatch(p: SampleProduct, prefs: GlowScanPreferences): ProductMatch {
  const reasons: string[] = [];
  if (prefs.skinFeel && prefs.skinFeel !== "not-sure" && p.suits.includes(prefs.skinFeel)) {
    reasons.push(feelReason[prefs.skinFeel]);
  }
  for (const g of prefs.goals) {
    if (p.goals.includes(g) && p.because[g]) {
      reasons.push(`For ${labelFor(goalOptions, g).toLowerCase()}: ${p.because[g]}.`);
    }
  }
  if (reasons.length === 0) reasons.push("Fits the product type you asked for.");
  return {
    id: p.id,
    name: p.name,
    brand: SAMPLE_BRAND,
    merchant: SAMPLE_MERCHANT,
    category: p.category,
    price: p.price,
    stock: p.stock,
    ingredients: [...p.ingredients],
    reasons,
    cautions: [...p.cautions],
  };
}

/**
 * Deterministic recommendations from the sample catalogue: candidates for each
 * requested category ranked by goal and skin-feel fit, constrained by the same rules
 * as a live catalogue, with a routine built from the best remaining pick per step.
 */
export function recommendFromSample(prefs: GlowScanPreferences): GlowScanResult {
  const wanted = new Set<ProductCategory>(prefs.categories);
  const candidates = sampleCatalogue
    .filter((p) => wanted.has(p.category))
    .map((p) => ({ p, s: score(p, prefs) }))
    .sort((a, b) => b.s - a.s || a.p.price.minor - b.p.price.minor)
    .map(({ p }) => toMatch(p, prefs));

  const { shown } = constrainMatches(candidates, prefs);
  const pick = new Map<ProductCategory, ProductMatch>();
  for (const m of shown) if (!pick.has(m.category)) pick.set(m.category, m);

  const routine: RoutineStep[] = generalRoutine(prefs.categories)
    .filter((step) => pick.has(step.category))
    .map((step) => ({ ...step, productId: pick.get(step.category)!.id }));

  const missingInformation: string[] = [];
  const unmatched = prefs.categories.filter((c) => !pick.has(c));
  if (unmatched.length) {
    missingInformation.push(
      `Nothing in the catalogue fits your answers for: ${unmatched.map((c) => labelFor(categoryOptions, c).toLowerCase()).join(", ")}. Try a higher budget or fewer exclusions.`,
    );
  }
  const total = sum([...pick.values()].map((m) => m.price));
  if (prefs.budget && pick.size > 1 && total.minor > prefs.budget.minor) {
    missingInformation.push(
      `Together, the routine picks cost ${formatMoney(total)}, above your ${formatMoney(prefs.budget)} budget. Remove a step or choose cheaper alternatives.`,
    );
  }

  return { requestId: "sample", observations: [], matches: candidates, routine, missingInformation };
}
