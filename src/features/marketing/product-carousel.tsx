"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { ProductSingle, type ProductKind } from "@/components/marketing/product-art";
import { Button } from "@/components/ui/button";

export type MatchCard = {
  kind: ProductKind;
  step: string;
  product: string;
  priceLabel: string;
  keyIngredients: string;
  reason: string;
  inStock: number;
};

/** Horizontal, scroll-snapped product matches with previous/next controls. */
export function ProductCarousel({ items, labelledBy }: { items: readonly MatchCard[]; labelledBy: string }) {
  const track = useRef<HTMLUListElement>(null);

  function scroll(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll(-1)}>
          <ChevronLeft aria-hidden />
          <span className="sr-only">Previous products</span>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll(1)}>
          <ChevronRight aria-hidden />
          <span className="sr-only">Next products</span>
        </Button>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-labelledby={labelledBy}
        className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        {items.map((item) => (
          <li
            key={item.product}
            className="flex w-[78%] shrink-0 snap-start flex-col rounded-xl border bg-white sm:w-[45%] lg:w-[calc((100%-72px)/4)]"
          >
            <div className="rounded-t-xl bg-cream px-8 pt-6">
              <ProductSingle kind={item.kind} className="mx-auto max-w-48" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-rose-700 uppercase">{item.step}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{item.product}</h3>
              <p className="mt-1 text-sm text-plum-600">{item.keyIngredients}</p>
              <p className="mt-3 text-sm leading-relaxed">{item.reason}</p>
              <p className="mt-auto flex items-baseline justify-between pt-5">
                <span className="text-lg font-semibold">{item.priceLabel}</span>
                <span className="text-sm text-sage-700">{item.inStock} in stock</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
