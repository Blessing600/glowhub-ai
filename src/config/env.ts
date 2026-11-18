import { z } from "zod";

/**
 * Runtime configuration. Only NEXT_PUBLIC_* values reach the browser, so this
 * file must never read secrets. See .env.example for documentation.
 */

const bool = (fallback: boolean) =>
  z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? fallback : v === "true"));

/**
 * Features that stay off until their production gates are met
 * (brief §1 and §16). Setting one to "true" fails fast instead of
 * pretending a live integration exists.
 */
const lockedOff = (feature: string, gate: string) =>
  z
    .enum(["true", "false"])
    .optional()
    .refine((v) => v !== "true", {
      message: `${feature} cannot be enabled in the frontend prototype. See ${gate}.`,
    })
    .transform(() => false as const);

/** Empty strings in .env files mean "not configured". */
const optionalText = z
  .string()
  .optional()
  .transform((v) => (v && v.trim() !== "" ? v.trim() : undefined));

export const envSchema = z.object({
  NEXT_PUBLIC_DEPLOY_ENV: z.enum(["local", "staging", "production"]).default("local"),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: optionalText,
  NEXT_PUBLIC_ALLOW_INDEXING: bool(false),
  NEXT_PUBLIC_DEMO_MODE: bool(true),
  NEXT_PUBLIC_CAMERA_PREVIEW_ENABLED: bool(true),
  NEXT_PUBLIC_LIVE_SCAN_ENABLED: lockedOff("Live Glow Scan analysis", "docs/glow-scan-release-gates.md"),
  NEXT_PUBLIC_MARKETPLACE_ENABLED: lockedOff("The multi-vendor marketplace", "PRD §9 marketplace operational gates"),
  NEXT_PUBLIC_PAYMENTS_ENABLED: lockedOff("Live payments", "docs/integration-contracts.md"),
  NEXT_PUBLIC_PAYMENT_PROVIDER: z.enum(["paystack"]).default("paystack"),
  NEXT_PUBLIC_LEGAL_ENTITY_NAME: optionalText,
  NEXT_PUBLIC_LEGAL_REGISTRATION_NUMBER: optionalText,
  NEXT_PUBLIC_LEGAL_ADDRESS: optionalText,
  NEXT_PUBLIC_SUPPORT_EMAIL: optionalText,
  NEXT_PUBLIC_PRIVACY_EMAIL: optionalText,
  NEXT_PUBLIC_LEGAL_VERSION: z.string().default("0.1-draft"),
  NEXT_PUBLIC_LEGAL_EFFECTIVE_DATE: optionalText,
});

export type AppConfig = ReturnType<typeof toConfig>;

function toConfig(env: z.infer<typeof envSchema>) {
  return {
    deployEnv: env.NEXT_PUBLIC_DEPLOY_ENV,
    appUrl: env.NEXT_PUBLIC_APP_URL.replace(/\/$/, ""),
    apiUrl: env.NEXT_PUBLIC_API_URL,
    /** Search engines may index only an explicitly approved production deploy. */
    allowIndexing:
      env.NEXT_PUBLIC_DEPLOY_ENV === "production" && env.NEXT_PUBLIC_ALLOW_INDEXING,
    features: {
      demoMode: env.NEXT_PUBLIC_DEMO_MODE,
      cameraPreview: env.NEXT_PUBLIC_CAMERA_PREVIEW_ENABLED,
      liveScan: env.NEXT_PUBLIC_LIVE_SCAN_ENABLED,
      marketplace: env.NEXT_PUBLIC_MARKETPLACE_ENABLED,
      payments: env.NEXT_PUBLIC_PAYMENTS_ENABLED,
    },
    paymentProvider: env.NEXT_PUBLIC_PAYMENT_PROVIDER,
    legal: {
      entityName: env.NEXT_PUBLIC_LEGAL_ENTITY_NAME,
      registrationNumber: env.NEXT_PUBLIC_LEGAL_REGISTRATION_NUMBER,
      address: env.NEXT_PUBLIC_LEGAL_ADDRESS,
      supportEmail: env.NEXT_PUBLIC_SUPPORT_EMAIL,
      privacyEmail: env.NEXT_PUBLIC_PRIVACY_EMAIL,
      version: env.NEXT_PUBLIC_LEGAL_VERSION,
      effectiveDate: env.NEXT_PUBLIC_LEGAL_EFFECTIVE_DATE,
    },
  };
}

export function parseConfig(source: Record<string, string | undefined>) {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid GlowHub configuration:\n${details}`);
  }
  return toConfig(result.data);
}

// Each variable is referenced literally so Next.js can inline it at build time.
export const config = parseConfig({
  NEXT_PUBLIC_DEPLOY_ENV: process.env.NEXT_PUBLIC_DEPLOY_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ALLOW_INDEXING: process.env.NEXT_PUBLIC_ALLOW_INDEXING,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
  NEXT_PUBLIC_CAMERA_PREVIEW_ENABLED: process.env.NEXT_PUBLIC_CAMERA_PREVIEW_ENABLED,
  NEXT_PUBLIC_LIVE_SCAN_ENABLED: process.env.NEXT_PUBLIC_LIVE_SCAN_ENABLED,
  NEXT_PUBLIC_MARKETPLACE_ENABLED: process.env.NEXT_PUBLIC_MARKETPLACE_ENABLED,
  NEXT_PUBLIC_PAYMENTS_ENABLED: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED,
  NEXT_PUBLIC_PAYMENT_PROVIDER: process.env.NEXT_PUBLIC_PAYMENT_PROVIDER,
  NEXT_PUBLIC_LEGAL_ENTITY_NAME: process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME,
  NEXT_PUBLIC_LEGAL_REGISTRATION_NUMBER: process.env.NEXT_PUBLIC_LEGAL_REGISTRATION_NUMBER,
  NEXT_PUBLIC_LEGAL_ADDRESS: process.env.NEXT_PUBLIC_LEGAL_ADDRESS,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  NEXT_PUBLIC_PRIVACY_EMAIL: process.env.NEXT_PUBLIC_PRIVACY_EMAIL,
  NEXT_PUBLIC_LEGAL_VERSION: process.env.NEXT_PUBLIC_LEGAL_VERSION,
  NEXT_PUBLIC_LEGAL_EFFECTIVE_DATE: process.env.NEXT_PUBLIC_LEGAL_EFFECTIVE_DATE,
});
