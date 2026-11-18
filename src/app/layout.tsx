import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

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
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
  },
  robots: config.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: palette.cream,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" className={`${manrope.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
