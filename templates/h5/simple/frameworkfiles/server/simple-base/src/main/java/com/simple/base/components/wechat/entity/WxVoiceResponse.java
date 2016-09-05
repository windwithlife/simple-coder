package com.simple.base.components.wechat.entity;



public class WxVoiceResponse {
	public String ToUserName;
	public String FromUserName;
	public String CreateTime;
	public String MsgType;
	
	public MsgBody Voice;
	
	public WxVoiceResponse(){
		this.Voice = new MsgBody();
	}
	
	
}
