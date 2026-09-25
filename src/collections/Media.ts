import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";

// Uploaded images and the home hero video. Stored in Cloudflare R2 when S3_*
// env vars are set (see payload.config.ts), otherwise on local disk in ./media.
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  upload: {
    staticDir: "media",
    // Videos are stored as-is; Payload only generates imageSizes for images
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
    // The owner picks the point that must stay visible when a photo is cropped
    // (hexagons, cards, full-screen heroes); the site uses it as object-position.
    focalPoint: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
      admin: {
        description: "Describe the image for screen readers and SEO",
      },
    },
  ],
};
