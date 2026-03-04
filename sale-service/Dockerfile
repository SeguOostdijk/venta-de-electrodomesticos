FROM eclipse-temurin:23-jdk
ARG JAR_FILE=target/sale-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_sales.jar
ENTRYPOINT ["java","-jar","app_sales.jar"]
