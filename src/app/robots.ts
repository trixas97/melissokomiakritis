import type { MetadataRoute } from "next";
import { getSeoConfig } from "@/lib/seo";

// UAT and local keep crawlers out. Paired with the noindex tag in
// [locale]/layout.tsx and the X-Robots-Tag header in proxy.ts — a bot that
// honours robots.txt never fetches the page, one that ignores it still sees them.
// Also the container healthcheck target (see docker-compose.yml).
export default async function robots(): Promise<MetadataRoute.Robots> {
  const { indexable, siteUrl } = await getSeoConfig();

  if (!indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
