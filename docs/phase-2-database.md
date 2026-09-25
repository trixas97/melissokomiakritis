# Phase 2 — Data Model (Payload CMS)

Data lives in PostgreSQL and is defined as Payload collections in `src/collections/`
(this replaced the original Prisma/SQLite schema on 2026-09-25). Types are generated
into `src/payload-types.ts` with `npm run generate:types`.

Localized fields (`localized: true`) store one value per locale (`el`, `en`) —
this replaces the old `nameEl` / `nameEn` column pairs.

## Collections

### `products` — `src/collections/Products.ts`

| Field | Type | Notes |
|-------|------|-------|
| `name` | text, localized | required |
| `slug` | text | required, unique |
| `category` | select | `queen-bees` \| `queen-cells` \| `bee-nucs` |
| `description` | textarea, localized | |
| `image` | upload → `media` | |
| `price` | number | euros, optional |
| `priceHidden` | checkbox | show "price on request" |
| `active` | checkbox | inactive products are hidden from the public |

Public read returns active products only; writes are admin-only.

### `orders` — `src/collections/Orders.ts`

| Field | Type | Notes |
|-------|------|-------|
| `product` | relationship → `products` | required |
| `quantity` | number | required, min 1 |
| `name`, `email`, `phone` | text / email / text | required |
| `notes` | textarea | |
| `status` | select | `pending` (default) \| `confirmed` \| `completed` \| `cancelled` |
| `locale` | select | language the customer ordered in (`el` \| `en`) — used for emails |

`createdAt` / `updatedAt` are added by Payload. All access is admin-only; orders are
created by the shop's server action through the Local API.

### `media` — `src/collections/Media.ts`

Image uploads with a localized, required `alt`. Stored in Cloudflare R2 when `S3_BUCKET`
is set, otherwise in `./media` on disk.

### `users` — `src/collections/Users.ts`

Payload auth collection for admin accounts. The first user is created via the
"create first user" screen at `/admin`.

## Globals

Single editable documents, in `src/globals/`:

- **`home-page`** — `hero` (badge, title, subtitle, button and scroll labels, background video),
  `offer` (title, card button label, and per card: title, small label, description, photo),
  `why` (title, and per reason: title, description, photo).
- **`site-settings`** — business name, logo, SEO title/description, footer (tagline, address,
  email, phone, domain).
- **`labels`** — UI wording (menu, footer headings, shop, order form, badges, page titles).
  Groups/fields mirror `src/messages/*.json` and are merged over them at request time.
- **`availability`** — `queenBees`, `queenCells`, `beeNucs`, each `{ from, to }` month
  numbers (`"1"`–`"12"`). Shown as the "Available Apr – Sep" badges on the home page cards.
- **`about-page`** — `story` (the full-screen "Our story" hero), `beekeeping`, `queenRearing`, `nucs`, each `{ title, description, image }`
  (title and description localized). The About page layout — photo side and background
  colour — is fixed in code; an empty `image` shows a placeholder photo.

## Seed Data (4 products)

File: `src/seed.ts` — Cecropia queen (€25), Caucasica queen (€25), queen cells (€10),
bee nucs (price on request). Skips existing slugs, so it is safe to re-run.

## Commands

```bash
docker compose up -d postgres
npm run seed
npm run generate:types
npm run payload migrate:create   # before deploying schema changes
```
