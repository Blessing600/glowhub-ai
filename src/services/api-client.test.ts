import { afterEach, describe, expect, it, vi } from "vitest";

import { apiRequest } from "./api-client";

const parse = (json: unknown) => json as { ok: boolean };

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("apiRequest", () => {
  it("returns not-connected and sends nothing when no API URL is configured", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await expect(apiRequest("/x", { parse, baseUrl: undefined })).resolves.toEqual({ status: "not-connected" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns parsed data on success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }))));
    await expect(apiRequest("/x", { parse, baseUrl: "https://api.test/" })).resolves.toEqual({
      status: "ok",
      data: { ok: true },
    });
  });

  it("maps HTTP failures without claiming success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 503 })));
    const result = await apiRequest("/x", { parse, baseUrl: "https://api.test" });
    expect(result).toMatchObject({ status: "error", kind: "http", httpStatus: 503 });
  });

  it("rejects responses that fail validation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({}))));
    const result = await apiRequest("/x", {
      baseUrl: "https://api.test",
      parse: () => {
        throw new Error("bad");
      },
    });
    expect(result).toMatchObject({ status: "error", kind: "invalid-response" });
  });

  it("reports a timeout", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_, reject) => init.signal?.addEventListener("abort", () => reject(new Error("aborted")))),
      ),
    );
    const result = await apiRequest("/x", { parse, baseUrl: "https://api.test", timeoutMs: 5 });
    expect(result).toMatchObject({ status: "error", kind: "timeout" });
  });

  it("reports cancellation by the caller", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_, reject) => init.signal?.addEventListener("abort", () => reject(new Error("aborted")))),
      ),
    );
    const controller = new AbortController();
    const pending = apiRequest("/x", { parse, baseUrl: "https://api.test", signal: controller.signal });
    controller.abort();
    await expect(pending).resolves.toMatchObject({ status: "error", kind: "cancelled" });
  });
});
