import {
  ArrowRight,
  BadgeCheck,
  Camera,
  HandHeart,
  PackageX,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { FaqList } from "@/components/marketing/faq-list";
import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import { Container, CtaBand, Eyebrow, IconGrid, sectionHeadingClass } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { glowScanCta } from "@/config/site";
import {
  consultationBudget,
  consultationProducts,
  consultationSummary,
  extractedFields,
  glowScanIllustrativeIndicators,
  invoice,
  restockRows,
  routine,
  stockAsOf,
} from "@/features/demo/scenarios";
import { faqs, type IconItem } from "@/features/marketing/content";
import { ExploreGrid, type ExploreCard } from "@/features/marketing/explore-grid";
import { ProductCarousel, type MatchCard } from "@/features/marketing/product-carousel";
import { PricingPlans } from "@/features/pricing/pricing-plans";
import { formatMoney, naira } from "@/lib/money";
import { cn } from "@/lib/utils";

const glowScanHref = glowScanCta.href;
const budgetLabel = formatMoney(consultationBudget);
const restock = restockRows[0];
const flaggedFields = extractedFields.filter((f) => f.check !== "match").length;

const promises = [
  { icon: Wallet, label: "Prices in naira" },
  { icon: PackageX, label: "Matches only from stock on the shelf" },
  { icon: Camera, label: "Your photo is never analysed" },
  { icon: UserCheck, label: "People approve every AI action" },
];

const kinds = { Cleanse: "cleanser", Moisturise: "jar", Protect: "sunscreen" } as const;

const matches: readonly MatchCard[] = [
  ...consultationProducts.map((p) => ({
    kind: kinds[p.step as keyof typeof kinds],
    step: p.step,
    product: p.product,
    priceLabel: formatMoney(p.price),
    keyIngredients: p.keyIngredients,
    reason: p.reason,
    inStock: p.inStock,
  })),
  {
    kind: "toner",
    step: "Tone",
    product: "Hydrating Toner 200 ml",
    priceLabel: formatMoney(naira(7_000)),
    keyIngredients: "Glycerin, sodium hyaluronate",
    reason: "A watery layer after cleansing for skin that feels tight; label lists no added fragrance.",
    inStock: 9,
  },
  {
    kind: "serum",
    step: "Treat",
    product: "Vitamin C Serum 30 ml",
    priceLabel: formatMoney(naira(12_500)),
    keyIngredients: "Ascorbic acid, vitamin E",
    reason: "For a more even-looking tone. Patch test first if your skin stings easily.",
    inStock: restock.available,
  },
];

const routineNotes: Record<string, string> = {
  "Gentle Cleanser": "Massage onto damp skin, rinse.",
  "Barrier Moisturiser": "A pea-sized amount on damp skin.",
  "SPF 50 Sunscreen": "Two finger-lengths, last step.",
};

const safeguards: readonly IconItem[] = [
  {
    icon: Camera,
    title: "No photo analysis",
    body: "Glow Scan's camera is a private preview. Matches come from your answers, never from your face.",
  },
  {
    icon: Stethoscope,
    title: "Cosmetic guidance only",
    body: "No diagnosis or prescriptions. Symptoms like pain, bleeding or a spreading rash stop suggestions and point to qualified care.",
  },
  {
    icon: PackageX,
    title: "Only sellable stock",
    body: "Expired, recalled and quarantined batches never appear in matches or sales.",
  },
  {
    icon: BadgeCheck,
    title: "Evidence, not verdicts",
    body: "Supplier documents are checked field by field, and a person makes the decision. A barcode alone proves nothing.",
  },
  {
    icon: HandHeart,
    title: "People stay in charge",
    body: "AI suggests. Stock changes, purchase lists, prices and messages wait for someone to confirm.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, your choice",
    body: "Skin details are optional and need your consent. No skin-tone scores, age guesses or lightening goals — ever.",
  },
];

const exploreCards: readonly ExploreCard[] = [
  {
    href: glowScanHref,
    title: "Glow Scan",
    body: "A short consultation that turns your answers into in-stock matches.",
    image: "/images/skin-scan/selfie-phone.webp",
    audience: "shoppers",
  },
  {
    href: "/for-shoppers",
    title: "Skincare that fits you",
    body: "Clear reasons, ingredients and prices for every product — within your budget.",
    image: "/images/beauty-editorial/hands-cream.webp",
    audience: "shoppers",
  },
  {
    href: "/faq",
    title: "Questions, answered",
    body: "What Glow Scan does with your photo, how matches work, and what GlowHub will never do.",
    image: "/images/beauty-editorial/morning-cream.webp",
    audience: "shoppers",
  },
  {
    href: "/for-businesses",
    title: "Run your beauty business",
    body: "Stock, expiry, sales, customers and supplier evidence in one place.",
    image: "/images/beauty-businesses/shop-owner.webp",
    audience: "businesses",
  },
  {
    href: "/features",
    title: "Every feature",
    body: "What each tool does, and how much of it works today.",
    image: "/images/consultation/phone-cosmetics.webp",
    audience: "businesses",
  },
  {
    href: "/how-it-works",
    title: "From set-up to first insight",
    body: "A starter catalogue, a first sale and a first stock suggestion in one sitting.",
    image: "/images/consultation/mirror-phone.webp",
    audience: "businesses",
  },
];

/** Floating UI card laid over photography. */
function FloatCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-plum/10 bg-white p-4 text-plum shadow-[0_12px_32px_-16px_rgb(52_32_56/0.35)] sm:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardLabel({ children, tone = "rose" }: { children: React.ReactNode; tone?: "rose" | "terracotta" }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.2em] uppercase",
        tone === "rose" ? "text-rose-700" : "text-terracotta-700",
      )}
    >
      {children}
    </p>
  );
}

