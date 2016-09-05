package com.simple.base.components.file.dao;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

    

@Entity
public class FileUploadInfo{
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id; // 编号
	    private String filename; // 角色标识程序中判断使用,如"admin",这个是唯一的:
	    private String fullpath; // 角色描述,UI界面显示使用
	    private short  filetype; 
	    private int    bztype;   //所属业务类型
	    public FileUploadInfo(){
	    	this.filename = "testfile";
	    }
	    public FileUploadInfo(String name, String fullpath, int bzType){
	    	this.filename = name;
	    	this.fullpath = fullpath;
	    	this.bztype = bzType;
	    	this.filetype = 0;
	    }
	    public Long getId() {
	        return id;
	     }
	    
	   
	     public void setId(Long id) {
	        this.id = id;
	     }
	     public int getBzType() {
		        return this.bztype;
		 }
		 public void setBzType(int type) {
		     this.bztype = type;
		 }
		 
		 public int getFiletype() {
		        return this.bztype;
		 }
		 public void setFiletype(int type) {
		     this.bztype = type;
		 }
	     public String getFullPath(){
		    	return this.fullpath;
		    }
	     public void setFullPath(String path){
		    	this.fullpath = path;
		    }
	     public String setFilename(){
		    	return this.fullpath;
		    }
	     public void getFilename(String path){
		    	this.fullpath = path;
		    }
	     
	    @Override
	    public String toString() {
	       return "SysRole [id=" + id + ", filename=" + filename + ", fullpath=" + fullpath + ", bztype=" + bztype + "]";
	    }
}

