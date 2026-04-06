# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Μελισσοκομία Κρήτης** — a bilingual (Greek/English) web app for selling queen bees, queen cells, and bee colonies. Replaces the existing brochure site at melissokomiakritis.gr. No online payments; orders trigger manual owner follow-up.

See [PLAN.md](./PLAN.md) for the full build plan, phase-by-phase implementation details, folder structure, database schema, API routes, design system, Docker setup, and recommended build order.

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript, Tailwind CSS)
- **Database**: SQLite via Prisma
- **Email**: Resend
- **i18n**: next-intl (Greek + English)
- **Deployment**: Docker + Nginx on Hetzner

## Repository State

Project scaffold not yet created. Phase 1 of PLAN.md (running `create-next-app` and installing deps) is the next step.
