package com.simple.base.bz.iot.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

   
@Entity
public class DeviceType implements Serializable{
	 private static final long serialVersionUID = 1L;
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id; // 编号
	    private String name; // 角色标识程序中判断使用,如"admin",这个是唯一的:
	    private String pic; // 角色描述,UI界面显示使用
	    private Long picid;
	    private String model;
	    private String des; 
	  
	    public DeviceType(){
	    	this.name = "testfile";
	    	
	    }
	    public DeviceType(String name, String pic, String desc, String model){
	    	this.name = name;
	    	this.pic = pic;
	    	this.des = desc;
	    	this.model = model;
	    }
	    public Long getId() {
	        return id;
	     }
	    
	   
	     public void setId(Long id) {
	        this.id = id;
	     }
	     
	     public Long getPicid() {
		        return this.picid;
		 }
		    
		   
		     public void setPicid(Long id) {
		        this.picid = id;
		     }
	    
		public String getName(){
			return this.name;
		}
		public void setName(String name){
			 this.name = name;
		}
		public String getModel(){
			return this.model;
		}
		public void setModel(String m){
			 this.model = m;
		}
		
		public String getDes(){
			return this.des;
		}
		public void setDes(String desc){
			 this.des = desc;
		}
		public String getPic(){
			return this.pic;
		}
		public void setPic(String pic){
			 this.pic = pic;
		}
	     
	    @Override
	    public String toString() {
	       return "DeviceType DATA: [id=" + id + ", name=" + name + ", pic=" + pic + ", desc=" + des + "]";
	    }
}
