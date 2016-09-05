package com.simple.base;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

import com.google.common.collect.FluentIterable;

import nz.net.ultraq.thymeleaf.LayoutDialect;

@Configuration
@EnableJpaAuditing
@SpringBootApplication
@EnableRedisHttpSession
public class SimpleBaseApplication {

	  @Bean
	    public MultipartConfigElement multipartConfigElement() {
	        MultipartConfigFactory factory = new MultipartConfigFactory();
	        //factory.setLocation("simple-base/images");
	        factory.setMaxFileSize("2048KB");
	        factory.setMaxRequestSize("2048KB");
	        return factory.createMultipartConfig();
	    }
	
	@Bean
	public LayoutDialect layoutDialect() {
		return new LayoutDialect();
	}
	
	public static void main(String[] args) {
		//FluentIterable.class.getProtectionDomain().getCodeSource().getLocation().toExte‌​rnalForm();
		SpringApplication.run(SimpleBaseApplication.class, args);
	}

}
