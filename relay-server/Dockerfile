# Use an official Node.js runtime as the base image
FROM node:16

# Install dependencies for building native packages
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libzmq3-dev \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies (including TypeScript and native packages)
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port the app will run on
EXPOSE 3001
EXPOSE 4001

# Run the app using npm start
CMD ["npm", "run", "start"]
