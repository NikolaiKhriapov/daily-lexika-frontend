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
    npm run build:landing-yekaterina --configuration=production

RUN find /app/dist/apps/landing-yekaterina -name "*.map" -type f -delete && rm -rf /app/node_modules

# Step 2: Production stage
FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder app/dist/apps/landing-yekaterina/.next/standalone .
COPY --from=builder app/dist/apps/landing-yekaterina/.next/static dist/apps/landing-yekaterina/.next/static
COPY --from=builder app/dist/apps/landing-yekaterina/public apps/landing-yekaterina/public

ENTRYPOINT ["node", "apps/landing-yekaterina/server.js"]
