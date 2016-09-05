package com.simple.base.utils;

import java.io.StringReader;
import java.util.HashMap;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.thoughtworks.xstream.XStream;

public class SimpleXMLParser {
	private final static SimpleXMLParser instance = new SimpleXMLParser();
	//private static XStream xstream = new XStream(new MyXMLDriver());
    private SimpleXMLParser(){}
    public static SimpleXMLParser getInstance(){
    	return instance;
    }
    public static String toXML(Object obj){
    	XStream xstream = new XStream(new MyXMLDriver());
    	xstream.alias("xml", obj.getClass());
		return xstream.toXML(obj);
    }
    
    public static Object fromXML(String source, Class<?> cls){
    	XStream xstream = new XStream(new MyXMLDriver());
    	xstream.alias("xml",cls);
    	//xstream.useAttributeFor(cls);
    	return xstream.fromXML(source);
    	//return null;
    }
    public static HashMap<String, String> mapFromXML(String source){
    	HashMap<String, String> map = new HashMap<String, String>();
    	StringReader reader = new StringReader(source);
    	SAXReader saxReader = new SAXReader();
    	try {
			Document doc = saxReader.read(reader);
			Element root = doc.getRootElement();
			
			@SuppressWarnings("unchecked")
			List<Element> list =root.elements();
			for (Element e: list){
				map.put(e.getName(), e.getTextTrim());
			}
			
			return map;
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
    	
    }
}
