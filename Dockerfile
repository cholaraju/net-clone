# Use official Node.js 18 image as the base
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package manifests and yarn config files
COPY package.json yarn.lock .yarnrc.yml ./

# Copy Yarn cache and plugins (if you use them)
COPY .yarn .yarn

# Install dependencies (only production deps by default, so use --immutable to respect yarn v3)
RUN yarn install --immutable

# Copy all app source code
COPY . .

# Build the Next.js app
RUN yarn build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files for production run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start Next.js production server
CMD ["yarn", "start"]
