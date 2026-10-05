import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_beekeeping_button_link" AS ENUM('queens', 'cells', 'nucs', 'gallery', 'faqs', 'contact');
  CREATE TYPE "public"."enum_about_page_queen_rearing_button_link" AS ENUM('queens', 'cells', 'nucs', 'gallery', 'faqs', 'contact');
  CREATE TYPE "public"."enum_about_page_nucs_button_link" AS ENUM('queens', 'cells', 'nucs', 'gallery', 'faqs', 'contact');
  ALTER TABLE "about_page" ADD COLUMN "beekeeping_button_link" "enum_about_page_beekeeping_button_link";
  ALTER TABLE "about_page" ADD COLUMN "queen_rearing_button_link" "enum_about_page_queen_rearing_button_link";
  ALTER TABLE "about_page" ADD COLUMN "nucs_button_link" "enum_about_page_nucs_button_link";
  ALTER TABLE "about_page_locales" ADD COLUMN "story_eyebrow" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "story_intro_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "beekeeping_eyebrow" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "beekeeping_button_label" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "queen_rearing_eyebrow" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "queen_rearing_button_label" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "nucs_eyebrow" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "nucs_button_label" varchar;
  ALTER TABLE "labels_locales" DROP COLUMN "about_discover";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "labels_locales" ADD COLUMN "about_discover" varchar;
  ALTER TABLE "about_page" DROP COLUMN "beekeeping_button_link";
  ALTER TABLE "about_page" DROP COLUMN "queen_rearing_button_link";
  ALTER TABLE "about_page" DROP COLUMN "nucs_button_link";
  ALTER TABLE "about_page_locales" DROP COLUMN "story_eyebrow";
  ALTER TABLE "about_page_locales" DROP COLUMN "story_intro_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "beekeeping_eyebrow";
  ALTER TABLE "about_page_locales" DROP COLUMN "beekeeping_button_label";
  ALTER TABLE "about_page_locales" DROP COLUMN "queen_rearing_eyebrow";
  ALTER TABLE "about_page_locales" DROP COLUMN "queen_rearing_button_label";
  ALTER TABLE "about_page_locales" DROP COLUMN "nucs_eyebrow";
  ALTER TABLE "about_page_locales" DROP COLUMN "nucs_button_label";
  DROP TYPE "public"."enum_about_page_beekeeping_button_link";
  DROP TYPE "public"."enum_about_page_queen_rearing_button_link";
  DROP TYPE "public"."enum_about_page_nucs_button_link";`)
}
