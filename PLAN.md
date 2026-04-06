# Μελισσοκομία Κρήτης — Build Plan

## Overview
Replacing the existing brochure site at melissokomiakritis.gr with a modern bilingual (Greek/English) web app for selling queen bees, queen cells, and bee colonies. No online payments — orders trigger manual owner follow-up.

## Skills

- **Performance optimization** (React/Next.js): Always use the `vercel-react-best-practices` skill for comprehensive performance guidance.
- **Frontend UI/UX & interface creation**: Always use the `frontend-design` skill for distinctive, production-grade frontend interfaces and any frontend design issues.
- **Library/framework documentation**: Always use the `context7` plugin (`mcp__plugin_context7_context7`) for fetching up-to-date docs on any library, framework, SDK, API, or CLI tool used in this project (Next.js, Prisma, next-intl, Resend, Tailwind, etc.).

## Status
- [x] Requirements gathered (grill-me session, 2026-04-04)
- [x] Project scaffold
- [ ] Database schema + Prisma setup
- [ ] Product pages + order form
- [ ] Admin panel
- [ ] Email notifications (Resend)
- [ ] i18n (Greek + English)
- [ ] Docker + Nginx setup
- [ ] Final content + branding

---

## Phase 1 — Project Scaffold

### Commands to run
```bash
npx create-next-app@latest frankbees --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd frankbees
npm install prisma @prisma/client
npm install resend
npm install next-intl
npx prisma init --datasource-provider sqlite
```

### Folder structure
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

---

## Phase 2 — Database Schema

File: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  category    String   // "queen-bees" | "queen-cells" | "bee-colonies"
  nameEl      String
  nameEn      String
  descEl      String
  descEn      String
  price       Float?
  priceHidden Boolean  @default(false)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  orders      Order[]
}

