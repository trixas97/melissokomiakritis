import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getLabels } from "@/lib/content";
import { mergeLabels } from "@/lib/labels";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;

  // Admin-edited labels override the message files. If the database can't be
  // reached (e.g. during a Docker build) the files alone are used.
  let labels = null;
  try {
    labels = await getLabels(locale);
  } catch (error) {
    console.error("[i18n] Could not load Labels from Payload, using message files only", error);
  }

  return {
    locale,
    messages: mergeLabels(messages, labels),
  };
});
