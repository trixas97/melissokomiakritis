import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSeoConfig } from "@/lib/seo";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/queens", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cells", changeFrequency: "weekly", priority: 0.9 },
  { path: "/nucs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.5 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
] as const;

// One entry per page and language, each listing its other-language versions.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteUrl } = await getSeoConfig();
  const url = (locale: string, path: string) => `${siteUrl}/${locale}${path}`;

  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, path)])),
      },
    })),
  );
}
