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
  SelectField,
  SubmittedPanel,
  TextField,
} from "@/features/forms/form-parts";
import { earlyAccessRoles, earlyAccessSchema, type EarlyAccessValues } from "@/features/forms/schemas";

export function EarlyAccessForm() {
  const [submitted, setSubmitted] = useState<EarlyAccessValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EarlyAccessValues>({
    resolver: zodResolver(earlyAccessSchema),
    defaultValues: { name: "", email: "", businessName: "", city: "", marketingConsent: false },
  });

  if (submitted) {
    return (
      <SubmittedPanel title={`Thank you, ${submitted.name}.`}>
        <p>Your entries were valid. Because this is a prototype, your details were not sent or stored anywhere.</p>
        <p>When early access opens for real, this form will add you to the list and confirm by email.</p>
        <p>
          <Link href="/demo" className="font-semibold text-rose-700 underline underline-offset-4">
            Explore the interactive demo
          </Link>
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
      <PrototypeNotice>Prototype form: nothing you enter is sent or stored.</PrototypeNotice>
      <TextField label="Your name" autoComplete="name" registration={register("name")} error={errors.name} />
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
      />
      <SelectField
        label="What best describes you?"
        options={earlyAccessRoles}
        registration={register("role")}
        error={errors.role}
      />
      <TextField
        label="Business name"
        optional
        autoComplete="organization"
        registration={register("businessName")}
        error={errors.businessName}
      />
      <TextField
        label="City"
        optional
        autoComplete="address-level2"
        registration={register("city")}
        error={errors.city}
      />
      <CheckboxField
        label="Also send me occasional GlowHub news. Optional — you can join early access without this."
        registration={register("marketingConsent")}
        error={errors.marketingConsent}
      />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Checking…" : "Request early access"}
      </Button>
    </form>
  );
}
