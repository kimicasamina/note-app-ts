# FROM node:14

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["npm", "start"]


# Use Node.js official image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the app
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
