package com.simple.base.components.nio.framework;

//import io.netty.channel.Channel;

public class RequestContext {
	//private IConnection connection = null;
	//private String command = "default";
	private Request request = null;
	public RequestContext(Request req){
		this.request = req;
		
		//Channel channel = req.getChannel();
		//this.connection = ConnectionManager.getInstance().getConnect(channel);
		//this.command = req.getCommand();
	}
	public Response getResponse(){
		return new Response(this.request);
	}
}
