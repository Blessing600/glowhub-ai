import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Playfair_Display } from "next/font/google";

import { brandCopy, palette } from "@/config/brand";
import { config } from "@/config/env";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.appUrl),
  title: {
    default: `${brandCopy.name} — ${brandCopy.proposition}`,
    template: `%s · ${brandCopy.name}`,
  },
  description: brandCopy.secondaryLine,
  applicationName: brandCopy.name,
  openGraph: {
    type: "website",
    siteName: brandCopy.name,
    title: brandCopy.proposition,
    description: brandCopy.secondaryLine,
    url: "/",
    images: [{ url: "/images/beauty-businesses/shop-owner.webp", width: 1800, height: 1200 }],
  },
  robots: config.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: palette.ivory,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" className={`${manrope.variable} ${playfair.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
