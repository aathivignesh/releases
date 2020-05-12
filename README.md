# releases
Web Application to maintain releases using Spring Boot, MySQL in Docker Containers

# Create Docker image for MySQL server

docker build -t mysqlserver -f Dockerfile_mysql .

# Create Docker image for AppServer

docker build -t mavenjdk .

# Create a bridge network

docker network create app_bridge -d bridge

# Run containers in mentioned order

docker run -d --name=mysql1 --network=app_bridge -p 3306:3306 mysqlserver
docker run -d --name=appserver1 --network=app_bridge -p 80:80 mavenjdk 
