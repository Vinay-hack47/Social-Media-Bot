# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port (default 3000)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
# Or use ["node", "server.js"] for production