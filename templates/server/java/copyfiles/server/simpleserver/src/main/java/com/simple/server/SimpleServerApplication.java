package com.simple.server;

import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;



//@EnableJpaAuditing

@SpringBootApplication(scanBasePackages="com.simple")
@EnableJpaRepositories("com.simple")
@EnableMongoRepositories("com.simple")
@EntityScan("com.simple.*") 
public class SimpleServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleServerApplication.class, args);
	}
}
