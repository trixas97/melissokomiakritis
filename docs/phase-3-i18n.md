# Phase 3 — i18n Setup (next-intl)

## Files

- `src/i18n/routing.ts` — defines locales (`el`, `en`), default locale `el`
- `src/i18n/request.ts` — `getRequestConfig`, loads messages per locale
- `src/i18n/navigation.ts` — locale-aware `Link`, `useRouter`, `usePathname`, `redirect`
- `src/middleware.ts` — redirects to locale-prefixed URLs
- `next.config.ts` — wraps config with `createNextIntlPlugin`
- `src/app/[locale]/layout.tsx` — validates locale, wraps with `NextIntlClientProvider`

## Message Keys

### `src/messages/en.json`

```json
{
  "nav":        { "home", "about", "queens", "cells", "nucs", "faqs", "gallery", "contact" },
  "home":       { "hero_title", "hero_subtitle", "cta", "categories_title",
                  "cat_queens", "cat_queens_desc", "cat_cells", "cat_cells_desc",
                  "cat_nucs", "cat_nucs_desc", "cat_cta",
                  "trust_title", "trust_heritage", "trust_heritage_desc",
                  "trust_healthy", "trust_healthy_desc", "trust_service", "trust_service_desc" },
  "shop":       { "title", "shipping_notice", "price_hidden", "order_button" },
  "order_form": { "name", "email", "phone", "quantity", "notes", "submit", "success", "error" },
  "faqs":       { "title" },
  "about":      { "title" },
  "contact":    { "title" },
  "footer":     { "tagline", "quick_links", "contact_heading", "rights" }
}
```

`src/messages/el.json` mirrors the same keys with Greek values.
