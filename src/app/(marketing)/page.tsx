import { ArrowDown, ArrowRight, Boxes, LineChart, Users } from "lucide-react";
import type { Metadata } from "next";
import { getImageProps } from "next/image";
import Link from "next/link";

import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import {
  Container,
  CtaBand,
  displayHeadingClass,
  Eyebrow,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { billingCycles, plans } from "@/config/pricing";
import { categoryOptions, labelFor } from "@/features/glow-scan/options";
import { recommendFromSample } from "@/features/glow-scan/sample-catalogue";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const textLink =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold text-plum underline decoration-rose underline-offset-[6px] hover:decoration-2";

const fromPrice = formatMoney(plans[0].monthlyPrice);
const maxSaving = Math.max(...billingCycles.map((c) => c.discountBps)) / 100;

/** A real run of the Glow Scan matcher on the sample catalogue, for one example set of answers. */
const exampleAnswers = { skinFeel: "dry", goal: "Hydration" } as const;
const example = recommendFromSample({
  skinFeel: exampleAnswers.skinFeel,
  goals: ["hydration"],
  currentProducts: [],
  sensitivities: ["fragrance"],
  otherExclusions: [],
  categories: ["cleanser", "moisturiser", "sunscreen"],
});
const examplePicks = example.routine
  .filter((s) => s.time === "morning")
  .map((s) => ({
    step: s,
    product: example.matches.find((m) => m.id === s.productId)!,
  }));

/** Art-directed hero: a wide stone composition on desktop, the original portrait crop on phones. */
function HeroImage() {
  const common = { alt: "", priority: true, quality: 75 } as const;
  const { props: wide } = getImageProps({
    ...common,
    src: "/images/hero/hero-stone-wide.webp",
    width: 2880,
    height: 1600,
    sizes: "100vw",
  });
  const { props: tall } = getImageProps({
    ...common,
    src: "/images/hero/hero-stone-tall.webp",
    width: 1400,
    height: 1865,
    sizes: "100vw",
  });
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={wide.srcSet}
        sizes={wide.sizes}
      />
      <source srcSet={tall.srcSet} sizes={tall.sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" comes from getImageProps (decorative) */}
      <img
        {...tall}
        className="absolute inset-0 size-full object-cover object-[50%_70%] md:object-center"
      />
    </picture>
  );
}

const businessFeatures = [
  {
    icon: Boxes,
    title: "Stock by batch and expiry",
    snippet: ["Product", "Batch", "Expires", "On hand"],
  },
  {
    icon: Users,
    title: "Customers and consultations",
    snippet: ["Customer", "Skin notes", "Last visit"],
  },
  {
    icon: LineChart,
    title: "Insights that show their working",
    snippet: ["Question", "Records used", "Your call"],
  },
];

export default function Home() {
  return (
    <>
      {/* 1 · Hero: stone still life, one oversized word, two audiences. */}
      <section aria-labelledby="hero-heading" className="bg-ivory">
        <Container className="pt-2 pb-16 sm:pt-4 lg:pb-24">
          <div className="relative">
            <div className="overflow-hidden rounded-lg bg-[#ded6c9]">
              <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:h-[min(calc(100svh-6rem),56rem)] lg:min-h-[38rem]">
                <HeroImage />
                <p
                  aria-hidden
                  className="absolute inset-x-0 top-[5%] text-center font-display text-[15.5vw] leading-none font-normal tracking-[0.02em] text-ink md:top-[4%] md:text-[11.5vw] xl:text-[10.5rem]"
                >
                  RADIANCE
                </p>
                <p className="absolute top-[24%] left-10 hidden text-xs font-semibold tracking-[0.24em] text-ink uppercase md:block">
                  Skincare intelligence
                </p>
                <p className="absolute top-[24%] right-10 hidden text-xs font-semibold tracking-[0.24em] text-ink uppercase md:block">
                  © 2026 GlowHub AI
                </p>

                <a
                  href="#glow-scan"
                  className="absolute right-10 bottom-10 hidden min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.2em] text-ink uppercase lg:inline-flex"
                >
                  Scroll <ArrowDown aria-hidden className="size-4" />
                </a>
              </div>
            </div>
            {/* Below the picture on phones and tablets; on the stone, bottom left, on desktop. */}
            <div className="mt-10 lg:absolute lg:bottom-10 lg:left-10 lg:mt-0 lg:max-w-sm">
              <HeroCopy />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Glow Scan: photo-led, one line. */}
      <section
        id="glow-scan"
        aria-labelledby="glow-scan-heading"
        className="scroll-mt-16 bg-ivory pb-24 sm:pb-32 lg:pb-40"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <figure className="lg:col-span-6">
            <PhotoPlaceholder
              shot="Glow Scan: close beauty portrait, cream on fingertips."
              folder="beauty-editorial"
              src="/images/beauty-editorial/cream-application.webp"
              alt="Close-up of a woman with deep brown skin touching cream to her cheekbone."
              sizes="(min-width: 1024px) 45vw, 100vw"
              position="50% 35%"
              className="aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]"
            />
            <figcaption className="mt-3 text-xs text-taupe">
              Model photograph. Not a Glow Scan user or result.
            </figcaption>
          </figure>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>Glow Scan</Eyebrow>
            <h2
              id="glow-scan-heading"
              className={cn("mt-5", displayHeadingClass)}
            >
              Meet your <em>skin.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-taupe">
              A little guidance. A better routine.
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link href="/glow-scan#start">Find my routine</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 3 · Product match: a real run of the matcher on the sample catalogue. */}
      <section
        aria-labelledby="match-heading"
        className="bg-sand py-24 sm:py-32 lg:py-40"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow>Find your match</Eyebrow>
            <h2 id="match-heading" className={cn("mt-5", displayHeadingClass)}>
              Chosen for your needs, budget and <em>preferences.</em>
            </h2>
            <PhotoPlaceholder
              shot="Unbranded amber skincare bottles in soft light."
              folder="skincare-products"
              src="/images/skincare-products/amber-bottles.webp"
              alt=""
              sizes="(min-width: 1024px) 35vw, 100vw"
              position="45% 55%"
              className="mt-10 hidden aspect-[3/2] lg:block"
            />
          </div>
          <figure className="rounded-lg bg-white p-6 sm:p-10 lg:col-span-7">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
              <span className="font-display text-2xl text-plum italic">
                Morning routine
              </span>
              <span className="text-xs text-taupe">
                Example answers: skin feels {exampleAnswers.skinFeel} ·{" "}
                {exampleAnswers.goal} · no fragrance
              </span>
            </figcaption>
            <ol className="divide-y divide-line">
              {examplePicks.map(({ step, product }, i) => (
                <li
                  key={step.id}
                  className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 py-5"
                >
                  <span
                    aria-hidden
                    className="font-display text-lg text-rose-700"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-taupe uppercase">
                      {labelFor(categoryOptions, step.category)}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-ink">
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm text-taupe">
                      {product.reasons[product.reasons.length - 1]}
                    </p>
                  </div>
                  <p className="font-semibold text-ink">
                    {formatMoney(product.price)}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-taupe">
              From the Glow Scan sample catalogue: illustrative products, not
              for sale.
            </p>
          </figure>
        </Container>
      </section>

      {/* 4 · Founders: atmospheric editorial gallery. */}
      <section
        aria-labelledby="founders-heading"
        className="bg-ivory py-24 sm:py-32 lg:py-40"
      >
        <Container>
          <h2
            id="founders-heading"
            className={cn(displayHeadingClass, "max-w-2xl")}
          >
            Made for the beauty behind <em>the business.</em>
          </h2>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
            <PhotoPlaceholder
              shot="A beauty entrepreneur in her skincare boutique."
              folder="beauty-businesses"
              src="/images/beauty-businesses/shop-owner.webp"
              alt="A smiling beauty entrepreneur gestures towards shelves of skincare in her boutique."
              sizes="(min-width: 1024px) 45vw, 100vw"
              position="85% 35%"
              className="col-span-2 aspect-[4/3] lg:col-span-6 lg:aspect-[5/6]"
            />
            <PhotoPlaceholder
              shot="Editorial portrait: afro hair, gold jewellery, dark backdrop."
              folder="beauty-editorial"
              src="/images/beauty-editorial/portrait-gold.webp"
              alt="Portrait of a woman with deep brown skin, natural hair and gold hoop earrings."
              sizes="(min-width: 1024px) 25vw, 50vw"
              position="50% 30%"
              className="aspect-[3/4] lg:col-span-3 lg:mt-24"
            />
            <PhotoPlaceholder
              shot="A beauty creator at her table of products."
              folder="beauty-businesses"
              src="/images/beauty-businesses/beauty-creator.webp"
              alt="A smiling beauty creator sits at a table of cosmetics with a mirror."
              sizes="(min-width: 1024px) 25vw, 50vw"
              position="50% 30%"
              className="aspect-[3/4] lg:col-span-3 lg:mt-48"
            />
          </div>
        </Container>
      </section>

      {/* 5 · For businesses: three features, compact interface snippets. */}
      <section
        aria-labelledby="business-heading"
        className="bg-plum py-24 text-ivory sm:py-32 lg:py-40"
      >
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-gold">For beauty businesses</Eyebrow>
              <h2
                id="business-heading"
                className={cn("mt-5", displayHeadingClass, "text-ivory")}
              >
                Beauty businesses, <em>beautifully run.</em>
              </h2>
            </div>
            <p className="text-lg text-ivory lg:col-span-4 lg:col-start-9">
              Inventory, customers and insights in one place.
            </p>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {businessFeatures.map(({ icon: Icon, title, snippet }) => (
              <li key={title} className="rounded-lg border border-ivory/15 p-6">
                <Icon aria-hidden className="size-5 text-gold" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <div
                  aria-hidden
                  className="mt-6 rounded-md bg-ivory/[0.06] p-3"
                >
                  <div className="flex gap-3 border-b border-ivory/15 pb-2">
                    {snippet.map((c) => (
                      <span
                        key={c}
                        className="flex-1 truncate font-mono text-[10px] tracking-[0.12em] text-gold uppercase"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-1.5 w-10/12 rounded-full bg-ivory/15" />
                    <div className="h-1.5 w-8/12 rounded-full bg-ivory/15" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/for-businesses"
            className="mt-10 inline-flex min-h-11 items-center gap-1.5 font-semibold text-ivory underline decoration-gold underline-offset-[6px] hover:decoration-2"
          >
            See what&apos;s included{" "}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Container>
      </section>

      {/* 6 · Pricing, in one line. */}
      <section
        aria-labelledby="pricing-heading"
        className="bg-ivory pt-24 sm:pt-32 lg:pt-40"
      >
        <Container className="text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h2
            id="pricing-heading"
            className={cn("mx-auto mt-5 max-w-3xl", displayHeadingClass)}
          >
            Plans in naira, from {fromPrice} a month.
          </h2>
          <p className="mt-5 text-lg text-taupe">
            Monthly, or prepay and save up to {maxSaving}%.
          </p>
          <Link href="/pricing" className={cn(textLink, "mt-8")}>
            Compare plans <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

function HeroCopy() {
  return (
    <>
      <h1
        id="hero-heading"
        className="font-display text-[2.5rem] leading-[1.08] font-normal tracking-[-0.02em] text-ink sm:text-[3.25rem] lg:text-[2.75rem] xl:text-[3.25rem]"
      >
        Beauty, <em>beautifully</em> understood.
      </h1>
      <p className="mt-4 text-lg text-ink">Skincare that feels made for you.</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Button asChild size="lg">
          <Link href="/glow-scan">Explore Glow Scan</Link>
        </Button>
        <Link href="/for-businesses" className={textLink}>
          For beauty businesses <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </>
  );
}
