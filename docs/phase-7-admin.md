# Phase 7 — Admin Panel

## Pages

- `/admin/login` — password form, sets session cookie
- `/admin` — orders table (columns: date, product, name, phone, email, qty, status, actions)
- `/admin/products` — product list with inline edit (price, priceHidden toggle, descriptions)

## Auth

- Single password stored in `ADMIN_PASSWORD` env var
- Session stored in DB (`AdminSession` table), httpOnly cookie
- Middleware protects all `/admin/*` routes except `/admin/login`
- Session helpers in `src/lib/auth.ts`
