package com.simple.base;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
	@Value("${upload.path}") 
	private String uploadPath;
	
	@Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	      registry.addResourceHandler("/images/**").addResourceLocations("file:" + uploadPath);
	      registry.addResourceHandler("/**").addResourceLocations("classpath:/web/resource/");
	      registry.addResourceHandler("/**").addResourceLocations("classpath:/web/views/");
	        super.addResourceHandlers(registry);
	    }

}
