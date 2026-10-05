import type { Field, GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";
import { parseYouTubeId } from "../lib/youtube";

// Pages a topic's button can link to
export const ABOUT_BUTTON_LINKS = ["queens", "cells", "nucs", "gallery", "faqs", "contact"] as const;

const eyebrowField: Field = {
  name: "eyebrow",
  type: "text",
  localized: true,
  admin: { description: "Optional small capitals above the title, e.g. “Since 1990”." },
};

const descriptionField: Field = {
  name: "description",
  type: "textarea",
  localized: true,
  admin: { description: "Leave a blank line between paragraphs." },
};

const imageField: Field = {
  name: "image",
  type: "upload",
  relationTo: "media",
  admin: { description: "Leave empty to show an empty tinted frame." },
};

const aboutSection = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    eyebrowField,
    { name: "title", type: "text", localized: true },
    descriptionField,
    imageField,
    {
      name: "button",
      type: "group",
      admin: { description: "Optional. Leave the label empty to hide the button." },
      fields: [
        { name: "label", type: "text", localized: true },
        {
          name: "link",
          label: "Links to",
          type: "select",
          options: ABOUT_BUTTON_LINKS.map((page) => ({
            label: page.charAt(0).toUpperCase() + page.slice(1),
            value: page,
          })),
        },
      ],
    },
  ],
});

// Content of the About page. The layout (which topic is a side-by-side block,
// which a full-width photo band) is fixed in code; the owner edits the words
// and photos here.
export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About page",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    {
      name: "story",
      label: "Our story (Η Ιστορία μας) — full-screen photo, then a centred introduction",
      type: "group",
      fields: [
        eyebrowField,
        { name: "title", type: "text", localized: true, admin: { description: "Large title over the photo." } },
        imageField,
        {
          name: "introTitle",
          label: "Introduction title",
          type: "text",
          localized: true,
          admin: { description: "Heading of the centred text under the photo." },
        },
        { ...descriptionField, label: "Introduction text" },
      ],
    },
    aboutSection("beekeeping", "Beekeeping (Μελισσοκομία) — text beside a photo"),
    aboutSection("queenRearing", "Queen rearing (Βασιλοτροφία) — full-width photo band"),
    aboutSection("nucs", "Nucs (Παραφυάδες) — full-width photo band"),
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
