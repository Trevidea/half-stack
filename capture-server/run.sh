export PG_SRV="drake.in"
export PG_DBS="half-stack"
export PG_USR="postgres"
export PG_PWD="btc.008"
export PG_PORT="52525"
export FS_URL="http://drake.in:1337/api"
# Run the service
./build/api/capture-server > output.log
