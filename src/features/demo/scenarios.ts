/**
 * Scripted, deterministic demo data (brief §5). No live model: every figure is
 * fictional and computed by the same pure functions the product will use.
 * Product names, suppliers and references are invented for the demo.
 */
import { formatMoney, naira, subtract, sum, type Money } from "@/lib/money";
import { reorderQuantity } from "@/lib/reorder";

export type DemoTab = "business" | "shopper";
export type ScenarioId = "stock" | "verification" | "consultation" | "glow-scan";

export type Scenario = {
  id: ScenarioId;
  tab: DemoTab;
  label: string;
  prompt: string;
  /** Progress messages shown while the scripted answer "works". */
  steps: readonly string[];
};

export const scenarios: readonly Scenario[] = [
  {
    id: "stock",
    tab: "business",
    label: "Restock and sales",
    prompt: "Which products should I restock this week, and how can I increase sales?",
    steps: ["Reading stock levels", "Checking 4 weeks of sales", "Checking batch expiry dates"],
  },
  {
    id: "verification",
    tab: "business",
    label: "Check an invoice",
    prompt: "Check this supplier invoice.",
    steps: ["Extracting invoice fields", "Comparing with your catalogue", "Checking evidence completeness"],
  },
  {
    id: "consultation",
    tab: "shopper",
    label: "Routine on a budget",
    prompt: "I have dry, sensitive skin and ₦30,000. What should I use?",
    steps: ["Checking safety questions", "Matching in-stock products", "Building a routine within budget"],
  },
  {
    id: "glow-scan",
    tab: "shopper",
    label: "Glow Scan sample",
    prompt: "Show me how a Glow Scan consultation works.",
    steps: ["Loading the fictional sample image", "Checking sample image quality", "Combining with questionnaire answers"],
  },
];

// ── Business: stock intelligence ───────────────────────────────────────────

export const stockAsOf = "16 Nov 2026";
export const leadReviewDays = 14;

const stockInputs = [
  { product: "Vitamin C Serum 30 ml", available: 4, demandOverPeriod: 24, safetyStock: 4, confirmedIncoming: 0 },
  { product: "SPF 50 Sunscreen 50 ml", available: 6, demandOverPeriod: 20, safetyStock: 4, confirmedIncoming: 0 },
  { product: "Gentle Cleanser 150 ml", available: 8, demandOverPeriod: 16, safetyStock: 4, confirmedIncoming: 0 },
] as const;

export const restockRows = stockInputs.map((row) => ({ ...row, reorder: reorderQuantity(row) }));

export const expiryRisks = [
  {
    product: "Hydrating Toner 200 ml",
    batch: "HT-2405",
    units: 9,
    expires: "31 Dec 2026",
    daysLeft: 45,
    note: "At the current pace about 5 units sell before expiry.",
  },
];

const bundleItems = [
  { product: "Hydrating Toner 200 ml", price: naira(7_000) },
  { product: "Shea Body Butter 250 ml", price: naira(6_500) },
];
const bundleList = sum(bundleItems.map((item) => item.price));
const bundlePrice = naira(12_150);

export const draftBundle = {
  name: "Evening Hydration Duo",
  items: bundleItems.map((item) => ({ ...item, priceLabel: formatMoney(item.price) })),
  listLabel: formatMoney(bundleList),
  priceLabel: formatMoney(bundlePrice),
  savingLabel: formatMoney(subtract(bundleList, bundlePrice)),
  reason: "Moves the toner batch before it expires, paired with a steady seller that has healthy stock.",
};

// ── Business: supplier invoice verification ────────────────────────────────

export type ExtractedField = {
  field: string;
  value: string;
  /** Extraction confidence, 0–100. */
  confidence: number;
  check: "match" | "mismatch" | "needs-correction" | "not-checkable";
  note?: string;
};

export const invoice = {
  supplier: "Lagoon Beauty Supplies (fictional)",
  number: "INV-2026-0187",
  date: "10 Nov 2026",
  line: "Vitamin C Serum × 24",
};

/** Fields below 80% confidence must be corrected by a person (PRD A07). */
export const lowConfidenceThreshold = 80;

