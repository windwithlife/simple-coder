package com.simple.base.components.nio.framework.iot;

import com.simple.base.components.nio.framework.IConnection;
import com.simple.base.components.nio.framework.ResponseDTO;


import io.netty.channel.Channel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

public class IOTConnection implements IConnection{
	private Channel ch = null;
	private boolean isActive = true;
	//private ResponseWriter writer = StringLineResponseWriter.getInstance();
	public IOTConnection(Channel ch){
		this.ch = ch;
		this.isActive = true;
	}
	

	@Override
	public void writeResponse(String cmd,String sId, int statusCode, String msg, Object response) {
		try {
			ch.writeAndFlush(response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void close() {
		this.isActive = false;
	}

	@Override
	public boolean isActive() {
		// TODO Auto-generated method stub
		return this.isActive;
	}
}
