/**
 * Public-site navigation. Only list routes that exist: no broken links.
 */
export type NavLink = { href: string; label: string };

/** Header order from brief §4: Explore Glow Scan (glowScanCta), For Businesses, Features, Pricing, Sign In, Get Early Access. */
export const primaryNav: readonly NavLink[] = [
  { href: "/for-businesses", label: "For Businesses" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

/**
 * Header "Explore Glow Scan" CTA (brief §4). Open product decision — the PRD treats
 * image analysis as a gated P1 pilot (see docs/implementation-plan.md, "Open
 * decision — Glow Scan placement"). Set `show` to false to remove it.
 * Until the consumer Glow Scan ships (M3) it opens the scripted sample in the demo.
 */
export const glowScanCta = {
  show: true,
  href: "/demo#glow-scan",
  label: "Explore Glow Scan",
} as const;

export const footerNav: ReadonlyArray<{ heading: string; links: readonly NavLink[] }> = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/demo", label: "See it in action" },
    ],
  },
  {
    heading: "Who it's for",
    links: [
      { href: "/for-businesses", label: "For businesses" },
      { href: "/for-shoppers", label: "For shoppers" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/early-access", label: "Get early access" },
    ],
  },
];

/**
 * Legal drafts ship in M4 (brief §13). Add each route here when its page exists;
 * the footer lists these and shows a "drafts in preparation" note while empty.
 */
export const legalNav: readonly NavLink[] = [];

/** Public routes for the sitemap. */
export const publicRoutes: readonly string[] = [
  "/",
  "/for-businesses",
  "/for-shoppers",
  "/features",
  "/how-it-works",
  "/pricing",
  "/demo",
  "/about",
  "/faq",
  "/contact",
  "/early-access",
  "/sign-in",
  "/register",
  ...legalNav.map((link) => link.href),
];
