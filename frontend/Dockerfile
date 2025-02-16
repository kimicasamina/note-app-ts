# Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package*.json files first (for better cache management)
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the application code (including tsconfig.json)
COPY . .

# Build the React app (and TypeScript code)
RUN npm run build

# Install the serve package to serve the built app
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to serve the built app
CMD ["serve", "-s", "build"]
