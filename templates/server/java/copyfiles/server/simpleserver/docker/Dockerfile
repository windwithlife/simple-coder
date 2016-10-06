FROM docker.io/java
VOLUME /tmp
ADD simple-base-0.0.1-SNAPSHOT.jar app.jar
RUN bash -c 'touch /app.jar'
RUN mkdir -p /usr/local/share/upload
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.profiles.active=docker"]