# Phase 2 — Database Schema

File: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
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
  id        Int      @id @default(autoincrement())
  productId Int
  product   Product  @relation(fields: [productId], references: [id])
  name      String
  email     String
  phone     String
  quantity  Int
  notes     String?
  status    String   @default("pending") // pending | confirmed | completed | cancelled
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AdminSession {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  expiresAt DateTime
}
```

## Seed Data (4 products)

File: `prisma/seed.ts`

```ts
const products = [
  { slug: "cecropia-queen",  category: "queen-bees",    nameEl: "Βασίλισσα Κεκρόπια",  nameEn: "Cecropia Queen Bee",  price: 25 },
  { slug: "caucasica-queen", category: "queen-bees",    nameEl: "Βασίλισσα Καυκάσια",  nameEn: "Caucasica Queen Bee", price: 25 },
  { slug: "queen-cells",     category: "queen-cells",   nameEl: "Βασιλικά Κελιά",       nameEn: "Queen Cells",         price: 10 },
  { slug: "bee-colonies",    category: "bee-colonies",  nameEl: "Μελισσοκολωνίες",      nameEn: "Bee Colonies",        price: null, priceHidden: true },
]
```

## Commands

```bash
npx prisma migrate dev --name init
npx prisma db seed
```
