
FROM maven:3.3.3

ADD pom.xml /tmp/build/
RUN cd /tmp/build && mvn -q dependency:resolve

ADD src /tmp/build/src
      
RUN cd /tmp/build && mvn -q -DskipTests=true  package \
       
        && mv target/*.jar /app.jar \
      
        && cd / && rm -rf /tmp/build

VOLUME /tmp
RUN mkdir -p /usr/local/share/upload
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.profiles.active=docker"]
