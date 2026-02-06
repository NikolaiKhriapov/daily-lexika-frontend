# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development
ARG NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL
ARG NEXT_PUBLIC_ADMIN_BASE_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN if [ -n "$NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL" ]; then \
      export NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL="$NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL"; \
    fi; \
    if [ -n "$NEXT_PUBLIC_ADMIN_BASE_URL" ]; then \
      export NEXT_PUBLIC_ADMIN_BASE_URL="$NEXT_PUBLIC_ADMIN_BASE_URL"; \
    fi; \
    npm run build:daily-lexika --configuration=production

RUN if [ -d /app/dist/apps/daily-lexika ]; then \
      find /app/dist/apps/daily-lexika -name "*.map" -type f -delete; \
    fi; \
    rm -rf /app/node_modules

# Step 2: Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder app/dist/apps/daily-lexika/.next/standalone .
COPY --from=builder app/dist/apps/daily-lexika/.next/static dist/apps/daily-lexika/.next/static
COPY --from=builder app/dist/apps/daily-lexika/public apps/daily-lexika/public

ENTRYPOINT ["node", "apps/daily-lexika/server.js"]
