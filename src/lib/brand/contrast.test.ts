import { describe, expect, it } from "vitest";

import { contrastPairs, palette } from "@/config/brand";

import { contrastRatio, wcagMinimum } from "./contrast";

describe("contrastRatio", () => {
  it("matches the WCAG reference values for black and white", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
    expect(contrastRatio("#FFFFFF", "#FFFFFF")).toBeCloseTo(1, 5);
  });

  it("rejects malformed colours", () => {
    expect(() => contrastRatio("plum", "#FFFFFF")).toThrow();
  });
});

describe("brand palette pairings", () => {
  it.each(contrastPairs)(
    "$fg on $bg meets WCAG AA for $use ($note)",
    ({ fg, bg, use }) => {
      expect(contrastRatio(palette[fg], palette[bg])).toBeGreaterThanOrEqual(
        wcagMinimum[use],
      );
    },
  );

  it("keeps base hibiscus rose out of normal-size text on cream", () => {
    // Documents why rose700 exists: the brief's #B9527C is 4.34:1 on cream.
    expect(contrastRatio(palette.rose, palette.cream)).toBeLessThan(
      wcagMinimum.text,
    );
  });
});
