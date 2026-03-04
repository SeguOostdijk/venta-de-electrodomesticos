FROM eclipse-temurin:23-jdk
ARG JAR_FILE=target/config-server-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_config_server.jar
ENTRYPOINT ["java","-jar","app_config_server.jar"]
