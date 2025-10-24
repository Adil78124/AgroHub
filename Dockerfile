FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base as dependencies
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base as builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .
RUN pnpm run build

FROM gcr.io/distroless/nodejs20-debian12 AS production
WORKDIR /app

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV HOSTNAME="0.0.0.0"
CMD ["server.js"]
