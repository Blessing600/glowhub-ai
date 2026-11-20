import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { CookiePreferences } from "@/components/marketing/cookie-preferences";
import { Container } from "@/components/marketing/section";
import { brandCopy } from "@/config/brand";
import { config } from "@/config/env";
import { footerNav, legalNav } from "@/config/site";

const linkClass = "inline-flex min-h-11 items-center rounded-md text-sm text-ivory underline-offset-4 hover:underline";
const headingClass = "font-mono text-xs font-medium tracking-[0.18em] text-gold uppercase";

export function SiteFooter() {
  const { legal } = config;
  return (
    <footer className="bg-espresso text-ivory">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Logo variant="wordmark-reverse" height={28} alt="GlowHub AI" />
            <p className="mt-5 text-sm leading-relaxed text-ivory">{brandCopy.secondaryLine}</p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className={headingClass}>{group.heading}</h2>
              <ul className="mt-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Legal">
            <h2 className={headingClass}>Legal</h2>
            <ul className="mt-3">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferences />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ivory/20 pt-6 text-sm text-ivory sm:flex-row sm:flex-wrap sm:justify-between">
          <p>
            {legal.entityName ? `© ${legal.entityName}` : "Operating entity to be confirmed"}
            {legal.address ? ` · ${legal.address}` : ""}
          </p>
          <p>
            {legal.supportEmail ? (
              <a href={`mailto:${legal.supportEmail}`} className="underline underline-offset-4">
                {legal.supportEmail}
              </a>
            ) : (
              <Link href="/contact" className="underline underline-offset-4">
                Contact support
              </Link>
            )}
          </p>
        </div>
      </Container>
    </footer>
  );
}
