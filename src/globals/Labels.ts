import type { Field, GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";

// UI labels the owner can reword. Each group/field mirrors a namespace/key in
// src/messages/*.json exactly; src/lib/labels.ts merges non-empty values over
// those files at request time, so every t("nav.home")-style lookup — including
// in client components — shows the admin's wording. The JSON files remain the
// fallback for anything left empty.
export const LABEL_KEYS = {
  nav: ["home", "about", "queens", "cells", "nucs", "faqs", "gallery", "contact"],
  footer: ["quick_links", "contact_heading", "rights"],
  shop: ["title", "shipping_notice", "price_hidden", "order_button"],
  order_form: ["name", "email", "phone", "quantity", "notes", "submit", "success", "error"],
  home: ["available"],
  about: ["discover"],
  gallery: ["title"],
  faqs: ["title"],
  contact: ["title"],
} as const;

const GROUP_LABELS: Record<keyof typeof LABEL_KEYS, string> = {
  nav: "Navigation menu",
  footer: "Footer headings",
  shop: "Shop",
  order_form: "Order form",
  home: "Home page badges ({range} is replaced by the months)",
  about: "About page",
  gallery: "Gallery page",
  faqs: "FAQs page",
  contact: "Contact page",
};

const humanize = (key: string) => key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

export const Labels: GlobalConfig = {
  slug: "labels",
  label: "Labels (menu, buttons, headings)",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: Object.entries(LABEL_KEYS).map(
    ([group, keys]): Field => ({
      name: group,
      label: GROUP_LABELS[group as keyof typeof LABEL_KEYS],
      type: "group",
      fields: keys.map((key): Field => ({ name: key, label: humanize(key), type: "text", localized: true })),
    }),
  ),
};
