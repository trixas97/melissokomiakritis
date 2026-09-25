# Stage 1: Install dependencies
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Payload needs these at build time for page data collection.
# Dummy values are fine — real secrets are injected at runtime.
ARG PAYLOAD_SECRET=build-time-secret-placeholder
ARG DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV DATABASE_URL=${DATABASE_URL}
# Public media URL (R2) — baked into next/image's allowed hosts at build time
ARG S3_PUBLIC_URL=
ENV S3_PUBLIC_URL=${S3_PUBLIC_URL}
RUN npm run build

# Stage 3: Production runner
FROM node:24-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
