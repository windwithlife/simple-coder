package com.simple.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
	@Value("${upload.path}") 
	private String uploadPath;
	
	@Value("${simple.web.root}") 
	private String webroot;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	      registry.addResourceHandler("/images/**").addResourceLocations("file:" + uploadPath);
	      registry.addResourceHandler("/**").addResourceLocations("classpath:/public/").addResourceLocations("classpath:/static/").addResourceLocations("classpath:/META-INF/resources/").addResourceLocations("classpath:/public/dist/themes/charisma/").addResourceLocations("file:" + webroot).addResourceLocations("classpath:/auto/");
	      
	      super.addResourceHandlers(registry);
	}
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**").allowedHeaders("*")
                .allowedMethods("*")
                .allowedOrigins("*");

    }

}
