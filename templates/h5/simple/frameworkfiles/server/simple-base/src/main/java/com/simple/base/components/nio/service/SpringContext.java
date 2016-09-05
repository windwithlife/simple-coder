package com.simple.base.components.nio.service;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;

@Component
public class SpringContext implements ApplicationContextAware{
	private static ApplicationContext context = null;
    //逻辑严重不完整，需重写
	public static ApplicationContext createFileContext(String xmlFile) {
		
		try {
			if (xmlFile == null || xmlFile.equalsIgnoreCase("")) {
				xmlFile = "classpath*:com/x/config/server.xml";
			}
			context = new FileSystemXmlApplicationContext(
					new String[] { xmlFile });
		} catch (Exception e) {
			System.out.println("Failed to get Spring Context");
		};
		return context;
	}// end of the get Context;
	
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) {
		checkApplicationContext();
		return (T) context.getBean(name);
	}

	
	public static <T> T getBean(Class<T> requiredType) {
		checkApplicationContext();
		return context.getBean(requiredType);
	}
	
	public void setApplicationContext(ApplicationContext applicationContext) {
		SpringContext.context = applicationContext; // NOSONAR
	}

	public static ApplicationContext getApplicationContext() {
		checkApplicationContext();
		return context;
	}
	
	
	/**
	 * 清除applicationContext静态变量.
	 */
	public static void cleanApplicationContext() {
		context = null;
	}

	private static void checkApplicationContext() {
		if (context == null) {
			throw new IllegalStateException(
					"applicaitonContext未注册请在applicationContext.xml中定义SpringContextHolder");
		}
	}
}
