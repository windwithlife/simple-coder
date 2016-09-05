package com.simple.base.utils;

import java.io.Writer;

import com.thoughtworks.xstream.core.util.QuickWriter;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.xml.PrettyPrintWriter;
import com.thoughtworks.xstream.io.xml.XppDriver;


public class MyXMLDriver extends XppDriver {
	@Override
	public HierarchicalStreamWriter createWriter(Writer out) {
		//PrettyPrintWriter write = new PrettyPrintWriter();
		return new PrettyPrintWriter(out){
		          boolean cdata = true;
		          
		          @SuppressWarnings("rawtypes")
				  @Override
		          public void startNode(String name, Class clazz) {
		               super.startNode(name, clazz);
		               //cdata = name.equalsIgnoreCase("value");
		          }
		 
		          @Override
		          public void setValue(String text) {
		               super.setValue(text);    //To change body of overridden methods use File | Settings | File Templates.
		          }
		 
		          @Override
		          protected void writeText(QuickWriter writer, String text) {
		              if(cdata){
		                   writer.write("<![CDATA[");
		                   writer.write(text);
		                   writer.write("]]>");
		              }else {
		                   writer.write(text);
		              }
		           }//end of writeText;
		        };//end of PrettyPrintWriter
	}//end of createWriter;
}// end of MyXMLDriver;
