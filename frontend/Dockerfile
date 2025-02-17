# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# RUN npm install
RUN npm install --legacy-peer-deps


# Copy the rest of the code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app using a static file server
FROM nginx:alpine

# Copy the build from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
