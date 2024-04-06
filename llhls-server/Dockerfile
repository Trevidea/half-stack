# Use Nginx base image
FROM nginx:alpine

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Create a directory to mount HLS files
RUN mkdir -p /usr/share/nginx/html/hls

# Expose port 80
EXPOSE 80

# Start Nginx when container starts
CMD ["nginx", "-g", "daemon off;"]

