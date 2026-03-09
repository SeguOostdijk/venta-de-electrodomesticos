FROM eclipse-temurin:23-jdk
ARG JAR_FILE=target/product-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_products.jar
ENTRYPOINT ["java","-jar","app_products.jar"]
