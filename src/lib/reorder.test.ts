import { describe, expect, it } from "vitest";

import { reorderQuantity } from "@/lib/reorder";

describe("reorderQuantity", () => {
  it("reproduces the brief's demo figures", () => {
    const base = { safetyStock: 4, confirmedIncoming: 0 };
    expect(reorderQuantity({ ...base, available: 4, demandOverPeriod: 24 })).toBe(24);
    expect(reorderQuantity({ ...base, available: 6, demandOverPeriod: 20 })).toBe(18);
    expect(reorderQuantity({ ...base, available: 8, demandOverPeriod: 16 })).toBe(12);
  });

  it("subtracts confirmed incoming stock", () => {
    expect(
      reorderQuantity({ available: 4, demandOverPeriod: 24, safetyStock: 4, confirmedIncoming: 10 }),
    ).toBe(14);
  });

  it("never suggests a negative quantity", () => {
    expect(
      reorderQuantity({ available: 50, demandOverPeriod: 10, safetyStock: 4, confirmedIncoming: 0 }),
    ).toBe(0);
  });

  it("rejects negative or fractional inputs", () => {
    expect(() =>
      reorderQuantity({ available: -1, demandOverPeriod: 10, safetyStock: 4, confirmedIncoming: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      reorderQuantity({ available: 1.5, demandOverPeriod: 10, safetyStock: 4, confirmedIncoming: 0 }),
    ).toThrow(RangeError);
  });
});
