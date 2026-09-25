// Uploads the site's starting photos, logo and hero video into Payload Media —
// which stores them in Cloudflare R2 — and attaches each to its field in the
// content globals. Run with: npm run import-media
//
// Safe to re-run: a file already in Media (same filename) is reused, and a field
// that already has an upload is left alone, so it never overwrites the owner's choices.
import { readFileSync } from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";

type GlobalSlug = "home-page" | "about-page" | "site-settings";

type Asset = {
  global: GlobalSlug;
  field: string; // dot path inside the global, e.g. "offer.queenBees.image"
  source: string; // https URL, or a path under /public
  filename: string;
  alt: { el: string; en: string };
  focal?: { x: number; y: number }; // percent; keeps the subject in view when cropped
};

const pexels = (id: number, slug: string) =>
  `https://images.pexels.com/photos/${id}/${slug}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
const unsplash = (id: string, width = 1600) => `https://images.unsplash.com/photo-${id}?w=${width}&q=80&fm=jpg`;

const ASSETS: Asset[] = [
  // Site settings
  {
    global: "site-settings",
    field: "logo",
    source: "/logo.png",
    filename: "logo.png",
    alt: { el: "Μελισσοκομία Κρήτης", en: "Μελισσοκομία Κρήτης" },
  },
  // Home page
  {
    global: "home-page",
    field: "hero.video",
    source: "/bee-animation.mp4",
    filename: "bee-animation.mp4",
    alt: { el: "Μέλισσες σε πτήση", en: "Bees in flight" },
  },
  {
    global: "home-page",
    field: "offer.queenBees.image",
    source: pexels(36766950, "pexels-photo-36766950/free-photo-of-close-up-of-honey-bees-on-active-honeycomb"),
    filename: "offer-queen-bees.jpg",
    alt: { el: "Μέλισσες πάνω σε ενεργή κηρήθρα", en: "Queen bee on honeycomb" },
  },
  {
    global: "home-page",
    field: "offer.queenCells.image",
    source: pexels(56876, "queen-cup-honeycomb-honey-bee-new-queen-rearing-compartment-56876"),
    filename: "offer-queen-cells.jpg",
    alt: { el: "Βασιλικά κελιά πάνω στην κηρήθρα", en: "Queen cells on honeycomb" },
  },
  {
    global: "home-page",
    field: "offer.beeNucs.image",
    source: pexels(17859331, "pexels-photo-17859331/free-photo-of-beekeeper-holding-hive-frame"),
    filename: "offer-bee-nucs.jpg",
    alt: { el: "Μελισσοκόμος κρατά πλαίσιο από παραφυάδα", en: "Beekeeper holding a hive frame from a nuc" },
  },
  {
    global: "home-page",
    field: "why.heritage.image",
    source: pexels(28574637, "pexels-photo-28574637/free-photo-of-breathtaking-mountain-landscape-with-coastal-view"),
    filename: "why-heritage.jpg",
    alt: { el: "Κρητικά βουνά που κατεβαίνουν ως τη θάλασσα", en: "Cretan mountains running down to the sea" },
  },
  {
    global: "home-page",
    field: "why.healthy.image",
    source: unsplash("1683817580097-a0af3bb6513b"),
    filename: "why-healthy.jpg",
    alt: { el: "Μέλισσα προσγειώνεται σε λουλούδι", en: "Honey bee landing on a flower" },
    focal: { x: 38, y: 60 },
  },
  {
    global: "home-page",
    field: "why.service.image",
    source: unsplash("1586779161268-51d3e65d20fb"),
    filename: "why-service.jpg",
    alt: { el: "Μελισσοκόμος σηκώνει πλαίσιο γόνου από την κυψέλη", en: "Beekeeper lifting a brood frame from a hive" },
  },
  // About page
  {
    global: "about-page",
    field: "story.image",
    source: unsplash("1693225428299-996f236f239f", 2400),
    filename: "about-story.jpg",
    alt: { el: "Σειρά από ξύλινες κυψέλες ανάμεσα σε δέντρα", en: "Row of wooden beehives among trees" },
  },
  {
    global: "about-page",
    field: "beekeeping.image",
    source: unsplash("1721853380746-6d9a841c06fe"),
    filename: "about-beekeeping.jpg",
    alt: { el: "Σειρές από κυψέλες σε χωράφι με βουνά στο βάθος", en: "Rows of beehives in a field with mountains behind" },
  },
  {
    global: "about-page",
    field: "queenRearing.image",
    source: unsplash("1619522893151-bb5138b60292"),
    filename: "about-queen-rearing.jpg",
    alt: { el: "Σημαδεμένη βασίλισσα ανάμεσα σε εργάτριες πάνω στην κηρήθρα", en: "Marked queen bee among workers on the comb" },
  },
  {
    global: "about-page",
    field: "nucs.image",
    source: unsplash("1635446456630-634bbc460d70"),
    filename: "about-nucs.jpg",
    alt: { el: "Μικρές κυψέλες παραφυάδων ανάμεσα σε αγριολούλουδα", en: "Small nuc hives among wild plants" },
  },
];

