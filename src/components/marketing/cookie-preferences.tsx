"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Cookie preferences (brief §13). The prototype sets no analytics or marketing
 * cookies, so there is nothing optional to switch on. When optional tracking is
 * added it must stay off until consent is given here.
 */
export function CookiePreferences() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-md text-sm text-cream underline-offset-4 hover:underline"
        >
          Cookie preferences
        </button>
      </DialogTrigger>
      <DialogContent className="bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Cookie preferences</DialogTitle>
          <DialogDescription className="text-plum-600">
            This prototype uses only what is needed to run the site.
          </DialogDescription>
        </DialogHeader>
        <dl className="divide-y rounded-lg border bg-white text-sm">
          <div className="p-4">
            <dt className="font-semibold">Essential — always on</dt>
            <dd className="mt-1 text-plum-600">
              Needed for the site to load and work. No personal profile is built.
            </dd>
          </div>
          <div className="p-4">
            <dt className="font-semibold">Analytics — not used</dt>
            <dd className="mt-1 text-plum-600">No analytics cookies or trackers are active.</dd>
          </div>
          <div className="p-4">
            <dt className="font-semibold">Marketing — not used</dt>
            <dd className="mt-1 text-plum-600">No advertising or marketing cookies are active.</dd>
          </div>
        </dl>
        <p className="text-sm text-plum-600">
          If optional cookies are added later, they will stay off until you choose to allow them here.
        </p>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
