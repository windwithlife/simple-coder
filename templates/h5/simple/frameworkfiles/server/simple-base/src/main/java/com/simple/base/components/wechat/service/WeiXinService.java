package com.simple.base.components.wechat.service;

import java.util.Date;
import java.util.HashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.base.components.wechat.entity.CheckEntity;
import com.simple.base.components.wechat.entity.ResultEntity;
import com.simple.base.components.wechat.entity.WxImageRequest;
import com.simple.base.components.wechat.entity.WxLinkRequest;
import com.simple.base.components.wechat.entity.WxLocationRequest;
import com.simple.base.components.wechat.entity.WxTextRequest;
import com.simple.base.components.wechat.entity.WxTextResponse;
import com.simple.base.components.wechat.entity.WxVideoRequest;
import com.simple.base.components.wechat.entity.WxVoiceRequest;
import com.simple.base.components.wechat.entity.WxVoiceResponse;
import com.simple.base.utils.SimpleXMLParser;



@Service
public class WeiXinService {
	private static final Logger logger = LogManager.getLogger(WeiXinService.class);
	@Autowired
	WXMenuService menuService;
	
	private String menuStr = "{ \"button\": [{\"name\": \"first\", \"sub_button\": ["
                + "{" +
                   " \"type\": \"scancode_waitmsg\"," +
                    "\"name\": \"nametest\", " +
                    "\"key\": \"rselfmenu_0_0\"," + 
                    "\"sub_button\": [ ] " +
                "}" +
	            "]}]}" ;
	public void WeiXinService(){
		System.out.println("create menu string:" + "menuStr");
		ResultEntity result = menuService.addMenu(menuStr);
		logger.info(result.errmsg);
		
	}
	
	public String dealWith(CheckEntity check){
		if (this.verify(check)){
			return check.echostr;
		} else{
			return null;
		}
		
	}

	protected boolean verify(CheckEntity check){
		return true;
	}
	
	public String handleMessage(String request){
		HashMap<String, String> map = SimpleXMLParser.mapFromXML(request);
		System.out.println("create menu string:" + menuStr);
		ResultEntity ret = menuService.addMenu(menuStr);
		logger.info(ret.errmsg);
	
		String msgType = map.get("MsgType");
		String result  ="";
		if (msgType.equalsIgnoreCase("text")){
			result = handleTextMsg(request);
		}
		if (msgType.equalsIgnoreCase("image")){
			result = handleImageMsg(request);
		} 
		if (msgType.equalsIgnoreCase("location")){
			result = handleLocationMsg(request);
		} 
		if (msgType.equalsIgnoreCase("voice")){
			
			result = handleVoiceMsg(request);
		} 
		
		if (msgType.equalsIgnoreCase("video")){
			result = handleVideoMsg(request);
		} 
		if (msgType.equalsIgnoreCase("link")){
			result = handleLinkMsg(request);
		}
		return result;
	}
	
	public String handleTextMsg(String msg){
		
		//XMLParam obj = (XMLParam)SimpleXMLParser.fromXML(msg, XMLParam.class);
		WxTextRequest obj = (WxTextRequest)SimpleXMLParser.fromXML(msg, WxTextRequest.class);		
		WxTextResponse result = new WxTextResponse();
		result.Content      = obj.Content + "have been recieved!!!";
		result.MsgType      = obj.MsgType;
		result.FromUserName = obj.ToUserName;
		result.ToUserName   = obj.FromUserName;
		result.CreateTime   = obj.CreateTime;
		return SimpleXMLParser.toXML(result);
	}
	
	public String handleImageMsg(String msg){
		WxImageRequest obj = (WxImageRequest)SimpleXMLParser.fromXML(msg, WxImageRequest.class);
		return this.replyText(obj.FromUserName, obj.ToUserName, "ͼƬ�ĵ��治��");
	}
	
	public String handleLocationMsg(String msg){
		WxLocationRequest obj = (WxLocationRequest)SimpleXMLParser.fromXML(msg, WxLocationRequest.class);
		return this.replyText(obj.FromUserName, obj.ToUserName, "�յ��㷢������λ�ã���Ҫʲô����");
	
			
	}
	
	public String handleLinkMsg(String msg){
		
		WxLinkRequest obj = (WxLinkRequest)SimpleXMLParser.fromXML(msg, WxLinkRequest.class);
		
		return this.replyText(obj.FromUserName, obj.ToUserName, "�յ�������ӣ����Ǵ򲻿�ѽ����");
		
	}
	
	public String handleVoiceMsg(String msg){
		
		WxVoiceRequest obj = (WxVoiceRequest)SimpleXMLParser.fromXML(msg, WxVoiceRequest.class);
		return this.replyText(obj.FromUserName, obj.ToUserName, "������������");
		
	}
	
	public String handleVideoMsg(String msg){
	
		WxVideoRequest obj = (WxVideoRequest)SimpleXMLParser.fromXML(msg, WxVideoRequest.class);
		return this.replyText(obj.FromUserName, obj.ToUserName, "����Ƶ�����ĵ���");
	}
	
	//reply the all kinds of message from client
	public String replyVoice(String toUser, String fromUser, String mediaId){
		WxVoiceResponse result = new WxVoiceResponse();
		result.MsgType      = "voice";
		result.FromUserName = fromUser;
		result.ToUserName   = toUser;
		result.CreateTime   = String.valueOf(new Date().getTime());
		result.Voice.MediaId= mediaId;
		return SimpleXMLParser.toXML(result);
	}
	
	public String replyText(String toUser, String fromUser, String text){
		WxTextResponse result = new WxTextResponse();
		result.MsgType      = "text";
		result.FromUserName = fromUser;
		result.ToUserName   = toUser;
		result.CreateTime   = String.valueOf(new Date().getTime());
		result.Content      = text;
		return SimpleXMLParser.toXML(result);
	}
}
