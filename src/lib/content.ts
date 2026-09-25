import "server-only";
import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";
import type { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

// Cached per request, so the layout, pages and i18n config share one query per global.

export const getHomePage = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({ slug: "home-page", locale, depth: 1 }),
);

export const getAboutPage = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({ slug: "about-page", locale, depth: 1 }),
);

export const getSiteSettings = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({ slug: "site-settings", locale, depth: 1 }),
);

export const getAvailability = cache(async () =>
  (await getPayloadClient()).findGlobal({ slug: "availability" }),
);

export const getLabels = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({ slug: "labels", locale }),
);
