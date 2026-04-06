import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "cecropia-queen",
    category: "queen-bees",
    nameEl: "Βασίλισσα Κεκρόπια",
    nameEn: "Cecropia Queen Bee",
    descEl: "Υψηλής ποιότητας βασίλισσα κεκρόπια, εκτρεφόμενη στην Κρήτη.",
    descEn: "High-quality Cecropia queen bee, bred in Crete.",
    price: 25,
  },
  {
    slug: "caucasica-queen",
    category: "queen-bees",
    nameEl: "Βασίλισσα Καυκάσια",
    nameEn: "Caucasica Queen Bee",
    descEl: "Ήρεμη και παραγωγική βασίλισσα καυκάσια.",
    descEn: "Calm and productive Caucasica queen bee.",
    price: 25,
  },
  {
    slug: "queen-cells",
    category: "queen-cells",
    nameEl: "Βασιλικά Κελιά",
    nameEn: "Queen Cells",
    descEl: "Βασιλικά κελιά έτοιμα για εισαγωγή στην κυψέλη.",
    descEn: "Queen cells ready for hive introduction.",
    price: 10,
  },
  {
    slug: "bee-colonies",
    category: "bee-colonies",
    nameEl: "Μελισσοκολωνίες",
    nameEn: "Bee Colonies",
    descEl: "Υγιείς και δυνατές μελισσοκολωνίες.",
    descEn: "Healthy and strong bee colonies.",
    price: null,
    priceHidden: true,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log("Seeded 4 products.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
