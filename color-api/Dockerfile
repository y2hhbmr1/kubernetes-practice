# Use Node.js base image
FROM node:22-alpine3.20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Start app
CMD ["npm", "start"]
