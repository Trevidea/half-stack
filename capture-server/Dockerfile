# Use a base image with the desired Linux distribution
FROM ubuntu:latest

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y \
        cmake \
        g++ \
        libssl-dev \
        libpq-dev \
        git \
        # Add any other dependencies here \
        && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PG_SRV your_postgres_server
ENV PG_DBS your_postgres_database
ENV PG_USR your_postgres_user
ENV PG_PWD your_postgres_password

# Clone your project from GitHub
RUN git clone --recursive https://github.com/Trevidea/half-stack.git /app

# Set the working directory
WORKDIR /app

# Check the contents of the /app directory
RUN ls -la /app

# Build your project using cmake
RUN cmake . && \
    make

# Specify the command to run when the container starts
CMD ["./capture-server"]
