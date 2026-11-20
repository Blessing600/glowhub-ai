import { z } from "zod";

import type { ContactValues, RegisterValues, SignInValues } from "@/features/forms/schemas";
import { apiRequest, type ServiceResult } from "@/services/api-client";

/** Proposed contracts — see docs/frontend-api-contracts.md §Accounts and §Support. */

const sessionSchema = z.object({ redirectTo: z.string().startsWith("/") });
export type Session = z.infer<typeof sessionSchema>;

export function registerAccount(values: RegisterValues): Promise<ServiceResult<Session>> {
  return apiRequest("/auth/register", { body: values, parse: (json) => sessionSchema.parse(json) });
}

export function signIn(values: SignInValues): Promise<ServiceResult<Session>> {
  return apiRequest("/auth/sessions", { body: values, parse: (json) => sessionSchema.parse(json) });
}

const receiptSchema = z.object({ reference: z.string().min(1) });

export function sendSupportMessage(values: ContactValues): Promise<ServiceResult<{ reference: string }>> {
  return apiRequest("/support/messages", { body: values, parse: (json) => receiptSchema.parse(json) });
}
