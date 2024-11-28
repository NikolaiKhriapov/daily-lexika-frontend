# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm ci --omit=dev --force

COPY . .
RUN npm run build:daily-lexika --configuration=production

RUN find /app/dist -name "*.map" -type f -delete && \
    rm -rf /app/node_modules

# Step 2: Production stage
FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder app/dist/apps/daily-lexika/.next/standalone .
COPY --from=builder app/dist/apps/daily-lexika/.next/static dist/apps/daily-lexika/.next/static
COPY --from=builder app/dist/apps/daily-lexika/public apps/daily-lexika/public

ENTRYPOINT ["node", "apps/daily-lexika/server.js"]
