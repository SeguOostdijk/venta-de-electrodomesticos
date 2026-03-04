FROM eclipse-temurin:17-jdk
ARG JAR_FILE=target/api-gateway-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_api_gateway.jar
ENTRYPOINT ["java","-jar","app_api_gateway.jar"]