model Order {
  id          Int      @id @default(autoincrement())
  productId   Int
  product     Product  @relation(fields: [productId], references: [id])
  name        String
  email       String
  phone       String
  quantity    Int
  notes       String?
  status      String   @default("pending") // pending | confirmed | completed | cancelled
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AdminSession {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  expiresAt DateTime
}
```

### Seed data (4 products)
```ts
// prisma/seed.ts
const products = [
  { slug: "cecropia-queen", category: "queen-bees", nameEl: "Βασίλισσα Κεκρόπια", nameEn: "Cecropia Queen Bee", price: 25 },
  { slug: "caucasica-queen", category: "queen-bees", nameEl: "Βασίλισσα Καυκάσια", nameEn: "Caucasica Queen Bee", price: 25 },
  { slug: "queen-cells", category: "queen-cells", nameEl: "Βασιλικά Κελιά", nameEn: "Queen Cells", price: 10 },
  { slug: "bee-colonies", category: "bee-colonies", nameEl: "Μελισσοκολωνίες", nameEn: "Bee Colonies", price: null, priceHidden: true },
]
```

---

## Phase 3 — i18n Setup (next-intl)

### `src/messages/en.json` (skeleton)
```json
{
  "nav": {
    "home": "Home", "shop": "Shop", "faqs": "FAQs",
    "about": "About Us", "contact": "Contact"
  },
  "home": {
    "hero_title": "Pure Cretan Queen Bees",
    "hero_subtitle": "Bred with care in the heart of Crete",
    "cta": "Shop Now"
  },
  "shop": {
    "title": "Our Products",
    "shipping_notice": "We ship live bees within Greece only. Orders are confirmed by phone/email after submission.",
    "price_hidden": "Contact us for pricing",
    "order_button": "Place Order"
  },
  "order_form": {
    "name": "Full Name", "email": "Email", "phone": "Phone",
    "quantity": "Quantity", "notes": "Notes (optional)",
    "submit": "Submit Order",
    "success": "Order received! We will contact you shortly to confirm.",
    "error": "Something went wrong. Please try again."
  },
  "faqs": { "title": "Frequently Asked Questions" },
  "about": { "title": "About Us" },
  "contact": { "title": "Contact" }
}
```

### `src/messages/el.json` (skeleton — same keys, Greek values)
Mirror of en.json with Greek placeholder text.

---

## Phase 4 — API Routes

### `POST /api/orders`
1. Validate body (name, email, phone, quantity, productId)
2. Create Order in DB
3. Send owner notification email (Resend)
4. Send customer confirmation email (Resend)
5. Return `{ success: true }`

### `GET /api/admin/orders` (protected)
- Returns all orders with product info, sorted by createdAt desc

### `PATCH /api/admin/orders/[id]` (protected)
- Body: `{ status: "confirmed" | "completed" | "cancelled" }`

### `GET /api/admin/products` (protected)
- Returns all products

### `PATCH /api/admin/products/[id]` (protected)
- Body: any product fields (price, priceHidden, nameEl, nameEn, descEl, descEn)

### `POST /api/auth` 
- Body: `{ password: string }`
- Compares against `ADMIN_PASSWORD` env var
- Creates AdminSession, sets httpOnly cookie

---

## Phase 5 — Email Templates (Resend)

### Owner notification
```
Subject: New Order — {productName} x{quantity}
Body:
  Product: {productName}
  Quantity: {quantity}
  Name: {name}
  Email: {email}
  Phone: {phone}
  Notes: {notes}
  Time: {createdAt}
```

### Customer confirmation
```
Subject: We received your order — Μελισσοκομία Κρήτης
Body:
  Dear {name},
  Thank you for your order of {quantity}x {productName}.
  We will contact you shortly at {phone} to confirm your order.
  — Μελισσοκομία Κρήτης
```

---

## Phase 6 — Design System

### Tailwind color palette (add to tailwind.config.ts)
```ts
colors: {
  brand: {
    blue:  '#4A90C4',   // primary light blue
    light: '#E8F4FD',   // backgrounds
    amber: '#F5A623',   // accent / honey
    dark:  '#1A3A4A',   // text
  }
}
```

### Key UI decisions
- Font: Inter (clean, readable in Greek + Latin)
- Hero section: full-width landscape photo of apiaries (reuse existing photography)
- Product cards: clean white cards with category badge, price or "Contact us", Order button
- Mobile-first: hamburger nav on mobile, stacked cards

---

## Phase 7 — Admin Panel

### Pages
- `/admin/login` — password form, sets session cookie
- `/admin` — orders table (columns: date, product, name, phone, email, qty, status, actions)
- `/admin/products` — product list with inline edit (price, priceHidden toggle, descriptions)

### Auth
- Single password stored in `ADMIN_PASSWORD` env var
- Session stored in DB (AdminSession table), httpOnly cookie
- Middleware protects all `/admin/*` routes except `/admin/login`

---

## Phase 8 — Docker + Nginx

### `Dockerfile`
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

### `docker-compose.yml`
```yaml
version: '3.8'
services:
  app:
    build: .
    restart: unless-stopped
    environment:
      - DATABASE_URL=file:/data/db.sqlite
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - OWNER_EMAIL=${OWNER_EMAIL}
    volumes:
      - sqlite_data:/data
    ports:
      - "3000:3000"
  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - certbot_certs:/etc/letsencrypt
    depends_on:
      - app

volumes:
  sqlite_data:
  certbot_certs:
```

### `.env` (template — never commit real values)
```
DATABASE_URL=file:/data/db.sqlite
ADMIN_PASSWORD=changeme
RESEND_API_KEY=re_xxxxxxxxxxxx
OWNER_EMAIL=your@email.com
NEXT_PUBLIC_LOCALE_DEFAULT=el
```

---

## Build Order (recommended sequence)

1. `npx create-next-app` + install deps
2. Prisma schema + seed data
3. Tailwind color config + base layout (Navbar, Footer, LanguageToggle)
4. i18n setup (next-intl, Greek + English message files)
5. Home page
6. Shop page + ProductCard component
7. OrderForm component + `POST /api/orders`
8. Email templates + Resend integration
9. About, FAQs, Contact pages (placeholder content)
10. Admin login + session middleware
11. Admin orders table + status update
12. Admin product editor + price toggle
13. Dockerfile + docker-compose + nginx.conf
14. Test full flow locally with Docker
15. Deploy to Hetzner + point DNS

---

## Open Questions / To Decide Later
- What is the owner's email address for notifications? (needed for OWNER_EMAIL env var)
- Do you have a Resend account? (free tier: 3,000 emails/month)
- What is the admin password? (set as env var, never hardcoded)
- Real product descriptions and prices (to replace placeholders)
- Real logo file (to replace placeholder)
- Exact FAQ content (Greek + English)
