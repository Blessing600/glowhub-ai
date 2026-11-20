"use client";

import { Inbox } from "lucide-react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStartedHref } from "@/config/site";
import { operationsModules } from "@/features/marketing/content";

/**
 * Workspace modules rendered as real interface states. A new workspace starts
 * empty, so each panel shows its true first-day state — no pre-filled records.
 */
export function ModuleTabs() {
  return (
    <Tabs defaultValue={operationsModules[0].id} className="gap-6">
      <TabsList
        variant="line"
        aria-label="Workspace modules"
        className="h-auto w-full flex-wrap justify-start gap-1 border-b border-line pb-1"
      >
        {operationsModules.map((m) => (
          <TabsTrigger
            key={m.id}
            value={m.id}
            className="h-11 flex-none px-4 text-sm font-semibold text-taupe data-[state=active]:text-plum after:bg-rose"
          >
            {m.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {operationsModules.map((m) => (
        <TabsContent key={m.id} value={m.id} className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <h3 className="font-display text-[1.75rem] font-medium text-plum">{m.name}</h3>
            <p className="mt-3 leading-relaxed text-taupe">{m.summary}</p>
          </div>
          <figure className="overflow-hidden rounded-lg border border-line bg-white">
            <div aria-hidden className="flex items-center gap-2 border-b border-line bg-ivory px-4 py-3">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="ml-3 font-mono text-xs text-taupe">workspace / {m.id}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <caption className="sr-only">{m.name} table in a new workspace</caption>
                <thead>
                  <tr className="border-b border-line">
                    {m.columns.map((c) => (
                      <th key={c} scope="col" className="px-4 py-3 font-mono text-xs font-medium tracking-[0.08em] text-taupe uppercase">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={m.columns.length} className="px-4 py-12">
                      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                        <Inbox aria-hidden className="size-6 text-rose" />
                        <p className="mt-3 text-ink">{m.empty}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <figcaption className="border-t border-line px-4 py-3 text-xs text-taupe">
              A new workspace on day one. Everything you see after that is your own data.{" "}
              <Link href={getStartedHref} className="font-semibold text-plum underline decoration-rose underline-offset-4">
                Create yours
              </Link>
            </figcaption>
          </figure>
        </TabsContent>
      ))}
    </Tabs>
  );
}
