# Μελισσοκομία Κρήτης — Build Plan

## Overview

Replacing the existing brochure site at melissokomiakritis.gr with a modern bilingual (Greek/English) web app for selling queen bees, queen cells, and bee nucs. No online payments — orders trigger manual owner follow-up.

## Skills

- **Performance optimization** (React/Next.js): Always use the `vercel-react-best-practices` skill.
- **Frontend UI/UX & interface creation**: Always use the `frontend-design` skill.
- **Library/framework documentation**: Always use the `context7` plugin (`mcp__plugin_context7_context7`).
- **UI validation & browser interaction**: Always use the `mcp__chrome-devtools` tools.

## Status

- [x] Requirements gathered (grill-me session, 2026-04-04)
- [x] Project scaffold
- [x] Database schema (Prisma, replaced by Payload CMS + PostgreSQL on 2026-09-25)
- [ ] Product pages + order form
- [x] Admin panel (Payload admin at `/admin`)
- [ ] Email notifications (Resend)
- [ ] i18n (Greek + English)
- [ ] Docker + Nginx setup
- [ ] Final content + branding

## Phases

| Phase | File | Topic |
|-------|------|-------|
| 1 | [docs/phase-1-scaffold.md](docs/phase-1-scaffold.md) | Project scaffold, folder structure |
| 2 | [docs/phase-2-database.md](docs/phase-2-database.md) | Payload collections, seed data |
| 3 | [docs/phase-3-i18n.md](docs/phase-3-i18n.md) | next-intl setup, message keys |
| 4 | [docs/phase-4-api.md](docs/phase-4-api.md) | Order server action |
| 5 | [docs/phase-5-email.md](docs/phase-5-email.md) | Email templates (Resend) |
| 6 | [docs/phase-6-design.md](docs/phase-6-design.md) | Design system, colors, typography |
| 7 | [docs/phase-7-admin.md](docs/phase-7-admin.md) | Admin panel, auth |
| 8 | [docs/phase-8-docker.md](docs/phase-8-docker.md) | Docker, Nginx, deployment |
| — | [docs/open-questions.md](docs/open-questions.md) | Pending decisions |

## Build Order

- [x] 1. `npx create-next-app` + install deps
- [x] 2. Payload CMS collections (Products, Orders, Media, Users) + seed data
- [x] 3. Tailwind color config + base layout (Navbar, Footer, LanguageToggle)
- [x] 4. i18n setup (next-intl, Greek + English message files)
- [x] 5. Home page
- [ ] 6. Category pages (Queens, Cells, Bee Nucs) + ProductCard component — placeholder pages exist
- [ ] 7. OrderForm component + `createOrder` server action (Zod + Payload Local API)
- [ ] 8. Email templates + Resend integration (Orders `afterChange` hook)
- [ ] 9. About, FAQs, Contact pages — About done: "Our story" full-screen hero + 3 topic sections (content in `about-page` global)
- [x] 10. Admin login — Payload auth (`Users` collection)
- [x] 11. Admin orders list + status — Payload admin (`Orders` collection)
- [x] 12. Admin product editor + price toggle — Payload admin (`Products` collection)
- [ ] 13. Dockerfile + docker-compose (app + Postgres) + nginx.conf — updated for Payload, not yet run
- [ ] 14. Create the initial Payload migration and wire `prodMigrations`
- [ ] 15. Test full flow locally with Docker
- [ ] 16. Deploy to Hetzner + point DNS
