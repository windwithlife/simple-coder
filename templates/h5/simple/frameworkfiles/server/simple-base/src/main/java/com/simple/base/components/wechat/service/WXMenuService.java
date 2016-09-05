package com.simple.base.components.wechat.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.simple.base.components.wechat.entity.ResultEntity;
import com.simple.base.utils.JsonUtils;




@Service
public class WXMenuService {
	private String actionUrl;
	
	
	public ResultEntity addMenu(String menuItems){
		
		actionUrl = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s";	
		String token = AccessTokenService.getInstance().getAccessToken();
		if (null != token && ("").equalsIgnoreCase(token)){
			String url = String.format(actionUrl, token);
			RestTemplate rest = new RestTemplate();
			String response = rest.postForObject(url, null, String.class, menuItems);	
			if (null != response){
				ResultEntity result = JsonUtils.getInstance().toJsonObject(response, ResultEntity.class);
				return result;
			}
		};
		
		ResultEntity res = new ResultEntity();
		res.errcode = -1;
		res.errmsg = "error for deleting menu";
		return res;
	}
	public ResultEntity deleteAllMemu(){
		actionUrl = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s" ;
		
		String token = AccessTokenService.getInstance().getAccessToken();
		if (null != token && ("").equalsIgnoreCase(token)){
			String url = String.format(actionUrl, token);
			RestTemplate rest = new RestTemplate();
			String response = rest.getForObject(url, String.class);	
			if (null != response){
				ResultEntity result = JsonUtils.getInstance().toJsonObject(response,ResultEntity.class);
				return result;
			}
		};
		
		ResultEntity res = new ResultEntity();
		res.errcode = -1;
		res.errmsg = "error for deleting menu";
		return res;
		
	}
	public ResultEntity queryAllMenu(){
		
		ResultEntity res = new ResultEntity();
		actionUrl = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=%s" ;
		String token = AccessTokenService.getInstance().getAccessToken();
		if (null != token && ("").equalsIgnoreCase(token)){
			String url = String.format(actionUrl, token);
			RestTemplate rest = new RestTemplate();
			String response = rest.getForObject(url, String.class);	
			if (null != response){
				res.errcode = 0;
				res.errmsg  = response;
			}else{
				res.errcode = -1;
				res.errmsg = "error for get all menus";
			}
			
		};
		return res;
	}
	

	public String Execute(String request){
	
		//dto.status
		return null;
	}
	
	
}