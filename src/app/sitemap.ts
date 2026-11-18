import type { MetadataRoute } from "next";

import { config } from "@/config/env";
import { publicRoutes } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({ url: `${config.appUrl}${route}` }));
}
