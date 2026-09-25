# Phase 7 — Admin Panel

The admin panel is **Payload CMS's built-in admin** at `/admin` (replaced the planned
custom admin pages on 2026-09-25). There is no custom admin UI code.

## What the owner can do

- **Orders** — list with date, product, name, phone, quantity, status; change status
  (`pending` → `confirmed` → `completed` / `cancelled`)
- **Products** — edit name and description in Greek and English, price, "price on
  request" toggle, active toggle, image
- **Media** — upload and manage product images

## Auth

- Payload auth on the `users` collection: email + password, httpOnly session cookie
  signed with `PAYLOAD_SECRET`
- First visit to `/admin` shows a "create first user" screen — create the owner's account there
- Collection `access` functions (`src/collections/access.ts`) are the security boundary

## Possible later improvements

- Greek admin UI labels (Payload admin i18n)
- Dashboard view showing pending orders first
