# Phase 1 — Project Scaffold

## Commands

```bash
npx create-next-app@latest frankbees --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd frankbees
npm install resend next-intl zod server-only
# Payload CMS (added 2026-09-25, replacing Prisma) — keep all payload packages on the same version
npm install --save-exact payload @payloadcms/next @payloadcms/db-postgres @payloadcms/storage-s3
npm install sharp graphql
```

## Folder Structure

```
frankbees/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Pass-through root layout
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # <html> shell, fonts, Navbar/Footer
│   │   │   ├── page.tsx              # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── queens/page.tsx       # Category pages share components/shop/CategoryPage
│   │   │   ├── cells/page.tsx
│   │   │   ├── nucs/page.tsx
│   │   │   ├── faqs/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   └── contact/page.tsx
│   │   └── (payload)/                # Payload boilerplate — don't add app code
│   │       ├── admin/                # Admin panel at /admin
│   │       └── api/[...slug]/        # Payload REST API at /api
│   ├── collections/                  # Payload collections
│   │   ├── access.ts
│   │   ├── Products.ts
│   │   ├── Orders.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageToggle.tsx
│   │   ├── home/                     # Home page sections (WhySection, HexagonPhoto, …)
│   │   └── shop/
│   │       ├── CategoryPage.tsx
│   │       ├── ProductCard.tsx
│   │       └── OrderForm.tsx
│   ├── i18n/                         # next-intl routing / request / navigation
│   ├── lib/
│   │   ├── payload.ts                # getPayloadClient() — Local API
│   │   └── email.ts                  # Resend email helpers
│   ├── messages/
│   │   ├── el.json                   # Greek translations
│   │   └── en.json                   # English translations
│   ├── payload.config.ts
│   ├── payload-types.ts              # Generated
│   ├── proxy.ts                      # next-intl locale routing (Next 16 "proxy", formerly middleware)
│   └── seed.ts
├── docker-compose.yml                # app + postgres + nginx
├── Dockerfile
└── nginx.conf
```

## Notes

- `package.json` has `"type": "module"` — required for the Payload CLI to load the TypeScript config.
- Next.js 16 renamed `middleware.ts` to `proxy.ts` with a named `proxy` export.
