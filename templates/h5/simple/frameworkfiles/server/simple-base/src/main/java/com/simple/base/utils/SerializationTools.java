package com.simple.base.utils;

import java.util.HashMap;

public class SerializationTools {
	public HashMap<String, Class<? extends Object>> properties = new HashMap<String, Class<? extends Object>>();
	//public HashMap<String, Class<? extends Object>> properties = new HashMap<String, Class<? extends Object>>();
	private static SerializationTools instance;

	

	private SerializationTools() {

	};

	public static final SerializationTools getInstance() {
		if (instance == null) {
			instance = new SerializationTools();
		}
		return instance;
	}
    public void clear(){
    	this.properties.clear();
    }
	
	
	
	public void registerMapping(String path, Class<? extends Object> cls){
		properties.put(path, cls);
	}

	private Class<?> getClassType(String key){
		return this.properties.get(key);
	}
	
	
	public Object transferToObjectByRequestKey(String str, String key){
    	Class<? extends Object> cls = getClassType(key);
		if (null != cls){
			return JsonUtils.getInstance().toJsonObject(str, cls);
		}else {
			return null;
		}
		
    }
	
	
	public Object transferToObjectWithPacketedCommand(String str){
		
		int command = getCommand(str);
		if (command <= 0 ){
			return null;
		}
		return this.transferToObjectByRequestKey(str, String.valueOf(command));
		
	}
	
	public int getCommand(String str){
		try{
			int commandId = JsonUtils.getInstance().getJsonObject(str).get("command").getAsInt();
			return commandId;
		}catch(Exception e){
			//e.printStackTrace();
			System.out.println("Can not get the command ID from request message!!!");
			return -1;
		}
	
	}
	
	
   
    
	public String transferToData(Object bzo){
		return JsonUtils.getInstance().toJsonStr(bzo);
	}
}
