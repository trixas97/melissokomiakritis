# Phase 4 — API Routes

## `POST /api/orders`

1. Validate body (`name`, `email`, `phone`, `quantity`, `productId`)
2. Create Order in DB
3. Send owner notification email (Resend)
4. Send customer confirmation email (Resend)
5. Return `{ success: true }`

## `GET /api/admin/orders` (protected)

Returns all orders with product info, sorted by `createdAt` desc.

## `PATCH /api/admin/orders/[id]` (protected)

Body: `{ status: "confirmed" | "completed" | "cancelled" }`

## `GET /api/admin/products` (protected)

Returns all products.

## `PATCH /api/admin/products/[id]` (protected)

Body: any product fields (`price`, `priceHidden`, `nameEl`, `nameEn`, `descEl`, `descEn`)

## `POST /api/auth`

- Body: `{ password: string }`
- Compares against `ADMIN_PASSWORD` env var
- Creates `AdminSession`, sets httpOnly cookie
