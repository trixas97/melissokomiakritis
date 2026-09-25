import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";

// Admin accounts for the Payload panel at /admin. The first user is created
// through the panel's "create first user" screen.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [],
};
