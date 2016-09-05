package com.simple.base.components.nio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import com.simple.base.components.nio.framework.NettyServer;

@Component
@Order(value=1)
public class NettyCommandLineRunner implements CommandLineRunner {

	@Autowired
	NettyServer nioServer;
	
	@Override
	public void run(String... arg0) throws Exception {
		// TODO Auto-generated method stub
		/*
		nioServer.stopServer();
		nioServer.startServer();
		System.out.println(">>>>>>>>>>>>>>>NIO(Netty)服务启动执行，执行加载数据等操作<<<<<<<<<<<<<");
		*/
	}

}
