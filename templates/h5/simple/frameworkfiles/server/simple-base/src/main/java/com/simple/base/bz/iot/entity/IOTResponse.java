package com.simple.base.bz.iot.entity;



public class IOTResponse{
	
	private int statusCode = 0; 
	private String msg = "success";
	public String getMsg(){
		return this.msg;
	}
	public int getStatusCode(){
		return this.statusCode;
	}
	public void setMsg(String msg){
		this.msg = msg;
	}
	public void setStatusCode(int code){
		this.statusCode = code;
	}
	public IOTResponse(int code, String msg){
		this.statusCode = code;
		this.msg = msg;
	}
   
}
