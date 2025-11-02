---
title: "Docker Best Practices for Production"
date: "2025-01-20"
author: "Nyuu"
description: "Learn essential Docker best practices to build secure, efficient, and maintainable container images"
tags: ["docker", "containers", "devops", "best-practices"]
language: "en"
published: true
---

# Docker Best Practices for Production

Building Docker images for production requires careful consideration of security, performance, and maintainability. Let's explore the best practices that will help you create production-ready containers.

## Use Official Base Images

Always start with official images from trusted sources:

```dockerfile
# Good
FROM node:20-alpine

# Avoid
FROM some-random-user/node
```

Alpine-based images are smaller and contain fewer vulnerabilities, making them ideal for production.

## Multi-Stage Builds

Multi-stage builds help reduce image size by separating build dependencies from runtime dependencies:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Minimize Layers

Each instruction in a Dockerfile creates a layer. Combine related commands to reduce layers:

```dockerfile
# Less efficient
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git

# Better
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*
```

## Use .dockerignore

Just like `.gitignore`, use `.dockerignore` to exclude unnecessary files:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
```

## Don't Run as Root

Running containers as root is a security risk. Create a non-privileged user:

```dockerfile
FROM node:20-alpine

# Create app user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

WORKDIR /app
COPY --chown=appuser:appuser . .

USER appuser

CMD ["node", "index.js"]
```

## Use Specific Tags

Never use `latest` tag in production. Pin specific versions:

```dockerfile
# Avoid
FROM node:latest

# Better
FROM node:20.10.0-alpine3.19
```

## Scan for Vulnerabilities

Regularly scan your images for security vulnerabilities:

```bash
# Using Docker Scout
docker scout cves my-image:tag

# Using Trivy
trivy image my-image:tag
```

## Optimize Layer Caching

Order your Dockerfile instructions from least to most frequently changing:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Dependencies change less frequently
COPY package*.json ./
RUN npm ci --only=production

# Source code changes more frequently
COPY . .

CMD ["node", "index.js"]
```

## Health Checks

Implement health checks to ensure your container is running correctly:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1
```

## Use Build Arguments and Environment Variables Wisely

```dockerfile
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Sensitive data should come from runtime environment
ENV DATABASE_URL=${DATABASE_URL}
```

## Conclusion

Following these Docker best practices will help you build secure, efficient, and maintainable container images. Remember:

- Keep images small
- Minimize attack surface
- Use multi-stage builds
- Never run as root
- Pin specific versions
- Scan regularly for vulnerabilities

Happy containerizing! 🐳
