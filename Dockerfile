# syntax=docker.io/docker/dockerfile:1

# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# ---- Dependencies layer ----
FROM base AS deps

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with npm
RUN npm ci

# ---- Build layer ----
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json

# Copy application source
COPY . .

# Disable telemetry (optional)
# ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js app
RUN npm run build

# ---- Production layer ----
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

# Add non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy required files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run Next.js app
CMD ["node", "server.js"]
