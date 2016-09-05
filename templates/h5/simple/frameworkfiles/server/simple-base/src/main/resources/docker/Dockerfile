FROM docker.io/java
VOLUME /tmp
ADD simple-base-0.0.1-SNAPSHOT.jar app.jar
RUN bash -c 'touch /app.jar'
RUN mkdir -p /usr/local/share/upload
ENTRYPOINT ["java","--spring.profiles.active=docker","-jar","/app.jar"]