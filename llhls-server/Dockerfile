# Use an official Nginx base image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy your HTML and other files into the container
COPY index.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

# Create necessary directories and set up volume for HLS content
RUN mkdir -p /usr/share/nginx/html/hls

# Expose port 80 for the HTTP server
EXPOSE 59919

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]






# # Use Nginx base image
# FROM nginx:alpine

# # Copy nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Create a directory to mount HLS files
# RUN mkdir -p /usr/share/nginx/html/hls

# # Expose port 80
# EXPOSE 80

# # Start Nginx when container starts
# CMD ["nginx", "-g", "daemon off;"]

