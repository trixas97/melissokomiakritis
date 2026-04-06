# Phase 1 — Project Scaffold

## Commands

```bash
npx create-next-app@latest frankbees --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd frankbees
npm install prisma @prisma/client
npm install resend
npm install next-intl
npx prisma init --datasource-provider sqlite
```

## Folder Structure

```
frankbees/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx              # Home
│   │   │   ├── shop/
│   │   │   │   └── page.tsx          # Shop (3 categories)
│   │   │   ├── faqs/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin dashboard (orders)
│   │   │   ├── products/
│   │   │   │   └── page.tsx          # Edit products
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── orders/
│   │       │   └── route.ts          # POST new order
│   │       ├── admin/
│   │       │   ├── orders/
│   │       │   │   └── route.ts      # GET all orders, PATCH status
│   │       │   └── products/
│   │       │       └── route.ts      # GET/PATCH products
│   │       └── auth/
│   │           └── route.ts          # Admin login
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageToggle.tsx
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx
│   │   │   └── OrderForm.tsx
│   │   └── admin/
│   │       ├── OrdersTable.tsx
│   │       └── ProductEditor.tsx
│   ├── lib/
│   │   ├── db.ts                     # Prisma client singleton
│   │   ├── email.ts                  # Resend email helpers
│   │   └── auth.ts                   # Admin session helpers
│   └── messages/
│       ├── el.json                   # Greek translations
│       └── en.json                   # English translations
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── Dockerfile
└── nginx.conf
```

## Notes

- Prisma 7.x uses `provider = "prisma-client"` (not `prisma-client-js`) and `prisma.config.ts` for datasource config.
- SQLite requires the `@prisma/adapter-better-sqlite3` driver adapter in Prisma 7.
- Seed command configured in `prisma.config.ts` under `migrations.seed`.
