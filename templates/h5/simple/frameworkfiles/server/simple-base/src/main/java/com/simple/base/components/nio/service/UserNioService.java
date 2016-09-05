package com.simple.base.components.nio.service;

import org.springframework.stereotype.Service;

import com.simple.base.components.nio.entity.LoginRequest;
import com.simple.base.components.nio.entity.LoginResponse;
import com.simple.base.components.nio.framework.RequestContext;

@NIOService
@HandlerMapping(path ="user")
public class UserNioService  {

	@HandlerMapping(id="20000")
	public void login(LoginRequest request, LoginResponse response, RequestContext context){
		System.out.println("UserService is dealing with...");
		
	}

}
