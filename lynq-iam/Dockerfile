FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/lynq-iam.jar lynq-iam.jar
EXPOSE 8080 8081
ENTRYPOINT ["java", "-jar", "lynq-iam.jar"]