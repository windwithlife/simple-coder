package com.simple.base.components.nio.framework;

public class ResponseDTO {
	public class Header{
		public String command;
		public int statusCode;
		public String msg;
		public String sessionId;
	}
	//public class Body{
	//	public Object data;
	//}
	
	public Header header;
	Object body;
	//public Body body;
    public ResponseDTO(String cmd, String sId, int statusCode,String msg, Object response){
    	this.header = new Header();
    	//this.body = new Body();
    	this.header.command = cmd;
    	this.header.sessionId = sId;
    	this.header.statusCode = statusCode;
    	this.header.msg = msg;
    	this.body= response;
    }
}

