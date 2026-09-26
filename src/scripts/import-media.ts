// Uploads the starting photos/logo/video to Media (R2) and attaches them.
// Run with: npm run import-media (servers do this themselves on first boot —
// see onInit in payload.config.ts). Top-level await for `payload run`.
import { getPayload } from "payload";
import config from "@payload-config";
import { importMedia } from "../seed/media";

if (!process.env.S3_BUCKET && !process.argv.includes("--local")) {
  throw new Error(
    "S3_BUCKET is not set, so uploads would go to local disk instead of R2. Add the S3_* values to .env (see .env.example), or pass --local to import to ./media on purpose.",
  );
}

const payload = await getPayload({ config });
await importMedia(payload);
