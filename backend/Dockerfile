# Use official Node LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for Prisma)
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the code
COPY . .

# Expose the port your server runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
