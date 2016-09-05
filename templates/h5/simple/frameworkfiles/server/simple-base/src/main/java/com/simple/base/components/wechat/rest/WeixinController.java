package com.simple.base.components.wechat.rest;

import java.util.HashMap;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.bind.annotation.RequestParam;

import com.simple.base.components.wechat.service.WeiXinService;


import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;


@Controller
@RequestMapping("/appServer")
public class WeixinController {
	 private static final Logger logger = LogManager.getLogger(WeixinController.class);
	@Autowired
	private WeiXinService weixin;
	
	@RequestMapping(value = "/provider", method = RequestMethod.GET)
	@ResponseBody
	String getService(WebRequest request) {
        if (null == request){return null;}
        HashMap<String, String> requestmap = WebRequestParser.toMap(request);
        logger.debug(requestmap.toString());
        System.out.println("request is:----" + requestmap.toString());
        String echo = WebRequestParser.toMap(request).get("echostr");
       // weixin.dealWith(check)
		System.out.println("response is:---" + echo);
		
		return echo;

	}
	
	
	@RequestMapping(value = "/testWeixin", method = RequestMethod.GET)
	@ResponseBody
	public String welcome(@RequestParam String params){
		
		logger.debug("welcome");
		System.out.println("request is:----" + params);
		
		return "hello, world";
		
	}

	
	
	@RequestMapping(value = "/provider", method = RequestMethod.POST)
	public @ResponseBody
	String xmlPostService(WebRequest request, @RequestBody String requestBody) {
		HashMap<String, String> requestmap = WebRequestParser.toMap(request);
		System.out.println("querystring:---" + requestmap.toString() + "requestbody:---" + requestBody);
		logger.debug("querystring:---" + requestmap.toString()+ "requestbody:---" + requestBody);
		
		String response = weixin.handleMessage(requestBody);
		System.out.println("response is:----" +response);
		logger.debug("response is:----" +response);
		return response;
	}

}