const MIME_BY_EXT: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4" };

async function loadFile(asset: Asset) {
  if (asset.source.startsWith("/")) {
    const data = readFileSync(path.join(process.cwd(), "public", asset.source));
    return { data, mimetype: MIME_BY_EXT[path.extname(asset.filename)], name: asset.filename, size: data.length };
  }
  const response = await fetch(asset.source);
  if (!response.ok) throw new Error(`Download failed (${response.status}) for ${asset.source}`);
  const data = Buffer.from(await response.arrayBuffer());
  const mimetype = response.headers.get("content-type")?.split(";")[0] ?? MIME_BY_EXT[path.extname(asset.filename)];
  return { data, mimetype, name: asset.filename, size: data.length };
}

const getAt = (doc: Record<string, unknown>, dotPath: string) =>
  dotPath.split(".").reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], doc);

// Returns the top-level group (or field) of `doc` with `dotPath` set to `value`,
// keeping its sibling fields, so updateGlobal doesn't clear them.
function withValueAt(doc: Record<string, unknown>, dotPath: string, value: unknown) {
  const [top, ...rest] = dotPath.split(".");
  if (rest.length === 0) return { [top]: value };
  const copy = structuredClone(doc[top] ?? {}) as Record<string, unknown>;
  let node = copy;
  for (const key of rest.slice(0, -1)) {
    node[key] = { ...((node[key] as Record<string, unknown>) ?? {}) };
    node = node[key] as Record<string, unknown>;
  }
  node[rest[rest.length - 1]] = value;
  return { [top]: copy };
}

if (!process.env.S3_BUCKET && !process.argv.includes("--local")) {
  throw new Error(
    "S3_BUCKET is not set, so uploads would go to local disk instead of R2. Add the S3_* values to .env (see .env.example), or pass --local to import to ./media on purpose.",
  );
}

const payload = await getPayload({ config });

for (const asset of ASSETS) {
  const current = (await payload.findGlobal({ slug: asset.global, locale: "el", depth: 0 })) as unknown as Record<string, unknown>;
  if (getAt(current, asset.field)) {
    payload.logger.info(`skip ${asset.global}.${asset.field} — already has an upload`);
    continue;
  }

  const existing = await payload.find({ collection: "media", where: { filename: { equals: asset.filename } }, limit: 1 });
  let mediaId = existing.docs[0]?.id;

  if (!mediaId) {
    const created = await payload.create({
      collection: "media",
      locale: "el",
      data: { alt: asset.alt.el, ...(asset.focal && { focalX: asset.focal.x, focalY: asset.focal.y }) },
      file: await loadFile(asset),
    });
    await payload.update({ collection: "media", id: created.id, locale: "en", data: { alt: asset.alt.en } });
    mediaId = created.id;
    payload.logger.info(`uploaded ${asset.filename} → ${created.url}`);
  }

  await payload.updateGlobal({
    slug: asset.global,
    locale: "el",
    data: withValueAt(current, asset.field, mediaId),
  });
  payload.logger.info(`attached ${asset.filename} to ${asset.global}.${asset.field}`);
}
