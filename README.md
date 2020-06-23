# releases
Web Application to maintain releases using Spring Boot, MySQL in Docker Containers

# Create Docker image for MySQL server

docker build -t mysqlserver -f Dockerfile_mysql .

# Create Docker image for AppServer

docker build -t mavenjdk .

# Running containers using docker-compose

docker-compose up