export const extractedFields: readonly ExtractedField[] = [
  { field: "Supplier", value: "Lagoon Beauty Supplies", confidence: 98, check: "match", note: "Matches supplier profile" },
  { field: "Product", value: "Vitamin C Serum", confidence: 96, check: "match", note: "Matches catalogue item" },
  {
    field: "Pack size",
    value: "50 ml",
    confidence: 94,
    check: "mismatch",
    note: "Catalogue lists 30 ml for this product",
  },
  { field: "Batch", value: "VCS-2610", confidence: 95, check: "match", note: "Matches batch label photo" },
  { field: "Expiry", value: "Oct 2027", confidence: 91, check: "match", note: "Matches batch label photo" },
  {
    field: "Registration reference",
    value: "DEMO-REG-04?2",
    confidence: 62,
    check: "needs-correction",
    note: "One character unreadable — enter it from the document",
  },
];

// ── Shopper: consultation ──────────────────────────────────────────────────

export const consultationBudget = naira(30_000);

export const consultationProducts: ReadonlyArray<{
  step: string;
  product: string;
  price: Money;
  inStock: number;
  reason: string;
  keyIngredients: string;
}> = [
  {
    step: "Cleanse",
    product: "Gentle Cleanser 150 ml",
    price: naira(8_500),
    inStock: 8,
    reason: "Low-foam, fragrance-free formula listed on the label; suits dry skin that feels tight after washing.",
    keyIngredients: "Glycerin, panthenol",
  },
  {
    step: "Moisturise",
    product: "Barrier Moisturiser 50 ml",
    price: naira(10_500),
    inStock: 11,
    reason: "Rich cream with ingredients commonly used to support the skin barrier.",
    keyIngredients: "Ceramides, shea butter, glycerin",
  },
  {
    step: "Protect",
    product: "SPF 50 Sunscreen 50 ml",
    price: naira(9_000),
    inStock: 6,
    reason: "Daily broad-spectrum protection; label lists no added fragrance.",
    keyIngredients: "Zinc oxide, glycerin",
  },
];

const consultationTotal = sum(consultationProducts.map((p) => p.price));

export const consultationSummary = {
  total: consultationTotal,
  remaining: subtract(consultationBudget, consultationTotal),
};

export const routine = {
  morning: ["Gentle Cleanser", "Barrier Moisturiser", "SPF 50 Sunscreen"],
  evening: ["Gentle Cleanser", "Barrier Moisturiser"],
};

// ── Shopper: Glow Scan sample ──────────────────────────────────────────────

/** Scripted for the fictional sample image only — never shown for a real photo. */
export const glowScanSample = {
  imageQuality: [
    { label: "Lighting", value: "Even (sample)" },
    { label: "Focus", value: "Sharp (sample)" },
    { label: "Framing", value: "Face centred (sample)" },
  ],
  observations: [
    "Some visible dryness on the cheeks",
    "Slight flaking around the nose",
    "No concerns flagged for medical follow-up in the sample answers",
  ],
  questionnaire: [
    { question: "Main goal", answer: "Comfortable, less tight skin" },
    { question: "Sensitivity", answer: "Stings with some products" },
    { question: "Known allergies", answer: "None listed" },
    { question: "Budget", answer: "Up to ₦30,000" },
  ],
  priorities: ["Hydration", "Gentle cleansing", "Daily sun protection"],
  categories: ["Low-foam cleanser", "Barrier moisturiser", "Broad-spectrum sunscreen"],
};

/**
 * Illustrative Glow Scan indicators for marketing visuals. Sample values only:
 * not produced by any analysis, never attributed to a real person or photo, and
 * always shown with an "illustrative, not from this photo" label. No glow,
 * attractiveness or skin-tone score — those are out of scope by policy.
 */
export const glowScanIllustrativeIndicators: ReadonlyArray<{ label: string; value: number; note: string }> = [
  { label: "Hydration", value: 58, note: "Moderate" },
  { label: "Pores", value: 70, note: "Balanced" },
  { label: "Redness", value: 22, note: "Low" },
  { label: "Texture", value: 76, note: "Smooth" },
  { label: "Barrier strength", value: 46, note: "Needs support" },
];
