FROM eclipse-temurin:23-jdk
ARG JAR_FILE=target/cart-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_carts.jar
ENTRYPOINT ["java","-jar","app_carts.jar"]
