import type {
  ProductCategory,
  RoutinePreference,
  Sensitivity,
  SkinFeel,
  SkinGoal,
} from "@/features/glow-scan/types";

type Option<T extends string> = { value: T; label: string; hint?: string };

export const skinFeelOptions: readonly Option<SkinFeel>[] = [
  { value: "dry", label: "Often feels dry or tight" },
  { value: "oily", label: "Often feels oily or shiny" },
  { value: "combination", label: "Oily in some areas, dry in others" },
  { value: "normal", label: "Usually comfortable" },
  { value: "sensitive", label: "Reacts easily to products" },
  { value: "not-sure", label: "Not sure" },
];

export const goalOptions: readonly Option<SkinGoal>[] = [
  { value: "hydration", label: "More hydrated, comfortable skin" },
  { value: "oil-balance", label: "Less shine through the day" },
  { value: "even-looking-tone", label: "A more even-looking tone" },
  { value: "smoother-texture", label: "Smoother-feeling texture" },
  { value: "sun-protection", label: "Daily sun protection" },
  { value: "gentle-routine", label: "A simple, gentle routine" },
];

export const categoryOptions: readonly Option<ProductCategory>[] = [
  { value: "cleanser", label: "Cleanser" },
  { value: "toner", label: "Toner" },
  { value: "serum", label: "Serum" },
  { value: "moisturiser", label: "Moisturiser or face cream" },
  { value: "sunscreen", label: "Sunscreen" },
  { value: "exfoliant", label: "Exfoliant" },
];

export const sensitivityOptions: readonly Option<Sensitivity>[] = [
  { value: "fragrance", label: "Fragrance or parfum" },
  { value: "essential-oils", label: "Essential oils" },
  { value: "drying-alcohol", label: "Drying alcohol (alcohol denat.)" },
  { value: "retinoids", label: "Retinoids (retinol, retinal)" },
  { value: "acids", label: "Exfoliating acids (AHA, BHA)" },
  { value: "nut-oils", label: "Nut oils" },
  { value: "lanolin", label: "Lanolin" },
];

export const routineOptions: readonly Option<RoutinePreference>[] = [
  { value: "minimal", label: "Minimal", hint: "2–3 steps" },
  { value: "balanced", label: "Balanced", hint: "3–4 steps" },
  { value: "complete", label: "Complete", hint: "5 or more steps" },
];

/** Symptoms that stop product suggestions and refer to qualified care. */
export const referralSymptoms = [
  { value: "pain", label: "Pain, burning or bleeding" },
  { value: "spreading-rash", label: "A rash that is spreading or getting worse" },
  { value: "infection", label: "Pus, crusting, fever or other signs of infection" },
  { value: "persistent", label: "A skin problem that has lasted several weeks without improving" },
  { value: "changing-mole", label: "A mole or spot that is changing, bleeding or new" },
] as const;

/** Signs that need urgent medical help, not a skincare routine. */
export const emergencySymptoms = [
  { value: "breathing", label: "Difficulty breathing or swallowing" },
  { value: "swelling", label: "Swelling of the face, lips, tongue or eyes" },
] as const;

export type ReferralSymptom = (typeof referralSymptoms)[number]["value"];
export type EmergencySymptom = (typeof emergencySymptoms)[number]["value"];

export function labelFor<T extends string>(options: readonly Option<T>[], value: T) {
  return options.find((o) => o.value === value)?.label ?? value;
}
