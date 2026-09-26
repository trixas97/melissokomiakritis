// Runs once when the production server starts, before it accepts requests.
// Initialising Payload here makes the database migrations (prodMigrations) and
// first-boot seeding happen at startup instead of on the first visitor's
// request — so the container only turns healthy once the site is really ready.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "production") return;

  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  await getPayload({ config });
}
