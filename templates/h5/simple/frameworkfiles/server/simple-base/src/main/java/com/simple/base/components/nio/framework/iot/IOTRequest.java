package com.simple.base.components.nio.framework.iot;

import com.simple.base.components.nio.framework.Request;

public class IOTRequest extends Request {
	public final static String CMD_IOT = "80001";
	@Override
	public Object getRequest(Class<?> cls){
    	return this.input;
    }
	
	public IOTRequest(String input){
		this.command = IOTRequest.CMD_IOT;
		this.input = input;
	}
}
