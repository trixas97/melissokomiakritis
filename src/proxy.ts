import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { readSeoConfig } from "./lib/seo";

const handleI18nRouting = createMiddleware(routing);

// Locale routing, plus: outside production, every page response also carries
// X-Robots-Tag (pages additionally have a noindex meta tag — see lib/seo.ts).
export function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  if (!readSeoConfig().indexable) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  // Skip the Payload admin and API, Next.js internals and static files
  matcher: "/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)",
};
