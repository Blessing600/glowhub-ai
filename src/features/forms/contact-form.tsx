"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  mockSubmit,
  PrototypeNotice,
  SelectField,
  SubmittedPanel,
  TextareaField,
  TextField,
} from "@/features/forms/form-parts";
import { contactSchema, contactTopics, type ContactValues } from "@/features/forms/schemas";

export function ContactForm() {
  const [submitted, setSubmitted] = useState<ContactValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", marketingConsent: false },
  });

  if (submitted) {
    return (
      <SubmittedPanel title="Message checked">
        <p>
          Thanks, {submitted.name}. Your message was valid, but because this is a prototype it was not sent or stored.
        </p>
        <p>Once GlowHub has a confirmed support contact, this form will deliver messages to the team.</p>
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
      <SelectField label="Topic" options={contactTopics} registration={register("topic")} error={errors.topic} />
      <TextareaField
        label="Message"
        hint="Please don't include health details or other sensitive information."
        registration={register("message")}
        error={errors.message}
      />
      <CheckboxField
        label="Also send me occasional GlowHub news. Optional."
        registration={register("marketingConsent")}
        error={errors.marketingConsent}
      />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Checking…" : "Send message"}
      </Button>
    </form>
  );
}
