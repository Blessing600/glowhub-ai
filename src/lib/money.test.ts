import { describe, expect, it } from "vitest";

import {
  add,
  applyRate,
  formatMoney,
  money,
  multiply,
  naira,
  ratio,
  subtract,
  sum,
} from "./money";

describe("money", () => {
  it("stores naira as integer kobo", () => {
    expect(naira(8500)).toEqual({ minor: 850_000, currency: "NGN" });
    expect(naira(0.1).minor + naira(0.2).minor).toBe(naira(0.3).minor);
  });

  it("rounds half-kobo amounts away from zero despite float error", () => {
    // 1.005 * 100 === 100.49999999999999 in floating point
    expect(naira(1.005).minor).toBe(101);
    expect(naira(-1.005).minor).toBe(-101);
    expect(naira(8.345).minor).toBe(835);
    expect(naira(19.99).minor).toBe(1999);
  });

  it("rejects fractional minor units", () => {
    expect(() => money(10.5)).toThrow(RangeError);
    expect(() => multiply(naira(1), 1.5)).toThrow(RangeError);
  });

  it("adds, subtracts and sums exactly", () => {
    // Brief §5 shopper demo: ₦8,500 + ₦10,500 + ₦9,000 = ₦28,000, ₦2,000 left of ₦30,000.
    const basket = sum([naira(8500), naira(10_500), naira(9000)]);
    expect(basket).toEqual(naira(28_000));
    expect(subtract(naira(30_000), basket)).toEqual(naira(2000));
    expect(add(naira(1), naira(2))).toEqual(naira(3));
  });

  it("applies percentage rates with half-up rounding", () => {
    // Professional annual: ₦25,000 × 12 × (1 − 20%) = ₦240,000 (PRD §3).
    const list = multiply(naira(25_000), 12);
    expect(subtract(list, applyRate(list, 0.2))).toEqual(naira(240_000));
    expect(applyRate(money(5), 0.5).minor).toBe(3);
    expect(applyRate(money(-5), 0.5).minor).toBe(-3);
  });

  it("returns null for a ratio over zero instead of dividing", () => {
    expect(ratio(naira(50), naira(200))).toBe(0.25);
    expect(ratio(naira(50), naira(0))).toBeNull();
  });

  it("formats as naira", () => {
    expect(formatMoney(naira(28_000))).toBe("₦28,000");
    expect(formatMoney(money(12_345), { showKobo: true })).toBe("₦123.45");
  });
});
