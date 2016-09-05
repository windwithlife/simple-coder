package com.simple.base.bz.iot.entity;

import java.io.Serializable;


import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class DeviceParamStatus implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long    id; // 
	private Long    itemId; // 
	private Long    paramId;
	private String  paramName; // 角色描述,UI界面显示使用
	private String  paramValue;


	public DeviceParamStatus() {
		this.paramValue = "";

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getParamName() {
		return this.paramName;
	}

	public void setParamName(String p) {
		this.paramName = p;
	}

	public String getParamValue() {
		return this.paramValue;
	}

	public void setParamValue(String p) {
		this.paramValue = p;
	}
	

	@Override
	public String toString() {
		return "DeviceParamSTatus DATA: [id=" + id + ", paramName=" + paramName + ", paramValue=" + paramValue
				+ "]";
	}
}
