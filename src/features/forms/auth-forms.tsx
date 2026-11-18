"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  mockSubmit,
  PrototypeNotice,
  SubmittedPanel,
  TextField,
} from "@/features/forms/form-parts";
import {
  registerSchema,
  signInSchema,
  type RegisterValues,
  type SignInValues,
} from "@/features/forms/schemas";

const linkClass = "font-semibold text-rose-700 underline underline-offset-4";

/** No production authentication in the prototype (brief §1): validates, then explains. */
export function SignInForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "" } });

  if (submitted) {
    return (
      <SubmittedPanel title="No accounts yet">
        <p>
          GlowHub is pre-launch, so there are no real accounts and nothing was checked or stored. Your password never
          left this page.
        </p>
        <p>
          <Link href="/demo" className={linkClass}>
            See GlowHub in action
          </Link>{" "}
          or{" "}
          <Link href="/early-access" className={linkClass}>
            join early access
          </Link>
          .
        </p>
      </SubmittedPanel>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await mockSubmit();
        setSubmitted(true);
      })}
      className="space-y-5 rounded-xl border bg-cream p-5 sm:p-6"
    >
      <PrototypeNotice>Prototype: sign-in is not connected. Don&apos;t use a real password.</PrototypeNotice>
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        registration={register("password")}
        error={errors.password}
      />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Checking…" : "Sign in"}
      </Button>
      <p className="text-sm text-plum-600">
        New to GlowHub?{" "}
        <Link href="/register" className={linkClass}>
          Create a workspace
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [submitted, setSubmitted] = useState<RegisterValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", businessName: "", password: "", marketingConsent: false },
  });

  if (submitted) {
    return (
      <SubmittedPanel title="Workspace not created — prototype">
        <p>
          Thanks, {submitted.name}. Your entries were valid, but GlowHub is pre-launch: no account or workspace was
          created and nothing was stored.
        </p>
        <p>
          At launch this step will verify your email and start a 14-day Professional trial with no card required.{" "}
          <Link href="/early-access" className={linkClass}>
            Join early access
          </Link>{" "}
          to hear when it opens.
        </p>
      </SubmittedPanel>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await mockSubmit();
        setSubmitted(values);
      })}
      className="space-y-5 rounded-xl border bg-cream p-5 sm:p-6"
    >
      <PrototypeNotice>Prototype: registration is not connected. Don&apos;t use a real password.</PrototypeNotice>
      <TextField label="Your name" autoComplete="name" registration={register("name")} error={errors.name} />
      <TextField
        label="Work email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
      />
      <TextField
        label="Business name"
        autoComplete="organization"
        registration={register("businessName")}
        error={errors.businessName}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 12 characters. A short phrase is easier to remember."
        registration={register("password")}
        error={errors.password}
      />
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">Agreements</legend>
        <CheckboxField
          label="I accept the Terms of Service (draft for legal review)."
          registration={register("acceptTerms")}
          error={errors.acceptTerms}
        />
        <CheckboxField
          label="I have read the Privacy Notice (draft for legal review)."
          registration={register("acknowledgePrivacy")}
          error={errors.acknowledgePrivacy}
        />
        <CheckboxField
          label="Send me occasional GlowHub news. Optional."
          registration={register("marketingConsent")}
          error={errors.marketingConsent}
        />
      </fieldset>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Checking…" : "Start 14-day trial"}
      </Button>
      <p className="text-sm text-plum-600">
        Already have an account?{" "}
        <Link href="/sign-in" className={linkClass}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
