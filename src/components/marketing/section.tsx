import Link from "next/link";

import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import { Button } from "@/components/ui/button";
import { getStartedHref } from "@/config/site";
import { cn } from "@/lib/utils";

/** Max-width container with 16px mobile / 24–32px desktop gutters. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

/** Small editorial label: Manrope, widely tracked uppercase. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[11px] font-semibold tracking-[0.24em] text-rose-700 uppercase", className)}
      {...props}
    />
  );
}

/** Large editorial heading: Playfair Display, never used for dense UI. */
export const displayHeadingClass =
  "font-display text-[2.25rem] leading-[1.1] font-normal tracking-[-0.015em] text-balance text-plum sm:text-[2.75rem] lg:text-[3.25rem]";

const tones = {
  ivory: "bg-ivory",
  white: "bg-white",
  sand: "bg-sand",
  plum: "bg-plum text-ivory",
};
export type Tone = keyof typeof tones;

type SectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: Tone;
  /** id of the heading, used for aria-labelledby. */
  headingId: string;
};

export function Section({
  eyebrow,
  title,
  intro,
  tone = "ivory",
  headingId,
  className,
  children,
  ...props
}: SectionProps) {
  const dark = tone === "plum";
  return (
    <section aria-labelledby={headingId} className={cn("py-24 sm:py-32 lg:py-40", tones[tone], className)} {...props}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow className={dark ? "text-gold" : undefined}>{eyebrow}</Eyebrow>}
          <h2 id={headingId} className={cn("mt-4", displayHeadingClass, dark && "text-ivory")}>
            {title}
          </h2>
          {intro && (
            <div className={cn("mt-5 text-lg leading-relaxed", dark ? "text-ivory" : "text-taupe")}>{intro}</div>
          )}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}

export type PhotoSlot = { shot: string; folder: string; src?: string; alt?: string; position?: string };

/** Page-level heading block for inner pages, optionally with an editorial photo. */
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
    <div className="overflow-hidden bg-ivory">
      <Container
        className={cn(
          "pt-14 pb-16 sm:pt-20 sm:pb-20",
          photo && "grid items-center gap-10 lg:grid-cols-12 lg:gap-16 lg:pt-12 lg:pb-16",
        )}
      >
        <div className={cn("max-w-3xl", photo && "lg:col-span-6")}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.06] font-normal tracking-[-0.02em] text-balance text-plum sm:text-[3.5rem] lg:text-[4rem]">
            {title}
          </h1>
          {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-taupe sm:text-xl">{intro}</div>}
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
export function RuledList({
  items,
  columns = 3,
}: {
  items: ReadonlyArray<{ title: string; body: string }>;
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-10 gap-y-10 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
    >
      {items.map(({ title, body }) => (
        <li key={title} className="border-t border-plum/20 pt-5">
          <h3 className="text-lg font-semibold text-plum">{title}</h3>
          <p className="mt-2 leading-relaxed text-taupe">{body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Closing band shared by marketing pages: one strong action on deep plum. */
export function CtaBand({
  title = "Bring intelligence to your beauty business.",
  body = "Your workspace is minutes away.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-ivory py-20 sm:py-32">
      <Container>
        <div className="grid overflow-hidden rounded-lg bg-plum text-ivory lg:grid-cols-12">
          <div className="flex flex-col justify-center p-8 sm:p-14 lg:col-span-7 lg:p-20">
            <h2
              id="cta-band-heading"
              className="max-w-xl font-display text-[2.25rem] leading-[1.1] font-normal tracking-[-0.015em] text-balance sm:text-[3rem]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ivory">{body}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg" variant="ivory">
                <Link href={getStartedHref}>Get started</Link>
              </Button>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-11 items-center font-semibold text-ivory underline decoration-rose underline-offset-4 hover:decoration-2"
              >
                See how it works
              </Link>
            </div>
          </div>
          <PhotoPlaceholder
            shot="Closing: one hand passing a skincare dropper bottle to another."
            folder="skincare-products"
            src="/images/skincare-products/dropper-hands.webp"
            alt=""
            sizes="(min-width: 1024px) 40vw, 100vw"
            position="50% 50%"
            className="aspect-[16/9] rounded-none lg:col-span-5 lg:aspect-auto lg:min-h-[28rem]"
          />
        </div>
      </Container>
    </section>
  );
}
