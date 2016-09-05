package com.simple.base.components.wechat.service;

import java.util.Date;

import org.springframework.web.client.RestTemplate;

public class AccessTokenService {
	private String token;
	private long   lastApplyTime;
	private static AccessTokenService instance = new AccessTokenService();
	public static AccessTokenService getInstance(){
		return instance;
	}
	private AccessTokenService(){}
	public String getAccessToken(){
		if (isExpired()){
		   if (reApplyAccessToken()){
			   this.lastApplyTime = new Date().getTime();
			   return token;
		   }else{return null;}
		   
		}else{return token;}
	
		
	}
	public boolean isExpired(){
		long now = new Date().getTime();
		if ((now - lastApplyTime) >= 7200){
			return true;
		}else{
			return false;
		}
		
	}
	public boolean reApplyAccessToken(){
		String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxab40646436615275&secret=67e8db82cf7748d8569b53e4836d00e6";
		RestTemplate rest = new RestTemplate();
		String response = rest.getForObject(url, String.class);
		if (null != response && !("").equalsIgnoreCase(response)){
			token = response;
			System.out.println("Get Token---------------" + token);
			return true;
		}else{
			return false; 
		}
		
	}
}
