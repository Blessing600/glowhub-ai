"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CheckboxField, ServiceNotice, TextField } from "@/features/forms/form-parts";
import {
  registerSchema,
  signInSchema,
  type RegisterValues,
  type SignInValues,
} from "@/features/forms/schemas";
import { registerAccount, signIn } from "@/services/accounts";

const linkClass = "font-semibold text-plum underline decoration-rose underline-offset-4";
const formClass = "space-y-5 rounded-lg border border-line bg-white p-5 sm:p-7";

type Outcome = "not-connected" | "error" | null;

export function SignInForm() {
  const router = useRouter();
  const [outcome, setOutcome] = useState<Outcome>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "" } });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        const result = await signIn(values);
        if (result.status === "ok") return router.push(result.data.redirectTo);
        setOutcome(result.status);
      })}
      className={formClass}
    >
      {outcome && <ServiceNotice outcome={outcome} feature="Sign-in" />}
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
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-taupe">
        New to GlowHub?{" "}
        <Link href="/register" className={linkClass}>
          Create your workspace
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [outcome, setOutcome] = useState<Outcome>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", businessName: "", password: "", marketingConsent: false },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        const result = await registerAccount(values);
        if (result.status === "ok") return router.push(result.data.redirectTo);
        setOutcome(result.status);
      })}
      className={formClass}
    >
      {outcome && (
        <ServiceNotice outcome={outcome} feature="Account creation">
          {outcome === "not-connected" ? (
            <>
              No account was created and nothing was sent or stored. Your entries are still here. To get set up now,{" "}
              <Link href="/contact" className={linkClass}>
                contact our team
              </Link>
              .
            </>
          ) : undefined}
        </ServiceNotice>
      )}
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
          label={
            <>
              I accept the{" "}
              <Link href="/terms" className={linkClass}>
                Terms of Service
              </Link>
              .
            </>
          }
          registration={register("acceptTerms")}
          error={errors.acceptTerms}
        />
        <CheckboxField
          label={
            <>
              I have read the{" "}
              <Link href="/privacy" className={linkClass}>
                Privacy Notice
              </Link>
              .
            </>
          }
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
        {isSubmitting ? "Creating workspace…" : "Create workspace"}
      </Button>
      <p className="text-sm text-taupe">
        Already have an account?{" "}
        <Link href="/sign-in" className={linkClass}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
