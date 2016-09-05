package com.simple.base.components.nio.framework;




import com.simple.base.components.nio.framework.iot.IOTServerHandler;
import com.simple.base.components.nio.framework.stringline.StringLineEncoder;
import com.simple.base.components.nio.framework.stringline.StringLineServerHandler;
import com.simple.base.components.nio.framework.websocket.WebSocketServerHandler;
import com.simple.base.components.nio.service.DispatchCenter;
import com.simple.base.components.nio.service.SpringContext;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.LineBasedFrameDecoder;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.string.StringDecoder;
//import io.netty.handler.codec.string.StringEncoder;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.util.CharsetUtil;

public class NettyServer implements Runnable{
	
	private boolean g_bRunning = false;
    private Thread t = null;
	private int port;
	private int devicePort;
	private int devicePort2;
	public NettyServer(int port) {

		this.port = port;
		this.devicePort = port + 1;
		this.devicePort2 = port + 2;

	}
    public void setPort(int port){
    	this.port = port;
    	this.devicePort = port + 1;
		this.devicePort2 = port + 2;
    }
	public NettyServer(){}
	
	public void run() {

		
		EventLoopGroup bossGroup = new NioEventLoopGroup();

		EventLoopGroup workerGroup = new NioEventLoopGroup();

		System.out.println("即时消息（Websocket）服务启动在：" + port + "\r\n物联网（TCP）服务启动在:" + this.devicePort+ "\r\n字符串消息（TCP）服务启动在:" + this.devicePort2);
		
		try {

			

			ServerBootstrap a = new ServerBootstrap();
			ServerBootstrap b = new ServerBootstrap();
			ServerBootstrap c = new ServerBootstrap();

			a.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class).childHandler(new ChannelInitializer<SocketChannel>() {

				@Override
				public void initChannel(SocketChannel ch) throws Exception {
					
					ch.pipeline().addLast(new LineBasedFrameDecoder(32768));
					ch.pipeline().addLast(new StringLineEncoder());
					ch.pipeline().addLast(new StringDecoder(CharsetUtil.UTF_8));
                    ch.pipeline().addLast("MessageHandler", new IOTServerHandler());           
			   }
			});
			
			b.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class).childHandler(new ChannelInitializer<SocketChannel>() { // (4)

				@Override
				public void initChannel(SocketChannel ch) throws Exception {
				
					ch.pipeline().addLast(new HttpServerCodec());
					ch.pipeline().addLast(new ChunkedWriteHandler());
					ch.pipeline().addLast(new HttpObjectAggregator(64*1024));
					
					ch.pipeline().addLast("aggregator", new WebSocketServerHandler());
					
				}

			});           
			

			c.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class).childHandler(new ChannelInitializer<SocketChannel>() {

				@Override
				public void initChannel(SocketChannel ch) throws Exception {
					
					ch.pipeline().addLast(new LineBasedFrameDecoder(32768));
					ch.pipeline().addLast(new StringLineEncoder());
					ch.pipeline().addLast(new StringDecoder(CharsetUtil.UTF_8));
                    ch.pipeline().addLast("MessageHandler", new StringLineServerHandler());           
			   }
			});
			
			a.option(ChannelOption.SO_BACKLOG, 128).childOption(ChannelOption.SO_KEEPALIVE, true);
			b.option(ChannelOption.SO_BACKLOG, 128).childOption(ChannelOption.SO_KEEPALIVE, true);
			c.option(ChannelOption.SO_BACKLOG, 128).childOption(ChannelOption.SO_KEEPALIVE, true);
			
			ChannelFuture fa = a.bind(devicePort).sync();
			ChannelFuture fb = b.bind(port).sync();
			ChannelFuture fc = c.bind(devicePort2).sync();
			fa.channel().closeFuture().sync();
			fb.channel().closeFuture().sync();
			fc.channel().closeFuture().sync();

		}catch(Exception e){
			e.printStackTrace();
		}
		finally {

		
			workerGroup.shutdownGracefully();
			bossGroup.shutdownGracefully();

		}

	}

	public void startServer(){
		if (g_bRunning){
			System.out.println("Server is already RUNNING!");
			return;
		}
		DispatchCenter.getInstance().LoadServiceCenter();
		try{
			if (null != t){
				t.interrupt();
			}
			t = new Thread(this);
			t.start();
			
		}catch(Exception e){
			if (null != t){
				t.interrupt();
			}
			e.printStackTrace();
		}finally{
			g_bRunning = true;
		}
		
	}
	
	@SuppressWarnings("finally")
	public void stopServer(){
		if (g_bRunning){
			try{
				if (null != t){
					t.interrupt();
				}
			
				
			}catch(Exception e){
				if (null != t){
					t.interrupt();
				}
				e.printStackTrace();
			} finally {
				g_bRunning = false;
				return;
			}
			
		}
	
	}
	public static void main(String[] args) throws Exception {

		//DOMConfigurator.configureAndWatch("config/log4j.xml");
	
		int port;

		if (args.length > 0) {

			port = Integer.parseInt(args[0]);

		} else {

			port = 8000;

		}
		
		//this.context =SpringContext.createFileContext(null);
		DispatchCenter.getInstance().setApplicationSpringContext(SpringContext.createFileContext(null));
		NettyServer server = new NettyServer(port);
		server.startServer();
		
		
		
	}

}
