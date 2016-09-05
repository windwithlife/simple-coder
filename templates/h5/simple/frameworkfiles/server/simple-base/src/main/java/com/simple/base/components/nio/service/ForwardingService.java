package com.simple.base.components.nio.service;


import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestMapping;

import com.simple.base.components.nio.entity.ForwardCommand;
import com.simple.base.components.nio.framework.ConnectionManager;
import com.simple.base.components.nio.framework.IConnection;
import com.simple.base.components.nio.framework.RequestContext;



@NIOService

@HandlerMapping(path ="forwarding")
public class ForwardingService {

	@HandlerMapping(path ="toUser", id="20001")
	public boolean forwardToUser(ForwardCommand request, String response, RequestContext context){
		System.out.println("register device type is:" + request.cmd + " id:" + request.deviceId);
        context.getResponse().doResponse("test");
		return true;	
	}


}
