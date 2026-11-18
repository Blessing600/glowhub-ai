import type { Metadata } from "next";

import { Container, Eyebrow } from "@/components/marketing/section";
import { SignInForm } from "@/features/forms/auth-forms";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your GlowHub workspace.",
};

export default function SignInPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <Container className="max-w-lg">
        <Eyebrow>Prototype</Eyebrow>
        <h1 className="mt-3 mb-6 font-display text-[2.375rem] leading-tight font-semibold">Sign in</h1>
        <SignInForm />
      </Container>
    </div>
  );
}
