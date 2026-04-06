# Phase 5 — Email Templates (Resend)

## Owner Notification

```
Subject: New Order — {productName} x{quantity}

Product:  {productName}
Quantity: {quantity}
Name:     {name}
Email:    {email}
Phone:    {phone}
Notes:    {notes}
Time:     {createdAt}
```

## Customer Confirmation

```
Subject: We received your order — Μελισσοκομία Κρήτης

Dear {name},
Thank you for your order of {quantity}x {productName}.
We will contact you shortly at {phone} to confirm your order.
— Μελισσοκομία Κρήτης
```

## Implementation

- Helper functions live in `src/lib/email.ts`
- Uses the `resend` npm package with `RESEND_API_KEY` env var
- Owner email set via `OWNER_EMAIL` env var
