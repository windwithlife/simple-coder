package com.simple.base.components.nio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.simple.base.components.nio.framework.NettyServer;

@Configuration  
public class NIOConfig {
	@Bean
	public NettyServer nettyServer(){
		NettyServer server =  new NettyServer(8000);
		return server;
	}
}
