"use client";

import { ArrowLeft, Camera, ListChecks, PhoneCall, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { config } from "@/config/env";
import { CameraCapture } from "@/features/glow-scan/camera-capture";
import type { ScreeningOutcome } from "@/features/glow-scan/logic";
import { Questionnaire, type QuestionnaireInput } from "@/features/glow-scan/questionnaire";
import { GlowScanResults } from "@/features/glow-scan/results";
import { SavedRoutinePanel } from "@/features/glow-scan/saved-routine";
import type { GlowScanPreferences } from "@/features/glow-scan/types";

type Step =
  | { kind: "choose" }
  | { kind: "photo-consent" }
  | { kind: "photo" }
  | { kind: "questions" }
  | { kind: "referral"; outcome: Exclude<ScreeningOutcome, "continue"> }
  | { kind: "results"; prefs: GlowScanPreferences };

const titles: Record<Step["kind"], string> = {
  choose: "How would you like to start?",
  "photo-consent": "Before you add a photo",
  photo: "Your photo preview",
  questions: "Tell us about your skin",
  referral: "Let's pause the product suggestions",
  results: "Your Glow Scan",
};

/**
 * The Glow Scan journey: choose photo or no photo → (consent → local preview) →
 * safety screen + questions → guidance. Photo and no-photo paths lead to the same
 * questions and results; declining a photo loses nothing.
 */
export function GlowScanFlow() {
  const [step, setStep] = useState<Step>({ kind: "choose" });
  const [answers, setAnswers] = useState<QuestionnaireInput | undefined>();
  const [consented, setConsented] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step.kind]);

  const back = (to: Step) => (
    <Button type="button" variant="ghost" className="-ml-3 text-plum" onClick={() => setStep(to)}>
      <ArrowLeft aria-hidden /> Back
    </Button>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-[2rem] leading-tight font-medium text-plum outline-none sm:text-[2.5rem]"
      >
        {titles[step.kind]}
      </h2>

      <div className="mt-8">
        {step.kind === "choose" && <SavedRoutinePanel />}
        {step.kind === "choose" && (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: ListChecks,
                title: "Continue without a photo",
                body: "Answer a few questions about your skin, goals, sensitivities and budget. This is all Glow Scan needs.",
                action: () => setStep({ kind: "questions" }),
                cta: "Answer questions",
                primary: true,
              },
              config.features.cameraPreview && {
                icon: Camera,
                title: "Start with a photo",
                body: "Add a photo from your camera or gallery. It stays on your device as a preview — photo analysis isn't connected.",
                action: () => setStep({ kind: "photo-consent" }),
                cta: "Add a photo",
                primary: false,
              },
            ]
              .filter((option) => option !== false)
              .map(({ icon: Icon, title, body, action, cta, primary }) => (
              <div key={title} className="flex flex-col rounded-lg border border-line bg-white p-6">
                <Icon aria-hidden className="size-6 text-rose" />
                <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-taupe">{body}</p>
                <Button type="button" variant={primary ? "default" : "outline"} className="mt-6 self-start" onClick={action}>
                  {cta}
                </Button>
              </div>
            ))}
          </div>
        )}

        {step.kind === "photo-consent" && (
          <div className="space-y-6">
            {back({ kind: "choose" })}
            <div className="grid gap-6 rounded-lg border border-line bg-white p-6 text-sm leading-relaxed sm:p-8 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-ink">What a photo could help with</h3>
                <p className="mt-1 text-taupe">
                  Once an approved analysis service is connected, a photo may help describe visible, cosmetic features
                  such as apparent shine or surface texture — always with uncertainty shown.
                </p>
                <h3 className="mt-5 font-semibold text-ink">What it can never determine</h3>
                <p className="mt-1 text-taupe">
                  Medical conditions, allergies, age, ethnicity or how your skin will react to a product. Glow Scan
                  never scores skin tone or attractiveness.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink">What happens today</h3>
                <p className="mt-1 text-taupe">
                  Photo analysis is not connected. Your photo is shown only on this device, is not uploaded, stored or
                  analysed, and is deleted when you remove it or leave this page.
                </p>
                <h3 className="mt-5 font-semibold text-ink">When analysis is connected</h3>
                <p className="mt-1 text-taupe">
                  We&apos;ll ask for your separate permission first and tell you who processes the photo and how long
                  it is kept. See our{" "}
                  <Link href="/privacy" className="font-semibold text-plum underline decoration-rose underline-offset-4">
                    privacy notice
                  </Link>
                  .
                </p>
              </div>
            </div>
            <label className="flex min-h-11 items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-plum"
              />
              I understand my photo stays on this device as a preview and is not uploaded or analysed.
            </label>
            <div className="flex flex-wrap gap-3">
              <Button type="button" disabled={!consented} onClick={() => setStep({ kind: "photo" })}>
                Continue to camera
              </Button>
              <Button type="button" variant="outline" onClick={() => setStep({ kind: "questions" })}>
                Continue without a photo
              </Button>
            </div>
          </div>
        )}

        {step.kind === "photo" && (
          <div className="space-y-6">
            {back({ kind: "photo-consent" })}
            <CameraCapture />
            <div className="flex justify-center border-t border-line pt-6">
              <Button type="button" size="lg" onClick={() => setStep({ kind: "questions" })}>
                Continue to questions
              </Button>
            </div>
            <p className="text-center text-xs text-taupe">Continuing deletes the photo preview from this page.</p>
          </div>
        )}

        {step.kind === "questions" && (
          <div className="space-y-6">
            {back({ kind: "choose" })}
            <Questionnaire
              defaults={answers}
              onComplete={(outcome, prefs, raw) => {
                setAnswers(raw);
                setStep(outcome === "continue" ? { kind: "results", prefs } : { kind: "referral", outcome });
              }}
            />
          </div>
        )}

        {step.kind === "referral" && (
          <div
            role="alert"
            className="space-y-4 rounded-lg border-2 border-danger/50 bg-white p-6 text-base leading-relaxed sm:p-8"
          >
            {step.outcome === "urgent" ? (
              <>
                <p className="flex gap-3 font-semibold text-danger">
                  <PhoneCall aria-hidden className="mt-1 size-5 shrink-0" />
                  Difficulty breathing or swallowing, or swelling of the face, lips, tongue or eyes, can be a medical
                  emergency. Get urgent medical help now — call your local emergency number or go to the nearest
                  emergency department.
                </p>
              </>
            ) : (
              <p className="flex gap-3 text-ink">
                <ShieldAlert aria-hidden className="mt-1 size-5 shrink-0 text-danger" />
                What you&apos;ve described needs a qualified healthcare professional, such as a doctor or
                dermatologist, rather than a new skincare product. Glow Scan won&apos;t suggest products for it.
              </p>
            )}
            <p className="text-sm text-taupe">
              If you answered by mistake, you can go back and change your answer.
            </p>
            <Button type="button" variant="outline" onClick={() => setStep({ kind: "questions" })}>
              <ArrowLeft aria-hidden /> Back to questions
            </Button>
          </div>
        )}

        {step.kind === "results" && (
          <GlowScanResults
            prefs={step.prefs}
            onPrefsChange={(prefs) => setStep({ kind: "results", prefs })}
            onEdit={() => setStep({ kind: "questions" })}
          />
        )}
      </div>
    </div>
  );
}
