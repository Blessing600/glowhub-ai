import { config } from "@/config/env";

/**
 * Typed result of every backend call. "not-connected" means no API base URL is
 * configured (NEXT_PUBLIC_API_URL) or the feature is gated off — the request was
 * never sent, and the UI must say so instead of showing success.
 * Endpoint contracts: docs/frontend-api-contracts.md.
 */
export type ServiceErrorKind = "timeout" | "network" | "http" | "invalid-response" | "cancelled";

export type ServiceResult<T> =
  | { status: "ok"; data: T }
  | { status: "not-connected" }
  | { status: "error"; kind: ServiceErrorKind; message: string; httpStatus?: number };

export const notConnected = { status: "not-connected" } as const;

type RequestOptions<T> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
  /** Validates the JSON response; throw to reject it. */
  parse: (json: unknown) => T;
  /** Overridable for tests; defaults to NEXT_PUBLIC_API_URL. */
  baseUrl?: string;
};

export async function apiRequest<T>(
  path: string,
  { method = "POST", body, signal, timeoutMs = 15_000, parse, baseUrl = config.apiUrl }: RequestOptions<T>,
): Promise<ServiceResult<T>> {
  if (!baseUrl) return notConnected;

  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include",
      signal: controller.signal,
    });
    if (!response.ok) {
      return {
        status: "error",
        kind: "http",
        httpStatus: response.status,
        message: `The service responded with ${response.status}.`,
      };
    }
    try {
      return { status: "ok", data: parse(await response.json()) };
    } catch {
      return { status: "error", kind: "invalid-response", message: "The service sent a response we couldn't read." };
    }
  } catch {
    if (timedOut) return { status: "error", kind: "timeout", message: "The service took too long to respond." };
    if (signal?.aborted) return { status: "error", kind: "cancelled", message: "The request was cancelled." };
    return { status: "error", kind: "network", message: "We couldn't reach the service. Check your connection." };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}
