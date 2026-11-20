import { describe, expect, it } from "vitest";

import { parseConfig } from "./env";

describe("parseConfig", () => {
  it("defaults to a safe local prototype", () => {
    const config = parseConfig({});
    expect(config.deployEnv).toBe("local");
    expect(config.appUrl).toBe("http://localhost:3000");
    expect(config.allowIndexing).toBe(false);
    expect(config.features).toEqual({
      cameraPreview: true,
      liveScan: false,
      marketplace: false,
      payments: false,
    });
    expect(config.paymentProvider).toBe("paystack");
  });

  it.each([
    "NEXT_PUBLIC_LIVE_SCAN_ENABLED",
    "NEXT_PUBLIC_MARKETPLACE_ENABLED",
    "NEXT_PUBLIC_PAYMENTS_ENABLED",
  ])("refuses to enable %s", (flag) => {
    expect(() => parseConfig({ [flag]: "true" })).toThrow(
      /cannot be enabled until its release gates are met/,
    );
  });

  it("only allows indexing on an approved production deploy", () => {
    expect(
      parseConfig({ NEXT_PUBLIC_ALLOW_INDEXING: "true" }).allowIndexing,
    ).toBe(false);
    expect(
      parseConfig({
        NEXT_PUBLIC_DEPLOY_ENV: "staging",
        NEXT_PUBLIC_ALLOW_INDEXING: "true",
      }).allowIndexing,
    ).toBe(false);
    expect(
      parseConfig({
        NEXT_PUBLIC_DEPLOY_ENV: "production",
        NEXT_PUBLIC_ALLOW_INDEXING: "true",
      }).allowIndexing,
    ).toBe(true);
  });

  it("treats blank legal contacts as unconfigured and trims the app URL", () => {
    const config = parseConfig({
      NEXT_PUBLIC_APP_URL: "https://staging.example.test/",
      NEXT_PUBLIC_SUPPORT_EMAIL: "  ",
    });
    expect(config.appUrl).toBe("https://staging.example.test");
    expect(config.legal.supportEmail).toBeUndefined();
  });

  it("rejects an invalid app URL", () => {
    expect(() => parseConfig({ NEXT_PUBLIC_APP_URL: "not a url" })).toThrow(
      /NEXT_PUBLIC_APP_URL/,
    );
  });
});
