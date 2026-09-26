import { connection } from "next/server";

// Environment-aware SEO settings, read at RUNTIME so one Docker image can be
// promoted from UAT to production unchanged (see docker-compose.*.yml).

const FALLBACK_SITE_URL = "https://melissokomiakritis.gr";

export type SeoConfig = {
  /** Only production may be indexed — fail-closed: unset or any other SITE_ENV means noindex. */
  indexable: boolean;
  /** Absolute origin of this deployment, without a trailing slash. */
  siteUrl: string;
};

/** Reads the environment directly. For proxy.ts, which always runs per request. */
export function readSeoConfig(): SeoConfig {
  // docker-compose passes `${NEXT_PUBLIC_SITE_URL}` through, so an omitted value
  // arrives as "" rather than undefined — treat blank as absent.
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return {
    // Trimmed so a stray space or CRLF in a hand-edited .env cannot silently deindex production.
    indexable: process.env.SITE_ENV?.trim() === "production",
    siteUrl: (configured || FALLBACK_SITE_URL).replace(/\/+$/, ""),
  };
}

/**
 * For pages, metadata and route handlers. `connection()` opts the caller into
 * per-request rendering; without it the route is prerendered at build time and
 * the values are frozen into the image.
 */
export async function getSeoConfig(): Promise<SeoConfig> {
  await connection();
  return readSeoConfig();
}
