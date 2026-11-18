/**
 * Money is stored as integer minor units (kobo for NGN) — never floats.
 * All pricing, sales and report calculations go through these helpers.
 */
export type Currency = "NGN";

export type Money = {
  /** Integer minor units, e.g. 850000 = ₦8,500.00 */
  readonly minor: number;
  readonly currency: Currency;
};

const MINOR_PER_MAJOR: Record<Currency, number> = { NGN: 100 };

function assertMinor(minor: number): void {
  if (!Number.isSafeInteger(minor)) {
    throw new RangeError(`Money must be a safe integer of minor units, received ${minor}`);
  }
}

export function money(minor: number, currency: Currency = "NGN"): Money {
  assertMinor(minor);
  return { minor, currency };
}

/**
 * Builds Money from a whole or decimal major amount, e.g. naira(8500).
 * Half-kobo amounts round away from zero, matching applyRate. The product is
 * trimmed to 12 significant digits first so float error (1.005 * 100 ===
 * 100.49999999999999) cannot flip the rounding.
 */
export function naira(major: number): Money {
  const raw = Number((major * MINOR_PER_MAJOR.NGN).toPrecision(12));
  return money(Math.sign(raw) * Math.round(Math.abs(raw)));
}

function sameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    throw new Error(`Currency mismatch: ${a.currency} vs ${b.currency}`);
  }
}

export function add(a: Money, b: Money): Money {
  sameCurrency(a, b);
  return money(a.minor + b.minor, a.currency);
}

export function subtract(a: Money, b: Money): Money {
  sameCurrency(a, b);
  return money(a.minor - b.minor, a.currency);
}

export function sum(items: readonly Money[], currency: Currency = "NGN"): Money {
  return items.reduce((total, item) => add(total, item), money(0, currency));
}

export function multiply(a: Money, quantity: number): Money {
  if (!Number.isSafeInteger(quantity)) {
    throw new RangeError(`Quantity must be an integer, received ${quantity}`);
  }
  return money(a.minor * quantity, a.currency);
}

/**
 * Applies a rate (e.g. 0.2 for 20%) with half-up rounding to the nearest minor
 * unit. Rates are passed as basis points internally to avoid float drift.
 */
export function applyRate(a: Money, rate: number): Money {
  const basisPoints = Math.round(rate * 10_000);
  const raw = (a.minor * basisPoints) / 10_000;
  return money(Math.sign(raw) * Math.round(Math.abs(raw)), a.currency);
}

/** Ratio of two amounts, or null when the denominator is zero. */
export function ratio(numerator: Money, denominator: Money): number | null {
  sameCurrency(numerator, denominator);
  return denominator.minor === 0 ? null : numerator.minor / denominator.minor;
}

const formatters = new Map<string, Intl.NumberFormat>();

export function formatMoney(
  a: Money,
  { showKobo = false }: { showKobo?: boolean } = {},
): string {
  const key = `${a.currency}:${showKobo}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: a.currency,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: showKobo ? 2 : 0,
      maximumFractionDigits: showKobo ? 2 : 0,
    });
    formatters.set(key, formatter);
  }
  return formatter.format(a.minor / MINOR_PER_MAJOR[a.currency]);
}
