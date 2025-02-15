# FROM node:14

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["node", "dist/app.js"]

# Use Node.js official image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the backend port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "prod"]


