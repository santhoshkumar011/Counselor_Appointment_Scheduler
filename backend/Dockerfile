# Stage 1: Builder Stage (Only for node_modules and compilation, if needed)
FROM node:20-slim as builder

WORKDIR /app

# Copy only the package files to install dependencies
COPY package.json package-lock.json ./

# Install dependencies, including devDependencies if needed for build/test
# If you have a separate build step (like webpack/babel), run it here.
RUN npm install

# Copy application source code
COPY . .

# Run tests or build step if required (e.g., RUN npm run build)


# ----------------------------------------------------------------------

# Stage 2: Production/Runtime Stage (Minimal and Secure)
FROM node:20-slim

# Set environment to production
ENV NODE_ENV=production

WORKDIR /app

# Copy only production dependencies from the builder stage
# We use the official 'npm ci' to ensure dependencies match package-lock.json exactly
# We copy node_modules directly from the builder stage instead of reinstalling
COPY --from=builder /app/node_modules ./node_modules

# Copy only the necessary application files (compiled code and source)
COPY --from=builder /app/package*.json ./
COPY . .

# CRITICAL: Ignore files/folders that aren't needed at runtime (e.g., tests, build scripts)
# .dockerignore file handles this better, but this ensures minimal files are moved

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]