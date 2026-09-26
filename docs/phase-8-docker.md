# Phase 8 — Deployment

Same pattern as labo and gtrichakis: one Docker image built by CI, two stacks on
the shared Hetzner box behind Nginx Proxy Manager, UAT deployed on every merge
and production promoted by hand.

## Two environments

| | Production | UAT |
|---|---|---|
| Domain | `melissokomiakritis.gr` (+ `www`) | `melissokomiakritis.app.trixas-lab.com` |
| Directory | `/home/trixas/melissokomiakritis/prod` | `/home/trixas/melissokomiakritis/uat` |
| Compose project | `melissokomiakritis` | `melissokomiakritis-uat` |
| Postgres volume | `melissokomiakritis_postgres_data` | `melissokomiakritis-uat_postgres_data` |
| Host port (`APP_PORT`) | `3004` | `3005` |
| Overlay | `docker-compose.prod.yml` | `docker-compose.uat.yml` |
| Image | pinned SHA (`APP_IMAGE_TAG`) | `:latest` |
| `SITE_ENV` | `production` (hardcoded in the overlay) | `uat` (base default) |
| Indexed | yes | no — `Disallow: /`, `noindex` tag, `X-Robots-Tag` |
| R2 bucket | its own | its own — **never share with production** |
| Memory | app 768m + Postgres 256m | app 512m + Postgres 192m |

Host ports already used on the box: labo 3000/3001, gtrichakis 3002/3003.

> **Memory budget.** The box has 4 GB and already runs labo (up to 3 GB) and
> gtrichakis (~450 MB) plus Nginx Proxy Manager. These two stacks add up to
> ~1.7 GB, which will not fit alongside them. Check `free -m` / `docker stats`
> before the first deploy — this likely means resizing the server (e.g. CX32,
> 8 GB) or giving this site its own box.

## Files

| File | Role |
|------|------|
| `Dockerfile` | 3-stage Node 24 Alpine build, Next.js `standalone` output, non-root user |
| `.dockerignore` | Keeps `.env`, `media/`, `.next`, docs and git out of the build context |
| `docker-compose.yml` | Base stack: `app` + `postgres`, runtime env, healthcheck |
| `docker-compose.uat.yml` / `.prod.yml` | Environment overlays (always applied with `-f`) |
| `docker-compose.override.yml` | Local dev only — publishes Postgres on localhost; never used on the server |
| `.github/workflows/deploy.yml` | Every push to `main`: build → push `:latest` + `:<short sha>` → deploy UAT |
| `.github/workflows/promote.yml` | Manual: pin production to a short SHA already verified on UAT |
| `.env.example` | Every variable, with local / UAT / production guidance |

## What happens when a container starts

1. `src/instrumentation.ts` initialises Payload before the server takes requests.
2. **Migrations** — Payload applies any new files from `src/migrations/`
   (`prodMigrations`, production only). The dev server's schema auto-push never
   runs on the server.
3. **First-boot seeding** — only while the database has **no admin user**
   (`src/seed/firstBoot.ts`): products, availability months, all page content
   and labels, then the starting photos, logo and hero video are uploaded to this
   environment's R2 bucket and attached. Once the owner creates their account it
   never runs again, so it can't overwrite their edits.
4. The healthcheck (`GET /el`, which renders from the database) turns healthy,
   so `docker compose up --wait` — and therefore the CI job — only succeeds once
   the site really works. Verified locally against an empty database: healthy in
   ~13 s, migrations applied, content seeded.

## Schema changes (MANDATORY)

After changing anything in `src/collections/` or `src/globals/` (new field,
`localized`, relationship…):

```bash
npm run payload migrate:create <short-name>   # needs local Postgres running
npm run generate:types
```

Commit the new files in `src/migrations/` **with** the change. They run
automatically on the next UAT deploy, then on production when that SHA is
promoted — a migration never ships separately from the code that needs it.
No hand-written SQL.

## One-time setup

### 1. Cloudflare R2

Create **two** buckets (production and UAT), each with public access enabled
(r2.dev URL), and an API token scoped to them. Keep your local dev bucket
separate too. If a bucket later gets a custom domain, add the host to
`images.remotePatterns` in `next.config.ts` (only `*.r2.dev` is allowed now).

