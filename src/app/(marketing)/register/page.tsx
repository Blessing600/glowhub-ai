import type { Metadata } from "next";

import { Container, Eyebrow } from "@/components/marketing/section";
import { RegisterForm } from "@/features/forms/auth-forms";

export const metadata: Metadata = {
  title: "Create a workspace",
  description: "Create a GlowHub workspace and start a 14-day Professional trial with no card.",
};

export default function RegisterPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <Container className="max-w-lg">
        <Eyebrow>Prototype · 14-day trial, no card</Eyebrow>
        <h1 className="mt-3 mb-6 font-display text-[2.375rem] leading-tight font-semibold">Create your workspace</h1>
        <RegisterForm />
      </Container>
    </div>
  );
}
