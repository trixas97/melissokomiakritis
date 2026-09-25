import type { GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";
import { group, localizedText, localizedTextarea, mediaUpload } from "./fields";

// Site-wide content: logo, search-engine text and the footer's details.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    { name: "siteName", label: "Business name", type: "text", admin: { description: "Used in the copyright line and as the logo's text fallback." } },
    mediaUpload("logo", "Logo", "Shown in the navbar and the footer."),
    group("seo", "Search engines", [
      localizedText("title", "Page title (browser tab and Google)"),
      localizedTextarea("description", "Description (shown under the title in Google)"),
    ]),
    group("footer", "Footer", [
      localizedTextarea("tagline"),
      localizedText("address"),
      { name: "email", type: "email" },
      { name: "phone", type: "text" },
      { name: "domain", type: "text", admin: { description: "Shown in the bottom bar, e.g. melissokomiakritis.gr" } },
    ]),
  ],
};
