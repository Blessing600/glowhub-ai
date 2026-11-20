"use client";

import { CircleAlert, CircleCheck, PlugZap } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-md border border-input bg-white px-3 text-base text-ink shadow-xs outline-none placeholder:text-taupe/70 focus-visible:border-plum focus-visible:ring-2 focus-visible:ring-rose/50 aria-invalid:border-danger";

type BaseProps = {
  label: string;
  hint?: string;
  error?: FieldError;
  optional?: boolean;
  registration: UseFormRegisterReturn;
};

function useFieldIds(error?: FieldError, hint?: string) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return { id, hintId, errorId, describedBy: [hintId, errorId].filter(Boolean).join(" ") || undefined };
}

function Label({ htmlFor, label, optional }: { htmlFor: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {label}
      {optional && <span className="font-normal text-taupe"> (optional)</span>}
    </label>
  );
}

function Messages({ hint, hintId, error, errorId }: { hint?: string; hintId?: string; error?: FieldError; errorId?: string }) {
  return (
    <>
      {hint && (
        <p id={hintId} className="text-sm text-taupe">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error.message}
        </p>
      )}
    </>
  );
}

export function TextField({
  label,
  hint,
  error,
  optional,
  registration,
  type = "text",
  autoComplete,
}: BaseProps & { type?: string; autoComplete?: string }) {
  const ids = useFieldIds(error, hint);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={ids.id} label={label} optional={optional} />
      <input
        id={ids.id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={ids.describedBy}
        className={cn(controlClass, "h-11")}
        {...registration}
      />
      <Messages hint={hint} hintId={ids.hintId} error={error} errorId={ids.errorId} />
    </div>
  );
}

export function TextareaField({ label, hint, error, optional, registration }: BaseProps) {
  const ids = useFieldIds(error, hint);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={ids.id} label={label} optional={optional} />
      <textarea
        id={ids.id}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={ids.describedBy}
        className={cn(controlClass, "py-2")}
        {...registration}
      />
      <Messages hint={hint} hintId={ids.hintId} error={error} errorId={ids.errorId} />
    </div>
  );
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  registration,
  options,
}: BaseProps & { options: ReadonlyArray<{ value: string; label: string }> }) {
  const ids = useFieldIds(error, hint);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={ids.id} label={label} optional={optional} />
      <select
        id={ids.id}
        aria-invalid={!!error}
        aria-describedby={ids.describedBy}
        className={cn(controlClass, "h-11")}
        defaultValue=""
        {...registration}
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Messages hint={hint} hintId={ids.hintId} error={error} errorId={ids.errorId} />
    </div>
  );
}

/** Unchecked by default: affirmative consent must be an active choice. */
export function CheckboxField({
  label,
  error,
  registration,
}: {
  label: React.ReactNode;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}) {
  const ids = useFieldIds(error);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex min-h-11 items-start gap-3">
        <input
          id={ids.id}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={ids.describedBy}
          className="mt-0.5 size-5 shrink-0 accent-plum"
          {...registration}
        />
        <label htmlFor={ids.id} className="text-sm leading-snug">
          {label}
        </label>
      </div>
      <Messages error={error} errorId={ids.errorId} />
    </div>
  );
}

/**
 * Explains why a submission did not complete. Never a success message: used when the
 * backend is not connected or returned an error. Takes focus so it is announced.
 */
export function ServiceNotice({
  outcome,
  feature,
  children,
}: {
  outcome: "not-connected" | "error";
  /** e.g. "Account creation" */
  feature: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), [outcome]);
  const Icon = outcome === "error" ? CircleAlert : PlugZap;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="flex gap-3 rounded-lg border border-warning/40 bg-white p-4 text-sm text-ink outline-none">
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-warning" />
      <div className="space-y-1">
        <p className="font-semibold">
          {outcome === "not-connected" ? `${feature} isn't connected yet.` : `${feature} didn't go through.`}
        </p>
        <div className="text-taupe">
          {children ??
            (outcome === "not-connected"
              ? "Nothing was sent or stored. Your entries are still here."
              : "Nothing was saved. Please try again in a moment.")}
        </div>
      </div>
    </div>
  );
}

/** Confirmation shown only after the service confirms success; takes focus so it is announced. */
export function SubmittedPanel({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div role="status" className="rounded-lg border border-line bg-white p-6">
      <h2 ref={ref} tabIndex={-1} className="flex items-center gap-2 font-display text-2xl font-medium text-plum outline-none">
        <CircleCheck aria-hidden className="size-6 text-success" />
        {title}
      </h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-taupe">{children}</div>
    </div>
  );
}
