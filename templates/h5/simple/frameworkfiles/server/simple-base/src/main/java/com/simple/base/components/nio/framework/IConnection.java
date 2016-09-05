package com.simple.base.components.nio.framework;

public interface IConnection {
	public void writeResponse(String cmd,String sId, int statusCode, String msg, Object response);
	public void close();
	public boolean isActive();
	
}
