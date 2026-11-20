"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  SelectField,
  ServiceNotice,
  SubmittedPanel,
  TextareaField,
  TextField,
} from "@/features/forms/form-parts";
import { contactSchema, contactTopics, type ContactValues } from "@/features/forms/schemas";
import { sendSupportMessage } from "@/services/accounts";

export function ContactForm({ supportEmail }: { supportEmail?: string }) {
  const [sent, setSent] = useState<{ name: string; reference: string } | null>(null);
  const [outcome, setOutcome] = useState<"not-connected" | "error" | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", marketingConsent: false },
  });

  if (sent) {
    return (
      <SubmittedPanel title="Message sent">
        <p>
          Thanks, {sent.name}. Your reference is <strong className="text-ink">{sent.reference}</strong>.
        </p>
      </SubmittedPanel>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values: ContactValues) => {
        const result = await sendSupportMessage(values);
        if (result.status === "ok") return setSent({ name: values.name, reference: result.data.reference });
        setOutcome(result.status);
      })}
      className="space-y-5 rounded-lg border border-line bg-white p-5 sm:p-7"
    >
      {outcome && (
        <ServiceNotice outcome={outcome} feature="Online messaging">
          {supportEmail ? (
            <>
              Your message was not sent. Please email{" "}
              <a href={`mailto:${supportEmail}`} className="font-semibold text-plum underline underline-offset-4">
                {supportEmail}
              </a>{" "}
              instead — your entries are still here to copy.
            </>
          ) : undefined}
        </ServiceNotice>
      )}
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
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
