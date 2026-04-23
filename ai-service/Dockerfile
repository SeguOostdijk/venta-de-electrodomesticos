FROM eclipse-temurin:23-jdk
ARG JAR_FILE=target/ai-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_ai.jar
ENTRYPOINT ["java","-jar","app_ai.jar"]
