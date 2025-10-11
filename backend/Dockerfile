# Use official Node LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (including devDependencies for Prisma)
RUN npm install

# Copy the rest of the code (including prisma/schema.prisma)
COPY . .

# Generate Prisma client (now schema exists)
RUN npx prisma generate

# Expose the port your server runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
