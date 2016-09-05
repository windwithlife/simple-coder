package com.simple.base.components.nio.service;

//import org.springframework.stereotype.Service;

import com.simple.base.components.nio.entity.RegisterDeviceRequest;
import com.simple.base.components.nio.entity.RegisterDeviceResponse;
//import com.simple.base.components.nio.framework.ConnectionManager;
//import com.simple.base.components.nio.framework.IConnection;
//import com.simple.base.components.nio.framework.Request;
import com.simple.base.components.nio.framework.RequestContext;



@NIOService
@HandlerMapping(path="device")
public class DeviceService {
	
	@HandlerMapping(id="10001", path="registerDevice")
	public  void registerDevice(RegisterDeviceRequest request, RegisterDeviceResponse response,RequestContext context){
		System.out.println("register device type is:" + request.deviceType + " id:" + request.deviceCode);
        context.getResponse().doResponse(response);
	}

}