### 2. GitHub

Repository → Settings → Secrets and variables → Actions:

| Secret | Value |
|--------|-------|
| `DEPLOY_HOST` | Hetzner server IP (same as labo) |
| `DEPLOY_USER` | `trixas` |
| `DEPLOY_SSH_KEY` | Private key allowed to SSH as that user |
| `UAT_DEPLOY_PATH` | `/home/trixas/melissokomiakritis/uat` |
| `DEPLOY_PATH` | `/home/trixas/melissokomiakritis/prod` |

Settings → Environments → create **`production`** and add yourself as a required
reviewer, so promotion needs an approval.

The image is published as `ghcr.io/trixas97/melissokomiakritis`. If the package
is private, the server must be logged in to GHCR (see step 3).

### 3. Server

```bash
mkdir -p /home/trixas/melissokomiakritis/{prod,uat}

# from your machine, in the repo — copy the compose files to both stacks
scp docker-compose.yml docker-compose.prod.yml trixas@<server>:/home/trixas/melissokomiakritis/prod/
scp docker-compose.yml docker-compose.uat.yml  trixas@<server>:/home/trixas/melissokomiakritis/uat/

# on the server, if the GHCR package is private (token with read:packages)
echo <token> | docker login ghcr.io -u trixas97 --password-stdin
```

Create `.env` in **each** directory from `.env.example` (`chmod 600 .env`):

| Variable | Production | UAT |
|----------|-----------|-----|
| `APP_PORT` | `3004` | `3005` |
| `APP_BIND` | `0.0.0.0` | `0.0.0.0` |
| `NEXT_PUBLIC_SITE_URL` | `https://melissokomiakritis.gr` | `https://melissokomiakritis.app.trixas-lab.com` |
| `POSTGRES_PASSWORD` | new random value | different random value |
| `PAYLOAD_SECRET` | new random value | different random value |
| `S3_*` | production bucket | UAT bucket |
| `RESEND_API_KEY`, `OWNER_EMAIL` | real values | real values (or empty) |

`APP_IMAGE_TAG` is written into production's `.env` by the Promote workflow.

Hetzner Cloud firewall: block inbound 3004 and 3005 from the internet (Docker's
port rules bypass `ufw`); only Nginx Proxy Manager should reach them.

### 4. Nginx Proxy Manager

| Proxy host | Forward to | SSL |
|------------|-----------|-----|
| `melissokomiakritis.app.trixas-lab.com` | `http://<server public IP>:3005` | Let's Encrypt, force SSL |
| `melissokomiakritis.gr`, `www.melissokomiakritis.gr` | `http://<server public IP>:3004` | Let's Encrypt, force SSL |

Point the domains' DNS A records at the server first (for `melissokomiakritis.gr`
that is the go-live moment, since it replaces the current site).

### 5. First deploy

1. Push to `main` → **Deploy to UAT** runs. Watch it on the server:
   `docker compose -f docker-compose.yml -f docker-compose.uat.yml logs -f app`
   — expect `Migrated: 20260925_162048_initial` and `[first boot] … Done`.
2. Open UAT `/admin` and create the owner's account (this also stops first-boot seeding there).
3. Check the site; the run summary shows the short SHA.
4. **Actions → Promote to Production → image_tag = that SHA.** Production
   migrates and seeds itself the same way; then create its admin account.

## Day-to-day

- **Deploy to UAT:** merge to `main`.
- **Release:** verify on UAT, then run *Promote to Production* with the SHA.
- **Rollback:** run *Promote to Production* with an older SHA. Migrations are not
  rolled back automatically — a release with a destructive migration needs a
  deliberate plan.
- **Compose file changes** are not deployed by CI: re-copy them to both directories.
- **Logs / shell:** `cd /home/trixas/melissokomiakritis/<prod|uat>` then
  `docker compose -f docker-compose.yml -f docker-compose.<prod|uat>.yml logs -f app`.
  Check which directory you are in first — both stacks use DB `frankbees`, user `payload`.
