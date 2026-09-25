// Seeds the initial products, availability months and all page content and
// labels (text only — photos come from src/scripts/import-media.ts).
// Run with: npm run seed. Skips anything already filled in, so it is safe to re-run.
import { readFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "@payload-config";
import { LABEL_KEYS } from "./globals/Labels";

type Messages = Record<string, Record<string, string>>;
const messages: Record<"el" | "en", Messages> = {
  el: JSON.parse(readFileSync(new URL("./messages/el.json", import.meta.url), "utf8")),
  en: JSON.parse(readFileSync(new URL("./messages/en.json", import.meta.url), "utf8")),
};

const products = [
  {
    slug: "cecropia-queen",
    category: "queen-bees",
    name: { el: "Βασίλισσα Κεκρόπια", en: "Cecropia Queen Bee" },
    description: {
      el: "Υψηλής ποιότητας βασίλισσα κεκρόπια, εκτρεφόμενη στην Κρήτη.",
      en: "High-quality Cecropia queen bee, bred in Crete.",
    },
    price: 25,
    priceHidden: false,
  },
  {
    slug: "caucasica-queen",
    category: "queen-bees",
    name: { el: "Βασίλισσα Καυκάσια", en: "Caucasica Queen Bee" },
    description: {
      el: "Ήρεμη και παραγωγική βασίλισσα καυκάσια.",
      en: "Calm and productive Caucasica queen bee.",
    },
    price: 25,
    priceHidden: false,
  },
  {
    slug: "queen-cells",
    category: "queen-cells",
    name: { el: "Βασιλικά Κελιά", en: "Queen Cells" },
    description: {
      el: "Βασιλικά κελιά έτοιμα για εισαγωγή στην κυψέλη.",
      en: "Queen cells ready for hive introduction.",
    },
    price: 10,
    priceHidden: false,
  },
  {
    slug: "bee-nucs",
    category: "bee-nucs",
    name: { el: "Παραφυάδες", en: "Bee Nucs" },
    description: {
      el: "Υγιείς και δυνατές παραφυάδες.",
      en: "Healthy and strong bee nucs.",
    },
    price: null,
    priceHidden: true,
  },
] as const;

// Top-level await: `payload run` exits as soon as the import settles, so the
// work must finish before this module does. Errors propagate and exit 1.
const payload = await getPayload({ config });

for (const product of products) {
  const existing = await payload.find({
    collection: "products",
    where: { slug: { equals: product.slug } },
    limit: 1,
  });
  if (existing.docs.length > 0) continue;

  const created = await payload.create({
    collection: "products",
    locale: "el",
    data: {
      slug: product.slug,
      category: product.category,
      name: product.name.el,
      description: product.description.el,
      price: product.price,
      priceHidden: product.priceHidden,
    },
  });
  await payload.update({
    collection: "products",
    id: created.id,
    locale: "en",
    data: { name: product.name.en, description: product.description.en },
  });
  payload.logger.info(`Seeded ${product.slug}`);
}

// Placeholder season — the owner sets the real months in /admin → Availability
const availability = await payload.findGlobal({ slug: "availability" });
if (!availability.queenBees?.from) {
  await payload.updateGlobal({
    slug: "availability",
    data: {
      queenBees: { from: "4", to: "9" },
      queenCells: { from: "4", to: "6" },
      beeNucs: { from: "3", to: "5" },
    },
  });
  payload.logger.info("Seeded availability months");
}

// Placeholder About page copy — the owner replaces it in /admin → About page
const aboutCopy = {
  el: {
    beekeeping: {
      title: "Μελισσοκομία",
      description:
        "Φροντίζουμε τα μελίσσια μας στην Κρήτη όλο τον χρόνο, με σεβασμό στη φύση και στους ρυθμούς της μέλισσας.\n\nΚάθε κυψέλη ελέγχεται τακτικά για την υγεία και τη δύναμή της, ώστε τα μελίσσια μας να μένουν δυνατά και ήρεμα.",
    },
    queenRearing: {
      title: "Βασιλοτροφία",
      description:
        "Εκτρέφουμε βασίλισσες από επιλεγμένα μελίσσια με καλή συμπεριφορά, παραγωγικότητα και αντοχή.\n\nΚάθε βασίλισσα παρακολουθείται από το βασιλικό κελί μέχρι την ωοτοκία, πριν φτάσει στα χέρια σας.",
    },
    nucs: {
      title: "Παραφυάδες",
      description:
        "Οι παραφυάδες μας είναι μικρά, υγιή μελίσσια με νέα βασίλισσα, γόνο και αποθέματα, έτοιμα να αναπτυχθούν.\n\nΕίναι ο πιο εύκολος τρόπος να ξεκινήσετε ή να μεγαλώσετε το μελισσοκομείο σας.",
    },
  },
  en: {
    beekeeping: {
      title: "Beekeeping",
      description:
        "We tend our hives in Crete all year round, working with nature and the rhythm of the bees.\n\nEvery hive is checked regularly for health and strength, so our colonies stay strong and calm.",
    },
    queenRearing: {
      title: "Queen Rearing",
      description:
        "We raise queens from selected colonies with good temperament, productivity and resilience.\n\nEach queen is followed from queen cell to laying before she reaches you.",
    },
    nucs: {
      title: "Nucs",
      description:
        "Our nucs are small, healthy colonies with a young queen, brood and stores, ready to grow.\n\nThey're the easiest way to start or expand your apiary.",
    },
  },
} as const;

const aboutPage = await payload.findGlobal({ slug: "about-page", locale: "el" });
if (!aboutPage.beekeeping?.title) {
  for (const locale of ["el", "en"] as const) {
    await payload.updateGlobal({ slug: "about-page", locale, data: aboutCopy[locale] });
  }
  payload.logger.info("Seeded About page copy");
}

// "Our story" hero — the description is openly a placeholder, since the story
// itself has to come from the client
const storyCopy = {
  el: {
    title: "Η Ιστορία μας",
    description:
      "Εδώ θα μπει η ιστορία του μελισσοκομείου: πώς ξεκίνησε, ποιοι είμαστε και τι μας κινεί.",
  },
  en: {
    title: "Our Story",
    description: "This is where the story of our apiary goes: how it began, who we are and what drives us.",
  },
} as const;

if (!aboutPage.story?.title) {
  for (const locale of ["el", "en"] as const) {
    await payload.updateGlobal({ slug: "about-page", locale, data: { story: storyCopy[locale] } });
  }
  payload.logger.info("Seeded About page story");
}

// Home page — the texts the site showed before they moved into Payload.
// The badge and small card labels were the same in both languages.
const homeCopy = (locale: "el" | "en") => {
  const t = messages[locale].home;
  return {
    hero: {
      badge: "Κρήτη · Crete",
      title: t.hero_title,
      subtitle: t.hero_subtitle,
      ctaLabel: t.cta,
      scrollLabel: "Scroll",
    },
    offer: {
      title: t.categories_title,
      cardCta: t.cat_cta,
      queenBees: { title: t.cat_queens, eyebrow: "Apis Mellifera · Κρήτη", description: t.cat_queens_desc },
      queenCells: { title: t.cat_cells, eyebrow: "Carniolan Hybrid · Grafted", description: t.cat_cells_desc },
      beeNucs: { title: t.cat_nucs, eyebrow: "Nucleus Colony · Κρήτη", description: t.cat_nucs_desc },
    },
    why: {
      title: t.trust_title,
      heritage: { title: t.trust_heritage, description: t.trust_heritage_desc },
      healthy: { title: t.trust_healthy, description: t.trust_healthy_desc },
      service: { title: t.trust_service, description: t.trust_service_desc },
    },
  };
};

const homePage = await payload.findGlobal({ slug: "home-page", locale: "el" });
if (!homePage.hero?.title) {
  for (const locale of ["el", "en"] as const) {
    await payload.updateGlobal({ slug: "home-page", locale, data: homeCopy(locale) });
  }
  payload.logger.info("Seeded Home page copy");
}

// Site settings — business details and footer (placeholder phone until the client sends it)
const siteSettings = await payload.findGlobal({ slug: "site-settings", locale: "el" });
if (!siteSettings.siteName) {
  for (const locale of ["el", "en"] as const) {
    await payload.updateGlobal({
      slug: "site-settings",
      locale,
      data: {
        siteName: "Μελισσοκομία Κρήτης",
        seo: {
          title: "Μελισσοκομία Κρήτης — Pure Cretan Queen Bees",
          description:
            "Queen bees, queen cells, and bee nucs bred with care in the heart of Crete. Βασίλισσες μέλισσες, βασιλικά κελιά και παραφυάδες από την Κρήτη.",
        },
        footer: {
          tagline: messages[locale].footer.tagline,
          address: "Crete, Greece",
          email: "info@melissokomiakritis.gr",
          phone: "+30 XXX XXX XXXX",
          domain: "melissokomiakritis.gr",
        },
      },
    });
  }
  payload.logger.info("Seeded Site settings");
}

// Labels — copied from the message files, key for key (see src/globals/Labels.ts)
const labels = await payload.findGlobal({ slug: "labels", locale: "el" });
if (!labels.nav?.home) {
  for (const locale of ["el", "en"] as const) {
    const data = Object.fromEntries(
      Object.entries(LABEL_KEYS).map(([group, keys]) => [
        group,
        Object.fromEntries(keys.map((key) => [key, messages[locale][group][key]])),
      ]),
    );
    await payload.updateGlobal({ slug: "labels", locale, data });
  }
  payload.logger.info("Seeded Labels");
}
