# Use a base image with the desired Linux distribution
FROM ubuntu:latest

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y \
        cmake \
        g++ \
        git \
        libnlohmann-json-dev \
        # Add any other dependencies here \
        && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . .

# Build the project using cmake
RUN cmake . && \
    make

# Expose the port the service runs on
EXPOSE 8081

# Specify the command to run when the container starts
CMD ["./html_log"]
