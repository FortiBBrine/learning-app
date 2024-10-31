FROM debian:latest
WORKDIR /app
COPY ./backend .
RUN apt update
RUN apt install -y openjdk-17-jdk
RUN ./gradlew bootJar
ENTRYPOINT ["java", "-jar", "build/libs/LearningApp.jar"]
