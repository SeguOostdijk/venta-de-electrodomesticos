FROM eclipse-temurin:23-jdk
ARG JAR_FILE=target/auth-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_auth.jar
ENTRYPOINT ["java","-jar","app_auth.jar"]