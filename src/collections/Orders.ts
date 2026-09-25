import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";

// Orders are created by the shop's order-form server action via the Local API.
// There is no public REST access; the owner follows up manually from /admin.
export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "product", "quantity", "phone", "status", "createdAt"],
  },
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    { name: "product", type: "relationship", relationTo: "products", required: true },
    { name: "quantity", type: "number", required: true, min: 1 },
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "notes", type: "textarea" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "locale",
      type: "select",
      required: true,
      defaultValue: "el",
      options: [
        { label: "Ελληνικά", value: "el" },
        { label: "English", value: "en" },
      ],
      admin: { position: "sidebar", description: "Language the customer ordered in" },
    },
  ],
};
