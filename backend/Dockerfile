# Use the official Node.js 20 Alpine image for a lightweight, secure footprint
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies to minimize image size and attack surface
RUN npm ci --only=production

# Copy source code
COPY . .

# Multi-stage build: Final image
FROM node:20-alpine

# Set Node environment to production
ENV NODE_ENV=production
# Default port for Google Cloud Run
ENV PORT=8080

WORKDIR /usr/src/app

# Copy built artifacts from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Security: Run as a non-root user
USER node

# Expose the Cloud Run port
EXPOSE 8080

# Start the Node.js application
CMD ["npm", "start"]
