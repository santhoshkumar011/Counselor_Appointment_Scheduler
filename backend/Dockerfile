# Multi-stage build for a Node.js backend

# STAGE 1: Builder - Install production dependencies
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package files to install dependencies efficiently
COPY package*.json ./

# Install only production dependencies
# This keeps the final image small
RUN npm install --production

# Copy application source code
COPY . .

# STAGE 2: Final image - A lightweight runtime environment
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary production dependencies and code from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Expose the application port (assuming your backend runs on port 3000)
EXPOSE 3000

# Command to run the application when the container starts (e.g., 'node server.js' or 'npm start')
CMD [ "npm", "start" ] 
