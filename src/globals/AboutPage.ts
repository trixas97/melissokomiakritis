import type { Field, GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";
import { parseYouTubeId } from "../lib/youtube";

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
    {
      name: "video",
      label: "Video (Βίντεο) — YouTube video after the topics",
      type: "group",
      fields: [
        { name: "title", type: "text", localized: true },
        {
          name: "description",
          type: "textarea",
          localized: true,
          admin: { description: "Optional. Leave a blank line between paragraphs." },
        },
        {
          name: "youtubeUrl",
          label: "YouTube link",
          type: "text",
          admin: {
            description: "Paste the video's YouTube link, e.g. https://www.youtube.com/watch?v=… Leave empty to hide the section.",
          },
          validate: (value: string | null | undefined) =>
            !value?.trim() || parseYouTubeId(value) !== null || "This isn't a YouTube video link.",
        },
      ],
    },
  ],
};
