import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/marketing/section";
import { CookiePreferences } from "@/components/marketing/cookie-preferences";
import { brandCopy } from "@/config/brand";
import { config } from "@/config/env";
import { footerNav, legalNav } from "@/config/site";

const linkClass = "inline-flex min-h-11 items-center rounded-md text-sm text-cream underline-offset-4 hover:underline";

export function SiteFooter() {
  const { legal } = config;
  return (
    <footer className="bg-ink text-cream">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo variant="wordmark-reverse" height={34} alt="GlowHub" />
            <p className="mt-4 text-sm text-cream">{brandCopy.secondaryLine}</p>
            <p className="mt-4 text-sm text-gold">
              Pre-launch prototype. Demo content uses fictional data.
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">{group.heading}</h2>
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
            <h2 className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">Legal</h2>
            {legalNav.length > 0 ? (
              <ul className="mt-3">
                {legalNav.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-cream">
                Terms, privacy and policy drafts are being prepared for legal review.
              </p>
            )}
            <CookiePreferences />
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/20 pt-6 text-sm text-cream sm:flex-row sm:flex-wrap sm:justify-between">
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
              "Support contact to be confirmed"
            )}
          </p>
        </div>
      </Container>
    </footer>
  );
}
