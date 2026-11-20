"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { parseExclusions, screenSymptoms, type ScreeningOutcome } from "@/features/glow-scan/logic";
import {
  categoryOptions,
  emergencySymptoms,
  goalOptions,
  referralSymptoms,
  routineOptions,
  sensitivityOptions,
  skinFeelOptions,
} from "@/features/glow-scan/options";
import type { GlowScanPreferences } from "@/features/glow-scan/types";
import { naira } from "@/lib/money";
import { cn } from "@/lib/utils";

const list = <T extends z.ZodType>(item: T) =>
  z.preprocess((v) => (Array.isArray(v) ? v : typeof v === "string" ? [v] : []), z.array(item));

/** Unanswered radio groups arrive as null from react-hook-form. */
const optionalChoice = <T extends z.ZodType>(schema: T) => z.preprocess((v) => v ?? undefined, schema.optional());

const symptomValues = [...referralSymptoms, ...emergencySymptoms].map((s) => s.value);

export const questionnaireSchema = z
  .object({
    screening: z.enum(["none", "some"], { error: "Tell us whether any of these apply to you" }),
    symptoms: list(z.enum(symptomValues)),
    skinFeel: optionalChoice(z.enum(skinFeelOptions.map((o) => o.value))),
    goals: list(z.enum(goalOptions.map((o) => o.value))),
    currentProducts: list(z.enum(categoryOptions.map((o) => o.value))),
    sensitivities: list(z.enum(sensitivityOptions.map((o) => o.value))),
    otherExclusions: z.string().max(300, "Use 300 characters or fewer"),
    categories: list(z.enum(categoryOptions.map((o) => o.value))).refine((v) => v.length > 0, {
      message: "Choose at least one type of product",
    }),
    budget: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\d{1,3}(,?\d{3})*$/.test(v), "Enter a whole amount in naira, like 25,000")
      .refine((v) => v === "" || Number(v.replace(/,/g, "")) >= 1_000, "Enter at least ₦1,000, or leave it blank")
      .refine((v) => v === "" || Number(v.replace(/,/g, "")) <= 2_000_000, "Enter ₦2,000,000 or less"),
    routine: optionalChoice(z.enum(routineOptions.map((o) => o.value))),
  })
  .refine((v) => v.screening === "none" || v.symptoms.length > 0, {
    path: ["symptoms"],
    message: "Choose the symptoms that apply, or answer “No” above",
  });

export type QuestionnaireInput = z.input<typeof questionnaireSchema>;
type FormOutput = z.output<typeof questionnaireSchema>;

export function toPreferences(values: FormOutput): GlowScanPreferences {
  return {
    skinFeel: values.skinFeel,
    goals: values.goals,
    currentProducts: values.currentProducts,
    sensitivities: values.sensitivities,
    otherExclusions: parseExclusions(values.otherExclusions),
    categories: values.categories,
    budget: values.budget ? naira(Number(values.budget.replace(/,/g, ""))) : undefined,
    routine: values.routine,
  };
}

const fieldsetClass = "space-y-3 border-t border-line pt-7";
const legendClass = "font-display text-2xl font-medium text-plum";
const chipClass =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-line bg-white px-3 py-2 text-sm has-checked:border-plum has-checked:bg-sand has-focus-visible:outline-2 has-focus-visible:outline-rose";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="text-sm font-medium text-danger">
      {message}
    </p>
  ) : null;
}

