import type { Payload } from "payload";
import { seedContent } from "./content";
import { importMedia } from "./media";

// Fills a brand-new environment (fresh UAT or production database) with the
// starting products, content, labels and photos, so it is usable straight away.
//
// Runs from onInit on every production start, but only acts while the database
// has no admin user: once the owner has created their account, the environment
// is theirs and is never seeded again — even if they later clear a field.
// Skipped during `next build`, which has no database.
export async function seedOnFirstBoot(payload: Payload) {
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { totalDocs: users } = await payload.count({ collection: "users" });
  if (users > 0) return;

  try {
    payload.logger.info("[first boot] No admin user yet — seeding starting content");
    await seedContent(payload);

    if (process.env.S3_BUCKET) {
      await importMedia(payload);
    } else {
      payload.logger.warn("[first boot] S3_BUCKET is not set — skipping the photo import");
    }
    payload.logger.info("[first boot] Done");
  } catch (error) {
    // Never keep the site from starting; the seed is safe to retry on the next restart.
    payload.logger.error({ err: error }, "[first boot] Seeding failed");
  }
}
