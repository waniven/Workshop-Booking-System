# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first to leverage build caching
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port 3000 for Node.js app
EXPOSE 3000

CMD ["npm", "start"]
