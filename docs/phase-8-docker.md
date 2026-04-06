# Phase 8 — Docker + Nginx

## Dockerfile

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

## docker-compose.yml

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

## .env Template (never commit real values)

```
DATABASE_URL=file:/data/db.sqlite
ADMIN_PASSWORD=changeme
RESEND_API_KEY=re_xxxxxxxxxxxx
OWNER_EMAIL=your@email.com
NEXT_PUBLIC_LOCALE_DEFAULT=el
```
