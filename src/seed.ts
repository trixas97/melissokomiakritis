// Seeds products, months, page content and labels. Run with: npm run seed
// (servers seed themselves on first boot — see onInit in payload.config.ts).
// Top-level await: `payload run` exits as soon as the import settles, so the
// work must finish before this module does. Errors propagate and exit 1.
import { getPayload } from "payload";
import config from "@payload-config";
import { seedContent } from "./seed/content";

const payload = await getPayload({ config });
await seedContent(payload);
