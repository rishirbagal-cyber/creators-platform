# Use node:18-alpine as base image
FROM node:18-alpine

# Set WORKDIR to /app
WORKDIR /app

# Copy package*.json first (for layer caching)
COPY package*.json ./

# Run npm ci (not npm install)
RUN npm ci

# Copy remaining code after installing dependencies
COPY . .

# Expose port 5000
EXPOSE 5000

# Proper CMD to start server
CMD ["npm", "start"]
