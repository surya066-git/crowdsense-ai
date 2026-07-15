# ==============================================================================
# STAGE 1: Dependency Builder
# ==============================================================================
FROM node:20-alpine AS builder

# Set default work directory
WORKDIR /usr/src/app

# Copy package manifests
COPY package*.json ./

# Install only production dependencies (clean, fast, secure)
RUN npm ci --omit=dev

# Copy application source code (node_modules is excluded by .dockerignore)
COPY src/ ./src/

# ==============================================================================
# STAGE 2: Clean Production Image
# ==============================================================================
FROM node:20-alpine

# Set environment to production
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /usr/src/app

# Copy production dependencies and application files from the builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src

# Create application logs and uploads directory and ensure correct ownership
RUN mkdir -p logs uploads && chown -R node:node /usr/src/app

# Security: Run the container process under a non-privileged system user
USER node

# Expose port (Cloud Run defaults to routing traffic to 8080)
EXPOSE 8080

# Production Healthcheck using Node.js native fetch (v20+)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 8080) + '/').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start the Express server
CMD ["npm", "start"]
