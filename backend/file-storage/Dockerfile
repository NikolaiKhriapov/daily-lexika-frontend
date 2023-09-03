# Stage 1: Build the JAR
FROM maven:3.8.7-openjdk-18-slim as build
WORKDIR /app
COPY ./target/*.jar .
COPY ./target/classes/static ./static

# Stage 2: Create the final image
FROM openjdk:18-slim
WORKDIR /app
COPY --from=build ./app/*.jar file-storage-0.0.1-SNAPSHOT.jar
COPY --from=build ./app/static /static
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "file-storage-0.0.1-SNAPSHOT.jar"]
