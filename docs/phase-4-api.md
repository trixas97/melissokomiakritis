# Phase 4 — Order Submission

Orders are submitted through a **server action**, not a custom API route. `/api/*` is
served by Payload's REST API (`src/app/(payload)/api/[...slug]`), and the admin panel
handles all admin reads and writes — so there are no custom admin or auth endpoints.

## `createOrder` server action — `src/app/[locale]/<category>/actions.ts` (or shared in `src/components/shop/`)

1. Parse the form data with a Zod schema (`productId`, `quantity`, `name`, `email`, `phone`, `notes?`)
2. Check the product exists and is active
3. `payload.create({ collection: "orders", data: { …, locale } })` via `getPayloadClient()`
4. Emails are sent from the Orders `afterChange` hook (see Phase 5)
5. Return `{ success: true }` or `{ success: false, errors }` for the form to display

## Admin operations

Handled by the Payload admin at `/admin`:

- Orders list, filtering and status updates → `orders` collection
- Product editing, price and "price on request" toggle → `products` collection
- Login → Payload auth (`users` collection)
