docker stop llhls-server
docker rm llhls-server
docker build -t half-stack-llhls-server .
docker run -d -p 59919:80 -v /usr/share/ovenmediaengine/conf/html:/usr/share/nginx/html/hls -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf --name llhls-server half-stack-llhls-server
