/**
 * Public-site navigation. Only list routes that exist: no broken links.
 * e2e/marketing.spec.ts crawls every internal link.
 */
export type NavLink = { href: string; label: string };

/** Kept deliberately short; Product, How it works and the rest live in the footer. */
export const primaryNav: readonly NavLink[] = [
  { href: "/glow-scan", label: "Glow Scan" },
  { href: "/for-businesses", label: "For businesses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export const getStartedHref = "/register";

export const footerNav: ReadonlyArray<{ heading: string; links: readonly NavLink[] }> = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Product" },
      { href: "/glow-scan", label: "Glow Scan" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/for-businesses", label: "For businesses" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Support" },
    ],
  },
];

/** Structured drafts, each labelled "Draft for legal review". */
export const legalNav: readonly NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/security", label: "Security" },
];

/** Public routes for the sitemap. */
export const publicRoutes: readonly string[] = [
  "/",
  "/features",
  "/for-businesses",
  "/glow-scan",
  "/how-it-works",
  "/pricing",
  "/about",
  "/faq",
  "/contact",
  "/sign-in",
  "/register",
  ...legalNav.map((link) => link.href),
];
