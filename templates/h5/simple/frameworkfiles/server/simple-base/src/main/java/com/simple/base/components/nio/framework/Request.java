package com.simple.base.components.nio.framework;

import io.netty.channel.Channel;

public class Request {
	private String sessionId;
	//private String path;
	//private int commandId;
	protected String command;
	protected Object input;
	private Channel ch;
    public Object getRequest(Class<?> cls){
    	return this.input;
    }
	public Object getInput(){
		return this.input;
	}
	
	public void setInput(Object obj){
		this.input = obj;
	}
	public String getSession(){
		return this.sessionId;
	}
	public String getCommand(){
		return this.command;
	}
	public Channel getChannel(){
		return this.ch;
	}
	public void setChannel(Channel ch){
		this.ch = ch;
	}
	public void setCommand(String command){
		this.command = command;
		//this.path = String.valueOf(id);
	}
	/*public void setRequestPath(String path){
		this.path = path;
	}
	public String getRequestPath(){
		return this.path;
	}
	*/
	public void setSession(String session){
		this.sessionId = session;
	}
}
