package com.simple.base.components.nio.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.simple.base.components.nio.framework.NettyServer;
import com.simple.base.components.user.entity.User;
import com.simple.base.components.user.service.UserService;

@RestController
public class NIOController {
	
	@Autowired
	NettyServer nioServer;
	
	@RequestMapping(value = "/server/start", method = RequestMethod.GET)
	public long startServer(){
		nioServer.startServer();
		return 0;
		//return userService.register(user);
	}
	
	@RequestMapping(value = "/server/stop", method = RequestMethod.GET)
	public long stopServer(){
		nioServer.startServer();
		return 0;
		//return userService.register(user);
	}
}