function MatchList() {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardLabel>Your product match</CardLabel>
          <p className="mt-1 text-sm text-plum-600">Dry, sensitive skin · up to {budgetLabel}</p>
        </div>
      </div>
      <ol className="mt-3 divide-y divide-plum/10">
        {consultationProducts.map((p) => (
          <li key={p.product} className="flex items-baseline justify-between gap-3 py-2 text-sm">
            <span>
              <span className="block text-xs text-plum-600 sm:mr-2 sm:inline sm:text-sm">{p.step}</span>
              <span className="font-semibold">{p.product}</span>
            </span>
            <span className="shrink-0">{formatMoney(p.price)}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 flex items-baseline justify-between border-t border-plum/15 pt-3 text-sm">
        <span className="font-semibold">Total {formatMoney(consultationSummary.total)}</span>
        <span className="text-sage-700">{formatMoney(consultationSummary.remaining)} under budget</span>
      </p>
    </>
  );
}

type Row = {
  id: string;
  label: string;
  title: string;
  body: string;
  points: readonly string[];
  link: { href: string; label: string };
  image: string;
  imageAlt: string;
  overlay: React.ReactNode;
};

const rows: readonly Row[] = [
  {
    id: "glow-scan",
    label: "Glow Scan",
    title: "A consultation in your own words.",
    body: "Tell us your goals, how your skin feels, any allergies and your budget. Add a photo if you like — it stays a private camera preview.",
    points: ["Every question is optional", "No account needed to start", "Your photo is never uploaded or analysed"],
    link: { href: glowScanHref, label: "Explore Glow Scan" },
    image: "/images/skin-scan/selfie-phone.webp",
    imageAlt: "A woman takes a smiling selfie on her phone.",
    overlay: (
      <FloatCard className="absolute right-4 bottom-4 left-4 sm:right-auto sm:w-80">
        <CardLabel>Your answers</CardLabel>
        <ul className="mt-3 flex flex-wrap gap-2">
          {["Comfortable, less tight skin", "Stings with some products", `Up to ${budgetLabel}`].map((a) => (
            <li key={a} className="rounded-full bg-blush px-3 py-1.5 text-xs font-semibold text-rose-800">
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-plum-600">Camera preview only. Your photo is not analysed.</p>
      </FloatCard>
    ),
  },
  {
    id: "matches",
    label: "Product matches",
    title: "Matches you can buy today.",
    body: "GlowHub checks a shop's real stock and ingredient records, then explains every suggestion: why it suits you, what is in it and what it costs.",
    points: ["Stays within your budget", "Respects the allergies you list", "Skips expired or recalled batches"],
    link: { href: "/for-shoppers", label: "How matching works" },
    image: "/images/skincare-products/bottles-marble.webp",
    imageAlt: "Unbranded skincare bottles and a jar on a marble surface.",
    overlay: (
      <FloatCard className="absolute right-4 bottom-4 left-4 sm:left-auto sm:w-[23rem]">
        <MatchList />
      </FloatCard>
    ),
  },
  {
    id: "routine",
    label: "Routines",
    title: "Morning to evening, beautifully simple.",
    body: "Your matches become a routine you can edit and save — in the order to apply them, with a note on how.",
    points: ["Morning and evening steps", "Swap any product for another in stock", "Cautions such as patch testing"],
    link: { href: glowScanHref, label: "Build your routine" },
    image: "/images/beauty-editorial/morning-cream.webp",
    imageAlt: "A woman in a bathrobe applies cream to her cheek in the morning.",
    overlay: (
      <FloatCard className="absolute right-4 bottom-4 left-4 grid grid-cols-2 gap-4 sm:right-auto sm:w-[26rem]">
        {(
          [
            ["Morning", routine.morning],
            ["Evening", routine.evening],
          ] as const
        ).map(([time, steps]) => (
          <div key={time}>
            <p className="font-display text-xl italic">{time}</p>
            <ol className="mt-2 space-y-2">
              {steps.map((step, i) => (
                <li key={step} className="text-sm">
                  <span className="font-semibold">
                    {i + 1}. {step}
                  </span>
                  <span className="hidden text-xs text-plum-600 sm:block">{routineNotes[step]}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </FloatCard>
    ),
  },
  {
    id: "business",
    label: "For beauty businesses",
    title: "Run the shop. GlowHub keeps count.",
    body: "Stock and expiry, sales, customers and supplier evidence in one calm place — with AI that shows its working and waits for your yes.",
    points: ["Reorder suggestions you approve", "Expiry warnings before it's too late", "Supplier evidence checked by people"],
    link: { href: "/for-businesses", label: "For Beauty Businesses" },
    image: "/images/beauty-businesses/shop-owner.webp",
    imageAlt: "A smiling woman stands beside shelves of skincare in a beauty shop.",
    overlay: (
      <div className="absolute right-4 bottom-4 left-4 grid gap-3 sm:left-auto sm:w-80">
        <FloatCard>
          <CardLabel tone="terracotta">Restock</CardLabel>
          <p className="mt-1.5 font-semibold">{restock.product}</p>
          <p className="mt-0.5 text-sm text-plum-600">
            {restock.available} left · suggest ordering {restock.reorder}. Nothing is ordered until you approve.
          </p>
        </FloatCard>
        <FloatCard>
          <CardLabel>Supplier evidence</CardLabel>
          <p className="mt-1.5 font-semibold">Invoice {invoice.number}</p>
          <p className="mt-0.5 text-sm text-plum-600">{flaggedFields} fields flagged · needs human review</p>
        </FloatCard>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero: AI-first positioning left; portrait with Glow Scan overlay, illustrative results and an AI routine right. */}
      <section aria-labelledby="hero-heading" className="overflow-hidden bg-cream">
        <Container className="grid items-center gap-10 pt-8 pb-16 lg:grid-cols-12 lg:gap-0 lg:pt-10 lg:pb-20">
          <div className="lg:col-span-6 lg:pr-14">
            <Link
              href={glowScanHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-plum/15 bg-white py-1.5 pr-4 pl-1.5 text-sm font-medium hover:border-plum/40"
            >
              <span className="rounded-full bg-rose-700 px-2.5 py-1 text-xs font-semibold text-cream">New</span>
              Glow Scan consultations
              <ArrowRight aria-hidden className="size-4 text-rose-700" />
            </Link>
            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.5rem] leading-[1.05] font-medium tracking-[-0.01em] sm:text-[3.5rem] lg:text-[4rem]"
            >
              Meet the AI agent running the future of <em className="text-bronze">beauty commerce.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              GlowHub AI helps beauty brands, retailers and skincare professionals automate customer consultations,
              personalise product recommendations, run AI-powered beauty scans, manage inventory and grow sales through
              one intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={glowScanHref}>Explore Glow Scan</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/for-businesses">For Beauty Businesses</Link>
              </Button>
            </div>
            <div className="mt-10 border-t border-plum/15 pt-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-plum-600 uppercase">Built for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {["Beauty brands", "Retailers", "Skincare professionals", "Salons and spas"].map((who) => (
                  <li key={who} className="rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-sm">
                    {who}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <PhotoPlaceholder
                shot="Hero portrait"
                folder="hero"
                src="/images/hero/portrait-studio.webp"
                alt="Studio beauty portrait of a woman with deep brown skin resting her chin on her hand."
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/5] lg:aspect-[5/6] lg:max-h-[calc(100svh-7rem)] lg:w-full [&_img]:object-[center_25%]"
              />
              {/* Decorative scan frame; no analysis is performed on this photo. */}
              <div aria-hidden className="pointer-events-none absolute inset-x-[8%] top-[11%] bottom-[10%]">
                <span className="absolute top-0 left-0 size-7 rounded-tl-lg border-t-2 border-l-2 border-cream" />
                <span className="absolute top-0 right-0 size-7 rounded-tr-lg border-t-2 border-r-2 border-cream" />
                <span className="absolute bottom-0 left-0 size-7 rounded-bl-lg border-b-2 border-l-2 border-cream" />
                <span className="absolute right-0 bottom-0 size-7 rounded-br-lg border-r-2 border-b-2 border-cream" />
                <span className="animate-glow-scan absolute inset-x-2 h-0.5 rounded-full bg-cream/90 shadow-[0_0_14px_3px_rgb(255_247_239/0.7)]" />
              </div>
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-plum/85 px-3 py-1.5 text-xs font-semibold text-cream">
                <Sparkles aria-hidden className="size-3.5" />
                Glow Scan
              </span>

              <FloatCard className="relative mx-3 -mt-20 sm:absolute sm:top-20 sm:right-3 sm:mx-0 sm:mt-0 sm:w-48 sm:p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <CardLabel>Beauty scan</CardLabel>
                  <span className="rounded-full bg-blush px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-rose-800">
                    Result
                  </span>
                </div>
                <ul className="mt-3 space-y-2.5 sm:mt-2 sm:space-y-1.5">
                  {glowScanIllustrativeIndicators.map((ind) => (
                    <li key={ind.label}>
                      <p className="flex items-baseline justify-between gap-2 text-sm sm:text-[11px]">
                        <span className="font-semibold whitespace-nowrap">{ind.label}</span>
                        <span className="text-xs whitespace-nowrap text-plum-600 sm:text-[10px]">{ind.note}</span>
                      </p>
                      <div aria-hidden className="mt-1 h-1.5 rounded-full bg-blush sm:mt-0.5 sm:h-1">
                        <div className="h-full rounded-full bg-bronze-700" style={{ width: `${ind.value}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </FloatCard>

              <FloatCard className="relative mx-3 mt-3 sm:absolute sm:-bottom-10 sm:left-3 sm:mx-0 sm:mt-0 sm:w-56 sm:p-2.5 lg:-left-12">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardLabel tone="terracotta">AI recommendation</CardLabel>
                    <p className="mt-1 font-semibold sm:text-xs sm:leading-snug">Recommended routine for dry, sensitive skin</p>
                  </div>
                  <Sparkles aria-hidden className="mt-0.5 size-5 shrink-0 text-rose sm:size-4" />
                </div>
                <ol className="mt-3 divide-y divide-plum/10 sm:mt-1.5">
                  {consultationProducts.map((p) => (
                    <li
                      key={p.product}
                      className="flex items-baseline justify-between gap-3 py-2 text-sm sm:py-0.5 sm:text-[11px]"
                    >
                      <span>
                        <span className="block text-xs text-plum-600 sm:hidden">{p.step}</span>
                        <span className="font-semibold">{p.product}</span>
                      </span>
                      <span className="shrink-0">{formatMoney(p.price)}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-2 flex items-baseline justify-between border-t border-plum/15 pt-3 text-sm sm:mt-1 sm:pt-1.5 sm:text-[11px]">
                  <span className="font-semibold">Total {formatMoney(consultationSummary.total)}</span>
                  <span className="text-sage-700">Within {budgetLabel}</span>
                </p>
                <p className="mt-2 text-xs text-plum-600 sm:mt-1 sm:text-[10px]">
                  Matched from consultation inputs
                </p>
              </FloatCard>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-plum-600 sm:mt-3 sm:pl-[15.5rem] lg:pl-[11.5rem]">
              Glow Scan provides skincare insights and product recommendations. It is not a medical diagnosis. Results
              shown are illustrative, not an analysis of this photo.
            </p>
          </div>
        </Container>
      </section>

      {/* Promise strip. */}
      <section aria-label="Our promises" className="border-y border-plum/10 bg-white">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 text-sm font-medium lg:grid-cols-4">
            {promises.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon aria-hidden className="size-5 shrink-0 text-rose" />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Platform: alternating split rows, each a photo with live UI laid over it. */}
      <section aria-labelledby="platform-heading" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>One intelligent beauty platform</Eyebrow>
            <h2 id="platform-heading" className={`mt-4 ${sectionHeadingClass}`}>
              From your first question to the shop shelf.
            </h2>
          </div>
          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
            {rows.map((row, i) => (
              <article
                key={row.id}
                aria-labelledby={`row-${row.id}`}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div className={cn("relative lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                  <PhotoPlaceholder
                    shot={row.label}
                    folder=""
                    src={row.image}
                    alt={row.imageAlt}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="aspect-[4/5] sm:aspect-[4/3]"
                  />
                  {row.overlay}
                </div>
                <div className="lg:col-span-5">
                  <Eyebrow>{row.label}</Eyebrow>
                  <h3
                    id={`row-${row.id}`}
                    className="mt-3 font-display text-[2rem] leading-[1.1] font-medium sm:text-[2.5rem]"
                  >
                    {row.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed">{row.body}</p>
                  <ul className="mt-6 space-y-3">
                    {row.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <Sparkles aria-hidden className="mt-1 size-4 shrink-0 text-rose" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={row.link.href}
                    className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-rose-700 underline-offset-4 hover:underline"
                  >
                    {row.link.label}
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                  {row.id === "business" && (
                    <p className="mt-2 text-sm text-plum-600">Fictional records as of {stockAsOf}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Product matches carousel with arrow controls. */}
      <section aria-labelledby="matches-heading" className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Product matches</Eyebrow>
            <h2 id="matches-heading" className={`mt-4 ${sectionHeadingClass}`}>
              Chosen for you. In stock today.
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Every match explains why it suits you, what is in it and what it costs. Products shown are fictional.
            </p>
          </div>
          <div className="mt-4">
            <ProductCarousel items={matches} labelledBy="matches-heading" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="pricing-heading" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 id="pricing-heading" className={`mt-4 ${sectionHeadingClass}`}>
              Simple plans in naira.
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Proposed launch pricing for businesses. Pay monthly, or prepay for longer and save.
            </p>
          </div>
          <div className="mt-12">
            <PricingPlans />
          </div>
          <Button asChild variant="link" className="mt-4 px-0 text-rose-700">
            <Link href="/pricing">Compare every plan feature</Link>
          </Button>
        </Container>
      </section>

      {/* Explore: pill tabs over a card grid. */}
      <section aria-labelledby="explore-heading" className="bg-cream py-20 sm:py-28">
        <Container>
          <Eyebrow>Explore GlowHub</Eyebrow>
          <h2 id="explore-heading" className={`mt-4 ${sectionHeadingClass}`}>
            Find your way in.
          </h2>
          <div className="mt-10">
            <ExploreGrid cards={exploreCards} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="trust-heading" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Trust and safeguards</Eyebrow>
            <h2 id="trust-heading" className={`mt-4 ${sectionHeadingClass}`}>
              Intelligent, and honest about it.
            </h2>
          </div>
          <div className="mt-12">
            <IconGrid items={safeguards} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="bg-cream pt-20 sm:pt-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 id="faq-heading" className={`mt-4 ${sectionHeadingClass}`}>
              Questions, answered.
            </h2>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/faq">Show more questions</Link>
            </Button>
          </div>
          <FaqList items={faqs.slice(0, 6)} />
        </Container>
      </section>

      <CtaBand
        title="Begin with your skin."
        body="Explore Glow Scan, or join early access to bring GlowHub to your beauty business."
      />
    </>
  );
}
