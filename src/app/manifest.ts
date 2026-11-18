import type { MetadataRoute } from "next";

import { brandCopy, palette } from "@/config/brand";

/**
 * PWA manifest. No service worker is registered: the prototype must not
 * cache consultation, scan or other sensitive data (brief §15).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GlowHub AI",
    short_name: brandCopy.name,
    description: brandCopy.secondaryLine,
    start_url: "/",
    display: "standalone",
    background_color: palette.cream,
    theme_color: palette.plum,
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/brand/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
