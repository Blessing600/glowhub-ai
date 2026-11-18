import type { MetadataRoute } from "next";

import { config } from "@/config/env";

/**
 * Crawlers are blocked everywhere except an approved production deploy.
 * robots.txt is advisory, not access control: staging must also be restricted.
 */
export default function robots(): MetadataRoute.Robots {
  if (!config.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/internal/", "/business/", "/admin/"] },
    sitemap: `${config.appUrl}/sitemap.xml`,
  };
}
