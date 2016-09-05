package com.simple.base.components.nio.framework;

import io.netty.channel.Channel;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConnectionManager {
	
	private Map<String, IConnection> connectionMap = new ConcurrentHashMap<String, IConnection>();
	private Map<Channel, IConnection> chConnectionMap = new ConcurrentHashMap<Channel, IConnection>();
	private static ConnectionManager  instance = new ConnectionManager();
	public static ConnectionManager getInstance(){
		return instance;
	}
	private ConnectionManager(){
		
	}
	
	public void putConnection(String id, IConnection connection){
		this.connectionMap.put(id, connection);
	}
	public void putConnection(Channel ch, IConnection connection){
		chConnectionMap.put(ch, connection);
	}
	public IConnection getConnect(Channel ch){
		return this.chConnectionMap.get(ch);
	}
	public IConnection getConnect(String id){
		return this.connectionMap.get(id);
	}
	public void removeConnection(Channel ch){
		IConnection conn = this.chConnectionMap.get(ch);
		if (null != conn){
			conn.close();
		}
		this.chConnectionMap.remove(ch);
	}
	public void removeConnection(String id){
		this.connectionMap.remove(id);
	}
	
}
