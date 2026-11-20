"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getStartedHref, primaryNav } from "@/config/site";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href="/" className="mr-auto shrink-0 rounded-md lg:mr-10" aria-label="GlowHub AI home">
          <Logo height={26} alt="" priority />
        </Link>

        <nav aria-label="Main" className="mr-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-taupe hover:text-plum",
                    "aria-[current=page]:text-plum aria-[current=page]:underline aria-[current=page]:decoration-rose aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden text-plum lg:inline-flex">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href={getStartedHref}>Get started</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu aria-hidden className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw,22rem)] bg-ivory p-0">
              <div className="border-b border-line px-5 py-4">
                <SheetTitle className="font-display text-2xl text-plum">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </div>
              <nav aria-label="Mobile" className="px-3 py-3">
                <ul className="flex flex-col">
                  {primaryNav.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                        className="flex h-12 items-center rounded-md px-3 text-base font-medium text-ink hover:bg-sand aria-[current=page]:bg-sand aria-[current=page]:text-plum"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-3 border-t border-line px-5 py-5">
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href={getStartedHref}>Get started</Link>
                </Button>
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
