# Use the official Nodejs image from Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps 
RUN npm run build

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
