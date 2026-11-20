import type { Metadata } from "next";

import { Container, Eyebrow } from "@/components/marketing/section";
import { SignInForm } from "@/features/forms/auth-forms";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your GlowHub AI workspace.",
  alternates: { canonical: "/sign-in" },
};

export default function SignInPage() {
  return (
    <div className="bg-ivory py-12 sm:py-20">
      <Container className="max-w-lg">
        <Eyebrow>Welcome back</Eyebrow>
        <h1 className="mt-3 mb-8 font-display text-[2.5rem] leading-tight font-medium text-plum">Sign in</h1>
        <SignInForm />
      </Container>
    </div>
  );
}
