"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ExploreCard = {
  href: string;
  title: string;
  body: string;
  image: string;
  audience: "shoppers" | "businesses";
};

const filters = [
  { value: "all", label: "All" },
  { value: "shoppers", label: "For shoppers" },
  { value: "businesses", label: "For businesses" },
] as const;

/** Pill-tab filter over a three-column card grid that links to real pages. */
export function ExploreGrid({ cards }: { cards: readonly ExploreCard[] }) {
  return (
    <Tabs defaultValue="all">
      <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
        {filters.map((f) => (
          <TabsTrigger
            key={f.value}
            value={f.value}
            className="h-11 flex-none rounded-full border border-plum/20 bg-white px-5 text-sm data-[state=active]:border-plum data-[state=active]:bg-plum data-[state=active]:text-cream"
          >
            {f.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {filters.map((f) => (
        <TabsContent key={f.value} value={f.value} className="mt-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards
              .filter((c) => f.value === "all" || c.audience === f.value)
              .map((card) => (
                <li key={card.title}>
                  <Link
                    href={card.href}
                    className="group block h-full overflow-hidden rounded-xl border bg-white transition-colors hover:border-plum/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-blush">
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="flex items-start justify-between gap-3 text-lg font-semibold">
                        {card.title}
                        <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-rose-700" />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-plum-600">{card.body}</p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
