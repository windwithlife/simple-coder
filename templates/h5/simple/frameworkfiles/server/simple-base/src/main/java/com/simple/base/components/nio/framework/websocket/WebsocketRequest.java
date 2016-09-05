package com.simple.base.components.nio.framework.websocket;

import com.simple.base.components.nio.framework.Request;
import com.simple.base.utils.JsonUtils;
import com.simple.base.utils.SerializationTools;


public class WebsocketRequest extends Request {
	//public final static String CMD_IOT = "1001";
	@Override
	public Object getRequest(Class<?> cls){
		return JsonUtils.getInstance().toJsonObject((String)input, cls);
    }
	
	public WebsocketRequest(String input){
		int command = SerializationTools.getInstance().getCommand(input);
		this.command = command + "";
		this.input = input;
	}
}
