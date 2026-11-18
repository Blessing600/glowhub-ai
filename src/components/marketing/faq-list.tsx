import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/features/marketing/content";

/** Native <details> disclosure: keyboard and screen-reader support with no JS. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y rounded-xl border bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-5 sm:px-6">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-md text-base font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-rose-700 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-plum-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
