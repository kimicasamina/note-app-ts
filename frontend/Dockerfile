# Use the official Node.js image from Docker Hub
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Install the serve package to serve the built app
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to serve the built app
CMD ["serve", "-s", "build"]
