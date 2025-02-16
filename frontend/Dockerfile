# Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package*.json files first 
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the application code 
COPY . .

# Build the React app 
RUN npm run build

# Install the serve package to serve the built app
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to serve the built app with fallback to index.html for SPA routing
CMD ["serve", "-s", "dist", "--single"]
