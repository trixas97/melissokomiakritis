import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Skip the Payload admin and API, Next.js internals and static files
  matcher: "/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)",
};
