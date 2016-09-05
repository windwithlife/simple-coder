package com.simple.base.components.nio.framework.stringline;






import com.simple.base.components.nio.framework.ConnectionManager;
import com.simple.base.components.nio.framework.RequestCachePool;
import com.simple.base.components.nio.framework.iot.IOTRequest;
import com.simple.base.utils.SerializationTools;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
//import io.netty.handler.codec.http.websocketx.
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

public class StringLineServerHandler extends SimpleChannelInboundHandler {
	private static int totalConnection = 0;
	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object evt)
			throws Exception {
		// TODO Auto-generated method stub
		super.userEventTriggered(ctx, evt);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		// TODO Auto-generated method stub
		//super.exceptionCaught(ctx, cause);
		System.out.println("have exception....");//cause.printStackTrace();
	}

	//private RequestCachePool dispatcher = new RequestCachePool();
	
	public StringLineServerHandler(){
		
		
		//dispatcher.init();
	}
	
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub
		super.channelActive(ctx);
		
		ConnectionManager.getInstance().putConnection(ctx.channel(), new StringLineConnection(ctx.channel()));
		System.out.println("established a new STRING-LINE connection! Total Conecction Number[" + (++totalConnection) +"]" );
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		
		// TODO Auto-generated method stub
		super.channelInactive(ctx);
		ConnectionManager.getInstance().removeConnection(ctx.channel());
		System.out.println("A STRING-LINE connection closed! Established Total Conecction Number[" + (--totalConnection) +"]" );
	}

	@Override
	public void channelRead(ChannelHandlerContext arg0, Object msg)
			throws Exception {
		// TODO Auto-generated method stub
		if (null == msg){
			return;
		}
		//super.channelRead(arg0, msg);
	   // System.out.println("server side channel read....");
	    if (msg instanceof String){
	    	System.out.println("recieved STRING LINE DATA from:" + arg0.channel().remoteAddress().toString());
			String str = (String)msg;
			//Object params = null;
			int command = SerializationTools.getInstance().getCommand(str);
			if (command >0){
				StringLineRequest req= new StringLineRequest((String)msg);
				req.setChannel(arg0.channel());
				RequestCachePool.getInstance().pushToPool(req);
			}
			
	    }
	}

	@Override
	protected void channelRead0(ChannelHandlerContext arg0, Object arg1)
			throws Exception {
		
		// TODO Auto-generated method stub
		//System.out.println("server side channel read0....");
	}

}
