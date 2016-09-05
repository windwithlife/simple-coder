package com.simple.base.components.wechat.rest;

import java.util.HashMap;
import java.util.Iterator;

import org.springframework.web.context.request.WebRequest;

public class WebRequestParser {
	public static HashMap<String, String> toMap(WebRequest request){
		request.getContextPath();
		HashMap<String, String> result = new HashMap<String, String>();
		Iterator<String> it =  request.getParameterNames();
		while (it.hasNext()){
			String key = it.next();
			String value = request.getParameter(key);
			result.put(key, value);
		}
	
		return result;
	}

}
