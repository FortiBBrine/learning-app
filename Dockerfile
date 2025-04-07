FROM eclipse-temurin:17-jdk-alpine as builder

WORKDIR /app

RUN apk add --no-cache findutils bash

COPY backend/gradle ./gradle
COPY backend/build.gradle.kts backend/settings.gradle.kts backend/gradlew ./

RUN ./gradlew dependencies --no-daemon

COPY backend/src ./src

RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar ./app.jar

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75 -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
