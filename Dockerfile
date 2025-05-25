# Use Node.js 20 as the base image
FROM node:20-alpine AS base

# Install dependencies needed for Prisma and other packages
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies in a separate layer for better caching
FROM base AS deps
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Setup development environment
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]

# Build the application for production
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Production image
FROM base AS production
WORKDIR /app

# Set environment variables
ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Set the command to run the application
CMD ["node", "server.js"]