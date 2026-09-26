import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Orders } from "./collections/Orders";
import { Availability } from "./globals/Availability";
import { AboutPage } from "./globals/AboutPage";
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";
import { Labels } from "./globals/Labels";
import { migrations } from "./migrations";
import { seedOnFirstBoot } from "./seed/firstBoot";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Products, Orders, Media, Users],
  globals: [HomePage, AboutPage, Availability, SiteSettings, Labels],

  // PostgreSQL via Drizzle. In dev the schema is auto-pushed; in production
  // (NODE_ENV=production) the migrations in src/migrations run on startup,
  // before the app serves requests. Create one after every schema change:
  // `npm run payload migrate:create <name>`.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    prodMigrations: migrations,
  }),

  // A brand-new server database seeds itself (see src/seed/firstBoot.ts)
  onInit: seedOnFirstBoot,

  plugins: [
    // Cloudflare R2 (S3-compatible). Disabled when S3_BUCKET is unset, so local
    // dev falls back to storing uploads on disk.
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `${process.env.S3_PUBLIC_URL}/${key}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "auto",
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],

  // Content locales — keep in sync with src/i18n/routing.ts
  localization: {
    locales: ["el", "en"],
    defaultLocale: "el",
    fallback: true,
  },

  secret: (() => {
    if (!process.env.PAYLOAD_SECRET) throw new Error("PAYLOAD_SECRET env var is required");
    return process.env.PAYLOAD_SECRET;
  })(),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
