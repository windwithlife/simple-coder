package com.simple.base.components.nio.framework;

//import io.netty.channel.Channel;

public class Response {

	    private final int defaultStatusCode = 0;
	    private final String defaultStatusMessage = "ok";
		private String sessionId;
		private String command;
		private IConnection conn;
		//private Channel ch;
		
		public Response(Request req){
			this.sessionId = req.getSession();
			this.command = req.getCommand();
		    this.conn = ConnectionManager.getInstance().getConnect(req.getChannel());
		    //this.ch = req.getChannel();
		}
		public String getSession(){
			return this.sessionId;
		}
		public String getCommand(){
			return this.command;
		}
		
		public boolean doResponse(int statusCode, String msg, Object obj){
			
			if ((conn != null) && (conn.isActive())){
				//ch.writeAndFlush(res);
				conn.writeResponse(this.command, this.sessionId, statusCode, msg, obj);
				return true;
			}else{
				return false;
			}
		}
		public boolean doResponse(Object obj){
			return this.doResponse(defaultStatusCode,defaultStatusMessage, obj);
		}
		
		public boolean doResponse(){
			return this.doResponse(defaultStatusCode,defaultStatusMessage, "");
		}
		public boolean doFailureResponse(){
			return this.doResponse(-1,"Failed!", "");
		}
	}
