export type ReorderInput = {
  /** Units on hand that can be sold (excludes expired, recalled, quarantined). */
  available: number;
  /** Expected demand over the supplier lead time plus review period. */
  demandOverPeriod: number;
  safetyStock: number;
  /** Units already on confirmed purchase orders. */
  confirmedIncoming: number;
};

/**
 * Suggested reorder quantity (brief §5, PRD A04):
 * max(0, demand over lead/review period + safety stock − available − confirmed incoming).
 * A suggestion only — purchasing always needs owner approval.
 */
export function reorderQuantity(input: ReorderInput): number {
  const { available, demandOverPeriod, safetyStock, confirmedIncoming } = input;
  for (const [key, value] of Object.entries({ available, demandOverPeriod, safetyStock, confirmedIncoming })) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new RangeError(`${key} must be a non-negative integer, received ${value}`);
    }
  }
  return Math.max(0, demandOverPeriod + safetyStock - available - confirmedIncoming);
}
