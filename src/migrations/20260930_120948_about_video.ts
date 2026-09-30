import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ADD COLUMN "video_youtube_url" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "video_title" varchar;
  ALTER TABLE "about_page_locales" ADD COLUMN "video_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DROP COLUMN "video_youtube_url";
  ALTER TABLE "about_page_locales" DROP COLUMN "video_title";
  ALTER TABLE "about_page_locales" DROP COLUMN "video_description";`)
}
