import type { Field, GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";

// Select values are month numbers as strings ("1"–"12"); the site formats them
// in the visitor's language.
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => ({
  label: new Intl.DateTimeFormat("en", { month: "long" }).format(new Date(2000, index, 1)),
  value: String(index + 1),
}));

const monthRange = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  admin: {
    description: "Shown as a badge on the home page card. Leave empty to hide the badge.",
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "from", type: "select", options: MONTH_OPTIONS },
        { name: "to", type: "select", options: MONTH_OPTIONS },
      ],
    },
  ],
});

// Seasonal availability per product category, edited by the owner each season.
export const Availability: GlobalConfig = {
  slug: "availability",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    monthRange("queenBees", "Queen bees"),
    monthRange("queenCells", "Queen cells"),
    monthRange("beeNucs", "Bee nucs"),
  ],
};
