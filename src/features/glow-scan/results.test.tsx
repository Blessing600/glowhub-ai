import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { GlowScanResults, MatchesView } from "@/features/glow-scan/results";
import type { GlowScanPreferences, GlowScanResult, ProductMatch } from "@/features/glow-scan/types";
import { naira } from "@/lib/money";

afterEach(cleanup);

// Test-only fixtures. Never imported by application code.
const prefs: GlowScanPreferences = {
  goals: [],
  currentProducts: [],
  sensitivities: ["fragrance"],
  otherExclusions: [],
  categories: ["cleanser", "sunscreen"],
};

const match = (id: string, overrides: Partial<ProductMatch> = {}): ProductMatch => ({
  id,
  name: `Fixture ${id}`,
  brand: "Fixture Brand",
  merchant: "Fixture Merchant",
  category: "cleanser",
  price: naira(6_500),
  stock: "in-stock",
  ingredients: ["Aqua", "Glycerin"],
  reasons: ["Fixture reason"],
  cautions: [],
  ...overrides,
});

describe("MatchesView", () => {
  it("shows only available, compatible products and says how many were left out", () => {
    const result: GlowScanResult = {
      requestId: "r1",
      observations: [],
      matches: [match("a"), match("b", { stock: "out-of-stock" }), match("c", { ingredients: ["Aqua", "Parfum"] })],
      routine: [],
      missingInformation: [],
    };
    render(<MatchesView result={result} prefs={prefs} />);
    expect(screen.getByText("Fixture a")).toBeInTheDocument();
    expect(screen.queryByText("Fixture b")).not.toBeInTheDocument();
    expect(screen.queryByText("Fixture c")).not.toBeInTheDocument();
    expect(screen.getByText(/2 products were left out/)).toBeInTheDocument();
    expect(screen.getByText("₦6,500")).toBeInTheDocument();
  });
});

describe("GlowScanResults without a backend", () => {
  it("matches against the labelled sample catalogue and builds a product routine", async () => {
    render(<GlowScanResults prefs={prefs} onPrefsChange={() => {}} onEdit={() => {}} />);
    expect(await screen.findByText("Sample catalogue.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your routine" })).toBeInTheDocument();
    // Fragrance is excluded, so the fragranced gel sunscreen never appears.
    expect(screen.queryByText("Invisible Gel Sunscreen SPF 50")).not.toBeInTheDocument();
    expect(screen.getAllByText("Sheer Mineral Sunscreen SPF 50").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sample product · not for sale").length).toBeGreaterThan(0);
  });
});
