import { describe, expect, it } from "vitest";

import { contactSchema, earlyAccessSchema, registerSchema } from "@/features/forms/schemas";

const validEarlyAccess = {
  name: "Ada",
  email: "ada@example.com",
  role: "retailer",
  businessName: "",
  city: "",
  marketingConsent: false,
};

describe("form schemas", () => {
  it("accepts a minimal early-access request without marketing consent", () => {
    expect(earlyAccessSchema.safeParse(validEarlyAccess).success).toBe(true);
  });

  it("rejects an invalid email with a helpful message", () => {
    const result = earlyAccessSchema.safeParse({ ...validEarlyAccess, email: "ada@" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/valid email/);
  });

  it("requires a role", () => {
    expect(earlyAccessSchema.safeParse({ ...validEarlyAccess, role: "" }).success).toBe(false);
  });

  it("requires a meaningful contact message", () => {
    const base = { name: "Ada", email: "ada@example.com", topic: "general", marketingConsent: false };
    expect(contactSchema.safeParse({ ...base, message: "hi" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, message: "When do pilots start?" }).success).toBe(true);
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
