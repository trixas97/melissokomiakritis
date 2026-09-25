import type { Field, GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";

const aboutSection = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    { name: "title", type: "text", localized: true },
    {
      name: "description",
      type: "textarea",
      localized: true,
      admin: { description: "Leave a blank line between paragraphs." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Leave empty to show the placeholder photo." },
    },
  ],
});

// Content of the About page. The layout (photo side, background colour) is
// fixed in code; the owner edits the words and photos here.
export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About page",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    aboutSection("story", "Our story (Η Ιστορία μας) — full-screen photo at the top"),
    aboutSection("beekeeping", "Beekeeping (Μελισσοκομία)"),
    aboutSection("queenRearing", "Queen rearing (Βασιλοτροφία)"),
    aboutSection("nucs", "Nucs (Παραφυάδες)"),
  ],
};
