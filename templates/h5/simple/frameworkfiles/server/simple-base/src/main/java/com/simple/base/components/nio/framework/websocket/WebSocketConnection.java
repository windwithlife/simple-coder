package com.simple.base.components.nio.framework.websocket;

import com.simple.base.components.nio.framework.IConnection;
import com.simple.base.components.nio.framework.ResponseDTO;
import com.simple.base.utils.SerializationTools;

import io.netty.channel.Channel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

public class WebSocketConnection implements IConnection {
	private boolean isActive = true;
	private Channel ch = null;
	public WebSocketConnection(Channel ch){
		this.ch  = ch;
	}
	

	@Override
	public void close() {
		// TODO Auto-generated method stub
		this.isActive = false;
	}

	@Override
	public boolean isActive() {
		// TODO Auto-generated method stub
		return this.isActive;
	}

	@Override
	public void writeResponse(String cmd,String sId, int statusCode, String msg, Object response) {
		ResponseDTO dto = new ResponseDTO(cmd, sId, statusCode,msg, response);	
		try {
			String data = SerializationTools.getInstance().transferToData(dto);
			ch.writeAndFlush(
					new TextWebSocketFrame(data));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
