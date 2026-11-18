import { z } from "zod";

const name = z.string().trim().min(2, "Enter your name").max(80, "Use 80 characters or fewer");
const email = z.email("Enter a valid email address, like name@example.com");
const optionalText = (max: number) => z.string().trim().max(max, `Use ${max} characters or fewer`);
/** Optional marketing consent: separate from the request and off by default. */
const marketingConsent = z.boolean();

export const earlyAccessRoles = [
  { value: "retailer", label: "Skincare retailer" },
  { value: "brand", label: "Beauty brand owner" },
  { value: "distributor", label: "Beauty distributor" },
  { value: "professional", label: "Salon, spa or beauty professional" },
  { value: "shopper", label: "Shopper" },
  { value: "other", label: "Something else" },
] as const;

export const earlyAccessSchema = z.object({
  name,
  email,
  role: z.enum(earlyAccessRoles.map((r) => r.value), { error: "Choose what best describes you" }),
  businessName: optionalText(120),
  city: optionalText(80),
  marketingConsent,
});
export type EarlyAccessValues = z.infer<typeof earlyAccessSchema>;

export const contactTopics = [
  { value: "general", label: "General question" },
  { value: "pilot", label: "Pilot programme" },
  { value: "privacy", label: "Privacy" },
  { value: "other", label: "Something else" },
] as const;

export const contactSchema = z.object({
  name,
  email,
  topic: z.enum(contactTopics.map((t) => t.value), { error: "Choose a topic" }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(2000, "Use 2,000 characters or fewer"),
  marketingConsent,
});
export type ContactValues = z.infer<typeof contactSchema>;

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const registerSchema = z.object({
  name,
  email,
  businessName: z.string().trim().min(2, "Enter your business name").max(120, "Use 120 characters or fewer"),
  password: z.string().min(12, "Use at least 12 characters").max(128, "Use 128 characters or fewer"),
  acceptTerms: z.literal(true, { error: "Confirm you accept the terms to continue" }),
  acknowledgePrivacy: z.literal(true, { error: "Confirm you have read the privacy notice to continue" }),
  marketingConsent,
});
export type RegisterValues = z.infer<typeof registerSchema>;
