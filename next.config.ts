import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // Retired routes (Nov 2026 redesign): the scripted demo, the waitlist and the
    // shopper page, whose content now lives on /glow-scan.
    return [
      { source: "/demo", destination: "/how-it-works", permanent: true },
      { source: "/early-access", destination: "/register", permanent: true },
      { source: "/for-shoppers", destination: "/glow-scan", permanent: true },
    ];
  },
};

export default nextConfig;
