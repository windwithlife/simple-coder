package com.simple.base.components.nio.framework.websocket;

//import static io.netty.handler.codec.http.HttpHeaders.isKeepAlive;
import static io.netty.handler.codec.http.HttpHeaders.*;
//import static io.netty.handler.codec.http.HttpHeaders.Names.*;
//import static io.netty.handler.codec.http.HttpResponseStatus.OK;
import static io.netty.handler.codec.http.HttpResponseStatus.BAD_REQUEST;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;

import com.simple.base.components.nio.framework.ConnectionManager;
import com.simple.base.components.nio.framework.HttpConnection;
import com.simple.base.components.nio.framework.Request;
import com.simple.base.components.nio.framework.RequestCachePool;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
//import io.netty.handler.codec.http.DefaultHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpHeaders;
//import io.netty.handler.codec.http.HttpHeaders.Values;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PingWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PongWebSocketFrame;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;
import io.netty.util.CharsetUtil;

/**
 * Handles handshakes and messages
 */
public class WebSocketServerHandler extends SimpleChannelInboundHandler<Object> {

	// public Logger log = Logger.getLogger(this.getClass());
	private static final String WEBSOCKET_PATH = "/websocket";
    //private RequestCachePool dispatcher = new RequestCachePool();
	
	public WebSocketServerHandler(){
		
	}

	private WebSocketServerHandshaker handshaker;

	@Override
	protected void channelRead0(ChannelHandlerContext arg0, Object arg1)
			throws Exception {
		
	}
    
	
	@Override
	public void channelRead(ChannelHandlerContext arg0, Object arg1)
			throws Exception {
		// TODO Auto-generated method stub
		if (null == arg1){ 
			return;
		}
		ChannelHandlerContext ctx = arg0;
		Object msg = arg1;
		if (msg instanceof HttpRequest) {
            //进行握手操作
			handleHttpRequest(ctx, (FullHttpRequest) msg);
		} else if (msg instanceof WebSocketFrame) {
			handleWebSocketFrame(ctx, (WebSocketFrame) msg);
		} else{
			arg0.fireChannelRead(arg1);
		}

	}


	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub
		super.channelActive(ctx);
		System.out.println("new connection arriaved....");
		
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub
		super.channelInactive(ctx);
		System.out.println("connection close....");
		ConnectionManager.getInstance().removeConnection(ctx.channel());
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		// TODO Auto-generated method stub
		super.exceptionCaught(ctx, cause);
	}

	private void handleNormalHttp(ChannelHandlerContext ctx, HttpRequest req) {
		
		if (req instanceof HttpContent) {
			ConnectionManager.getInstance().putConnection(ctx.channel(), new HttpConnection(ctx.channel()));	
			System.out.println("new normal http connection arrival");
		}
	}

	private void handleHttpRequest(ChannelHandlerContext ctx, FullHttpRequest req)
			throws Exception {
		// Allow only GET methods.

		if (!req.getDecoderResult().isSuccess()) {
			sendHttpResponse(ctx, req, new DefaultFullHttpResponse(HTTP_1_1,
					BAD_REQUEST));
			return;
		} else if (!"websocket".equals(req.headers().get("Upgrade"))) {
			handleNormalHttp(ctx, req);
			return;
		}

		// Handshake
		WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(
				this.getWebSocketLocation(req), null, false);
		this.handshaker = wsFactory.newHandshaker(req);
		if (this.handshaker == null) {
			WebSocketServerHandshakerFactory.sendUnsupportedVersionResponse(ctx.channel());

		} else {
			this.handshaker.handshake(ctx.channel(), req);

		}
		ConnectionManager.getInstance().removeConnection(ctx.channel());
		ConnectionManager.getInstance().putConnection(ctx.channel(), new WebSocketConnection(ctx.channel()));
	}

	private void handleWebSocketFrame(ChannelHandlerContext ctx,
			WebSocketFrame frame) {

		// Check for closing frame
		if (frame instanceof CloseWebSocketFrame) {
			this.handshaker.close(ctx.channel(), (CloseWebSocketFrame) frame);
			return;
		} else if (frame instanceof PingWebSocketFrame) {
			
			System.out.println("recieved websocket ping! from:" + ctx.channel().remoteAddress().toString());
			ctx.channel().write(
					new PongWebSocketFrame(frame.content().retain()));
			return;
		} else if (frame instanceof TextWebSocketFrame) {
			System.out.println("recieved websocket package from:" + ctx.channel().remoteAddress().toString());
			String str = ((TextWebSocketFrame)frame).text();
			//int command = SerializationTools.getInstance().getCommand(str);
			//Object obj = SerializationTools.getInstance().transferToObjectByRequestKey(str,String.valueOf(command));
			WebsocketRequest req= new WebsocketRequest(str);
			req.setChannel(ctx.channel());
			req.setSession("websocket");
			
			
			
			RequestCachePool.getInstance().pushToPool(req);
			
			
		} else if (frame instanceof BinaryWebSocketFrame) {
			System.out.println("recieved websocket binary package from:" + ctx.channel().remoteAddress().toString());
			String str = frame.content().toString();
			
			WebsocketRequest req= new WebsocketRequest(str);
			req.setChannel(ctx.channel());
			req.setSession("websocket");
			//this.dispatcher.pushToPool(req);
			RequestCachePool.getInstance().pushToPool(req);
		}else{
			System.out.println("Exception Data from client");
			return;
		
		}

		
	}

	private void sendHttpResponse(ChannelHandlerContext ctx, HttpRequest req,
			FullHttpResponse res) {
		// Generate an error page if response status code is not OK (200).
		if (res.getStatus().code() != 200) {
			ByteBuf buf = Unpooled.copiedBuffer(res.getStatus().toString(),
					CharsetUtil.UTF_8);
			res.content().writeBytes(buf);
			buf.release();
			HttpHeaders.setContentLength(res, res.content().readableBytes());
		}

		// Send the response and close the connection if necessary.
		ChannelFuture f = ctx.channel().write(res);
		if (!isKeepAlive(req) || res.getStatus().code() != 200) {
			f.addListener(ChannelFutureListener.CLOSE);
		}
	}

	private String getWebSocketLocation(HttpRequest req) {
		return "ws://" + req.headers().get(HttpHeaders.Names.HOST)
				+ WEBSOCKET_PATH;
	}


	
}