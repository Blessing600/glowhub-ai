"use client";

import { CircleCheck, Info } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-md border border-input bg-white px-3 text-base text-plum shadow-xs outline-none placeholder:text-plum-600/70 focus-visible:border-rose focus-visible:ring-2 focus-visible:ring-rose/40 aria-invalid:border-danger";

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
      {optional && <span className="font-normal text-plum-600"> (optional)</span>}
    </label>
  );
}

function Messages({ hint, hintId, error, errorId }: { hint?: string; hintId?: string; error?: FieldError; errorId?: string }) {
  return (
    <>
      {hint && (
        <p id={hintId} className="text-sm text-plum-600">
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

export function PrototypeNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2 rounded-lg border bg-white p-3 text-sm text-plum">
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-rose-700" />
      <span>{children}</span>
    </p>
  );
}

/** Confirmation shown after a mock submission; takes focus so it is announced. */
export function SubmittedPanel({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div role="status" className="rounded-xl border bg-white p-6">
      <h2 ref={ref} tabIndex={-1} className="flex items-center gap-2 font-display text-2xl font-semibold outline-none">
        <CircleCheck aria-hidden className="size-6 text-sage-700" />
        {title}
      </h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-plum-600">{children}</div>
    </div>
  );
}

/** Simulated network latency so the submitting state is visible. Sends nothing. */
export function mockSubmit() {
  return new Promise<void>((resolve) => setTimeout(resolve, 500));
}
