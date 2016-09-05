package com.simple.base.components.nio.framework;



import com.simple.base.utils.SerializationTools;

import io.netty.channel.Channel;

public class HttpConnection implements IConnection {

	private Channel ch = null;
	private boolean bActive = true;
	public HttpConnection(Channel ch){
		this.ch = ch;
	}
	@Override
	public void writeResponse(String cmd,String sId, int statusCode, String msg, Object response) {
		ResponseDTO dto = new ResponseDTO(cmd, sId, statusCode,msg, response);	
		try {
			String data = SerializationTools.getInstance().transferToData(dto);
			ch.writeAndFlush(data);
					
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void close() {
		// TODO Auto-generated method stub
		this.bActive = false;
	}
	@Override
	public boolean isActive() {
		// TODO Auto-generated method stub
		return this.bActive;
	}

	
}
