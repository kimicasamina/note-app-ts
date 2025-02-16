# Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps  # Use --legacy-peer-deps to avoid peer dependency conflicts

# Install TypeScript globally
RUN npm install -g typescript

# Copy the application code
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Expose the backend port
EXPOSE 5000

# Command to run the backend
CMD ["npm", "run", "start"]
