package com.simple.base.components.nio.entity;

public class LoginRequest {
	public LoginRequest(int userId, String password){
		this.userId   = userId;
		this.password = password;
	}
	public void setUserName(String name){
		this.userName = name;
	}
	public String userName;
	public String password;
	public int    userId;

}