export function Questionnaire({
  defaults,
  onComplete,
}: {
  defaults?: Partial<QuestionnaireInput>;
  onComplete: (outcome: ScreeningOutcome, preferences: GlowScanPreferences, answers: QuestionnaireInput) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<QuestionnaireInput, unknown, FormOutput>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      symptoms: [],
      goals: [],
      currentProducts: [],
      sensitivities: [],
      otherExclusions: "",
      categories: [],
      budget: "",
      ...defaults,
    },
  });
  const screening = useWatch({ control, name: "screening" });

  return (
    <form
      noValidate
      aria-label="Glow Scan questions"
      onSubmit={handleSubmit((values) =>
        onComplete(screenSymptoms(values.symptoms), toPreferences(values), getValues()),
      )}
      className="space-y-9"
    >
      <fieldset className="space-y-3" aria-describedby={errors.screening ? "screening-error" : undefined}>
        <legend className={legendClass}>First, a quick safety check</legend>
        <p className="text-sm text-taupe">Are you experiencing any of the following right now?</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
          {[...referralSymptoms, ...emergencySymptoms].map((s) => (
            <li key={s.value}>{s.label}</li>
          ))}
        </ul>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className={chipClass}>
            <input type="radio" value="none" {...register("screening")} className="size-4 accent-plum" />
            No, none of these
          </label>
          <label className={chipClass}>
            <input type="radio" value="some" {...register("screening")} className="size-4 accent-plum" />
            Yes, one or more
          </label>
        </div>
        <FieldError id="screening-error" message={errors.screening?.message} />
        {screening === "some" && (
          <fieldset className="space-y-2 rounded-md bg-sand p-4" aria-describedby={errors.symptoms ? "symptoms-error" : undefined}>
            <legend className="text-sm font-semibold">Which apply?</legend>
            {[...referralSymptoms, ...emergencySymptoms].map((s) => (
              <label key={s.value} className={chipClass}>
                <input type="checkbox" value={s.value} {...register("symptoms")} className="size-4 accent-plum" />
                {s.label}
              </label>
            ))}
            <FieldError id="symptoms-error" message={errors.symptoms?.message} />
          </fieldset>
        )}
      </fieldset>

      <p className="rounded-md border border-line bg-white p-4 text-sm leading-relaxed text-taupe">
        Your answers shape your guidance. A photo can&apos;t tell us about allergies, medical conditions or how your skin
        will react to a product — only you can. Every question below except product type is optional.
      </p>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>How does your skin usually feel?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {skinFeelOptions.map((o) => (
            <label key={o.value} className={chipClass}>
              <input type="radio" value={o.value} {...register("skinFeel")} className="size-4 accent-plum" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>What would you like from your routine?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {goalOptions.map((o) => (
            <label key={o.value} className={chipClass}>
              <input type="checkbox" value={o.value} {...register("goals")} className="size-4 accent-plum" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass} aria-describedby={errors.categories ? "categories-error" : undefined}>
        <legend className={legendClass}>Which products are you looking for?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {categoryOptions.map((o) => (
            <label key={o.value} className={chipClass}>
              <input type="checkbox" value={o.value} {...register("categories")} className="size-4 accent-plum" />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError id="categories-error" message={errors.categories?.message} />
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>What do you use today?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {categoryOptions.map((o) => (
            <label key={o.value} className={chipClass}>
              <input type="checkbox" value={o.value} {...register("currentProducts")} className="size-4 accent-plum" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>Anything your skin reacts to?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {sensitivityOptions.map((o) => (
            <label key={o.value} className={chipClass}>
              <input type="checkbox" value={o.value} {...register("sensitivities")} className="size-4 accent-plum" />
              {o.label}
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 pt-2">
          <label htmlFor="other-exclusions" className="text-sm font-semibold">
            Other ingredients to avoid <span className="font-normal text-taupe">(optional)</span>
          </label>
          <input
            id="other-exclusions"
            {...register("otherExclusions")}
            aria-describedby="other-exclusions-hint"
            aria-invalid={!!errors.otherExclusions}
            className="h-11 rounded-md border border-input bg-white px-3 text-base text-ink focus-visible:border-plum focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
          />
          <p id="other-exclusions-hint" className="text-sm text-taupe">
            Separate with commas, e.g. niacinamide, shea butter.
          </p>
          <FieldError id="other-exclusions-error" message={errors.otherExclusions?.message} />
        </div>
      </fieldset>

      <fieldset className={cn(fieldsetClass, "sm:grid sm:grid-cols-2 sm:gap-8 sm:space-y-0")}>
        <legend className={cn(legendClass, "sm:col-span-2 sm:mb-3")}>Budget and routine</legend>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="budget" className="text-sm font-semibold">
            Total budget in naira <span className="font-normal text-taupe">(optional)</span>
          </label>
          <div className="relative">
            <span aria-hidden className="absolute top-1/2 left-3 -translate-y-1/2 text-taupe">
              ₦
            </span>
            <input
              id="budget"
              inputMode="numeric"
              autoComplete="off"
              {...register("budget")}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? "budget-error" : undefined}
              className="h-11 w-full rounded-md border border-input bg-white pr-3 pl-8 text-base text-ink focus-visible:border-plum focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none aria-invalid:border-danger"
            />
          </div>
          <FieldError id="budget-error" message={errors.budget?.message} />
        </div>
        <fieldset className="mt-5 space-y-2 sm:mt-0">
          <legend className="text-sm font-semibold">
            Routine length <span className="font-normal text-taupe">(optional)</span>
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {routineOptions.map((o) => (
              <label key={o.value} className={cn(chipClass, "flex-col items-start gap-0")}>
                <input type="radio" value={o.value} {...register("routine")} className="sr-only" />
                <span className="font-semibold">{o.label}</span>
                <span className="text-xs text-taupe">{o.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        See my guidance
      </Button>
    </form>
  );
}
