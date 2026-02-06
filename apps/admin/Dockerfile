# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL
ARG NEXT_PUBLIC_ADMIN_BASE_URL

COPY package*.json ./
RUN npm ci --omit=dev --force

COPY . .
RUN if [ -n "$NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL" ]; then \
      export NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL="$NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL"; \
    fi; \
    if [ -n "$NEXT_PUBLIC_ADMIN_BASE_URL" ]; then \
      export NEXT_PUBLIC_ADMIN_BASE_URL="$NEXT_PUBLIC_ADMIN_BASE_URL"; \
    fi; \
    npm run build:admin --configuration=production

RUN find /app/dist/apps/admin -name "*.map" -type f -delete && rm -rf /app/node_modules

# Step 2: Production stage
FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder app/dist/apps/admin/.next/standalone .
COPY --from=builder app/dist/apps/admin/.next/static dist/apps/admin/.next/static
COPY --from=builder app/dist/apps/admin/public apps/admin/public

ENTRYPOINT ["node", "apps/admin/server.js"]
