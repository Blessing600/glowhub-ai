/**
 * Glow Scan domain types — the frontend side of the contract in
 * docs/frontend-api-contracts.md §Glow Scan. Endpoint names are proposals to agree
 * with the backend team; nothing here implies a live service exists.
 */
import type { Money } from "@/lib/money";

export type SkinFeel = "dry" | "oily" | "combination" | "normal" | "sensitive" | "not-sure";
export type SkinGoal =
  | "hydration"
  | "oil-balance"
  | "even-looking-tone"
  | "smoother-texture"
  | "sun-protection"
  | "gentle-routine";
export type ProductCategory = "cleanser" | "toner" | "serum" | "moisturiser" | "sunscreen" | "exfoliant";
export type RoutinePreference = "minimal" | "balanced" | "complete";
export type Sensitivity =
  | "fragrance"
  | "essential-oils"
  | "drying-alcohol"
  | "retinoids"
  | "acids"
  | "nut-oils"
  | "lanolin";

/** Self-reported answers. Every field except categories is optional. */
export type GlowScanPreferences = {
  skinFeel?: SkinFeel;
  goals: SkinGoal[];
  currentProducts: ProductCategory[];
  sensitivities: Sensitivity[];
  /** Free-text ingredients the shopper wants excluded, lower-cased and trimmed. */
  otherExclusions: string[];
  categories: ProductCategory[];
  /** Total budget for the suggested products. */
  budget?: Money;
  routine?: RoutinePreference;
};

/** Recorded only when image processing is actually enabled and the user opts in. */
export type ConsentRecord = {
  purpose: "glow-scan-image-analysis";
  policyVersion: string;
  grantedAt: string;
  /** Retention the user agreed to, as stated in the policy. */
  retention: "delete-after-analysis";
};

export type GlowScanRequest = {
  preferences: GlowScanPreferences;
  /** Present only with a ConsentRecord and an approved backend destination. */
  image?: { contentType: string; consent: ConsentRecord };
  /** Participating merchant whose catalogue to match against, if any. */
  merchantId?: string;
};

/** A cautious, non-medical appearance note. Never a diagnosis or score. */
export type CosmeticObservation = {
  label: string;
  description: string;
  confidence: "low" | "medium" | "high";
  method: string;
};

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "unknown";

/** A product from an authorised merchant catalogue. Never invented by the frontend. */
export type ProductMatch = {
  id: string;
  name: string;
  brand: string;
  merchant: string;
  category: ProductCategory;
  price: Money;
  imageUrl?: string;
  stock: StockStatus;
  /** Full ingredient list as published by the merchant, if available. */
  ingredients?: string[];
  reasons: string[];
  cautions: string[];
};

export type RoutineStep = {
  id: string;
  time: "morning" | "evening";
  category: ProductCategory;
  note: string;
  productId?: string;
};

export type GlowScanResult = {
  requestId: string;
  observations: CosmeticObservation[];
  matches: ProductMatch[];
  routine: RoutineStep[];
  /** Fields the service could not use or information it lacked. */
  missingInformation: string[];
};
