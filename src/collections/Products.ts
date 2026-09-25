import type { Access, CollectionConfig } from "payload";
import { isLoggedIn } from "./access";

// Visitors only see active products; admins see everything.
const readActiveOrAll: Access = ({ req: { user } }) =>
  user ? true : { active: { equals: true } };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "priceHidden", "active"],
  },
  access: {
    read: readActiveOrAll,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Queen bees", value: "queen-bees" },
        { label: "Queen cells", value: "queen-cells" },
        { label: "Bee nucs", value: "bee-nucs" },
      ],
    },
    { name: "description", type: "textarea", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "price", type: "number", min: 0, admin: { description: "Price in euros" } },
    {
      name: "priceHidden",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show “price on request” instead of the price" },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Inactive products are hidden from the shop" },
    },
  ],
};
