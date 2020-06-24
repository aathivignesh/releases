FROM ubuntu:latest

RUN apt-get -y update && apt-get -y install openjdk-8-jdk && apt-get -y install maven
RUN mkdir -p /home/src
COPY ./source /home/src/
WORKDIR /home/src
RUN chmod -R 777 *
RUN mvn clean package
EXPOSE 80
ENTRYPOINT ["java","-jar","target/releases-0.0.1-SNAPSHOT.jar"]
