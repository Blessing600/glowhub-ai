import { describe, expect, it } from "vitest";

import { contactSchema, registerSchema } from "@/features/forms/schemas";

describe("form schemas", () => {
  it("rejects an invalid email with a helpful message", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "ada@",
      topic: "general",
      message: "A question about my account",
      marketingConsent: false,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/valid email/);
  });

  it("requires a meaningful contact message", () => {
    const base = { name: "Ada", email: "ada@example.com", topic: "general", marketingConsent: false };
    expect(contactSchema.safeParse({ ...base, message: "hi" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, message: "How do I import my products?" }).success).toBe(true);
  });

  it("registration needs terms and privacy acknowledgement, but not marketing", () => {
    const base = {
      name: "Ada",
      email: "ada@example.com",
      businessName: "Ada Beauty",
      password: "a-long-passphrase",
      marketingConsent: false,
    };
    expect(registerSchema.safeParse({ ...base, acceptTerms: true, acknowledgePrivacy: true }).success).toBe(true);
    expect(registerSchema.safeParse({ ...base, acceptTerms: false, acknowledgePrivacy: true }).success).toBe(false);
    expect(registerSchema.safeParse({ ...base, acceptTerms: true, acknowledgePrivacy: false }).success).toBe(false);
  });

  it("registration rejects short passwords", () => {
    const result = registerSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      businessName: "Ada Beauty",
      password: "short",
      acceptTerms: true,
      acknowledgePrivacy: true,
      marketingConsent: false,
    });
    expect(result.success).toBe(false);
  });
});
