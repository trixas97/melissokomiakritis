# Phase 8 — Docker + Nginx

Three services in `docker-compose.yml`:

- **app** — the Next.js + Payload build (`Dockerfile`, Next.js `standalone` output, Node 24)
- **postgres** — `postgres:16-alpine`, data in the `postgres_data` volume, bound to
  `127.0.0.1:5432` only (also used for local dev)
- **nginx** — reverse proxy to `app:3000`, TLS certs in `certbot_certs`

Media is stored in Cloudflare R2, not in the container.

## Build

The Dockerfile passes placeholder `PAYLOAD_SECRET` and `DATABASE_URL` values at build
time — Payload needs them to load its config during `next build`. Real values are
injected at runtime from `.env`.

## Database migrations

Payload only auto-pushes the schema in development. For production:

1. With local Postgres running, `npm run payload migrate:create` → commits a migration to `src/migrations/`
2. Wire the migrations into `postgresAdapter({ prodMigrations })` so they run on startup,
   or run `npm run payload migrate` against production before starting the new version

## .env

See `.env.example` for every variable: `DATABASE_URL`, `POSTGRES_PASSWORD`,
`PAYLOAD_SECRET`, `S3_*` (R2), `RESEND_API_KEY`, `OWNER_EMAIL`.
