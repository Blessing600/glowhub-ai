import type { Metadata } from "next";

import { Container, Eyebrow } from "@/components/marketing/section";
import { RegisterForm } from "@/features/forms/auth-forms";

export const metadata: Metadata = {
  title: "Create a workspace",
  description: "Create your GlowHub AI workspace and start a 14-day Professional trial with no card.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <div className="bg-ivory py-12 sm:py-20">
      <Container className="max-w-lg">
        <Eyebrow>14-day trial · no card needed</Eyebrow>
        <h1 className="mt-3 mb-8 font-display text-[2.5rem] leading-tight font-medium text-plum">Create your workspace</h1>
        <RegisterForm />
      </Container>
    </div>
  );
}
