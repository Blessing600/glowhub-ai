import Link from "next/link";

import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import { Button } from "@/components/ui/button";
import { glowScanCta } from "@/config/site";
import type { IconItem } from "@/features/marketing/content";
import { cn } from "@/lib/utils";

/** Max-width container with the brief's 16px mobile / 32px desktop gutters. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs font-semibold tracking-[0.24em] text-rose-700 uppercase", className)}
      {...props}
    />
  );
}

export const sectionHeadingClass =
  "font-display text-[2.25rem] leading-[1.05] font-medium tracking-[-0.01em] sm:text-[3rem] lg:text-[3.5rem]";

type SectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "cream" | "white" | "blush" | "plum";
  /** id of the heading, used for aria-labelledby. */
  headingId: string;
};

const tones = {
  cream: "bg-cream",
  white: "bg-white",
  blush: "bg-blush",
  plum: "bg-plum text-cream",
};

export function Section({
  eyebrow,
  title,
  intro,
  tone = "cream",
  headingId,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section aria-labelledby={headingId} className={cn("py-20 sm:py-28", tones[tone], className)} {...props}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow className={tone === "plum" ? "text-gold" : undefined}>{eyebrow}</Eyebrow>}
          <h2 id={headingId} className={cn("mt-4", sectionHeadingClass)}>
            {title}
          </h2>
          {intro && (
            <div className={cn("mt-5 text-lg leading-relaxed", tone === "plum" ? "text-cream" : "text-plum")}>
              {intro}
            </div>
          )}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}

export type PhotoSlot = { shot: string; folder: string; src?: string; alt?: string };

/** Page-level heading block for inner marketing pages, optionally with an editorial photo. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  photo,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  photo?: PhotoSlot;
  children?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden bg-cream">
      <Container
        className={cn(
          "pt-14 pb-16 sm:pt-20 sm:pb-20",
          photo && "grid items-center gap-10 lg:grid-cols-12 lg:gap-16 lg:pt-12 lg:pb-16",
        )}
      >
        <div className={cn("max-w-3xl", photo && "lg:col-span-6")}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.04] font-medium tracking-[-0.01em] sm:text-[3.5rem] lg:text-[4.25rem]">
            {title}
          </h1>
          {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">{intro}</div>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {photo && (
          <PhotoPlaceholder
            {...photo}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] lg:col-span-6 lg:aspect-[5/6] lg:max-h-[calc(100svh-9rem)] lg:w-full"
          />
        )}
      </Container>
    </div>
  );
}

/** Open list with top rules — lighter than boxed cards. */
export function IconGrid({ items, columns = 3 }: { items: readonly IconItem[]; columns?: 2 | 3 }) {
  return (
    <ul
      className={cn(
        "grid gap-x-10 gap-y-12 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
    >
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title} className="border-t border-plum/15 pt-6">
          <span className="flex size-12 items-center justify-center rounded-full bg-blush">
            <Icon aria-hidden className="size-5 text-rose-800" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-base leading-relaxed text-plum-600">{body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Closing editorial band shared by marketing pages: wide photo with a plum panel overlapping it. */
export function CtaBand({
  title = "Be first to try GlowHub.",
  body = "We're recruiting a small group of beauty businesses for pilots. Join early access to hear when it opens.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-cream py-20 sm:py-28">
      <Container className="grid items-center lg:grid-cols-12">
        <PhotoPlaceholder
          shot="Closing: two friends laughing at a vanity, skincare between them, warm evening light."
          folder="beauty-editorial"
          src="/images/beauty-editorial/friends-masks.webp"
          alt="Three friends laughing together while wearing skincare masks."
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="aspect-[4/3] lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:aspect-[16/10]"
        />
        <div className="relative mx-3 -mt-16 rounded-xl bg-plum p-8 text-cream sm:mx-8 sm:p-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:mt-0">
          <h2 id="cta-band-heading" className="font-display text-[2.25rem] leading-[1.05] font-medium sm:text-[3rem]">
            {title}
          </h2>
          <p className="mt-4 text-lg">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-cream text-plum hover:bg-blush">
              <Link href="/early-access">Get early access</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
            >
              <Link href={glowScanCta.href}>{glowScanCta.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
