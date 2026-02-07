# syntax=docker/dockerfile:1
ARG NODE_VERSION=20-alpine

# Step 1: Build stage
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development
ENV NX_DAEMON=false

ARG APP_NAME
ARG NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL
ARG NEXT_PUBLIC_ADMIN_BASE_URL

RUN test -n "$APP_NAME"

COPY package*.json ./
COPY nx.json tsconfig.base.json ./
COPY apps/*/package.json apps/*/package.json
RUN npm ci

COPY . .
RUN npx nx reset && \
    if [ -n "$NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL" ]; then \
      export NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL="$NEXT_PUBLIC_DAILY_LEXIKA_BASE_URL"; \
    fi; \
    if [ -n "$NEXT_PUBLIC_ADMIN_BASE_URL" ]; then \
      export NEXT_PUBLIC_ADMIN_BASE_URL="$NEXT_PUBLIC_ADMIN_BASE_URL"; \
    fi; \
    npm run build:${APP_NAME} --configuration=production

RUN if [ -d /app/dist/apps/${APP_NAME} ]; then \
      find /app/dist/apps/${APP_NAME} -name "*.map" -type f -delete; \
    fi

# Step 2: Production stage
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production

ARG APP_NAME
ENV APP_NAME=$APP_NAME

RUN test -n "$APP_NAME"

COPY --from=builder /app/dist/apps/${APP_NAME}/.next/standalone .
COPY --from=builder /app/dist/apps/${APP_NAME}/.next/static dist/apps/${APP_NAME}/.next/static
COPY --from=builder /app/dist/apps/${APP_NAME}/public apps/${APP_NAME}/public

ENTRYPOINT ["sh", "-c", "node apps/$APP_NAME/server.js"]
