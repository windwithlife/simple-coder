package com.simple.base.bz.iot.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Entity
public class DeviceItem implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id; // 编号
	private String name; // 角色标识程序中判断使用,如"admin",这个是唯一的:
	//private int status; // 角色描述,UI界面显示使用
	private String deviceCode;
	private int temperature;

	@JoinColumn(name = "type_id") // 关联device_type表的字段
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER, optional = false)
	private DeviceType type;

	//@JoinColumn(name = "status_id",referencedColumnName="ref_id") // 关联device_status表的字段
	@JoinColumn(name = "status_id") // 关联device_status表的字段
	@OneToOne(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@NotFound(action=NotFoundAction.IGNORE)
	private DeviceStatus status;
	
	public DeviceItem() {
		this.name = "testfile";

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DeviceType getType() {
		return this.type;
	}

	public void setType(DeviceType t) {
		this.type = t;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeviceCode() {
		return this.deviceCode;
	}

	public void setDeviceCode(String code) {
		this.deviceCode = code;
	}

	public DeviceStatus getStatus() {
		return this.status;
	}

	public void setStatus(DeviceStatus s) {
		this.status = s;
	}

	public int getTemperature() {
		return this.temperature;
	}

	public void setTemperature(int t) {
		this.temperature = t;
	}

	@Override
	public String toString() {
		return "DeviceType DATA: [id=" + id + ", name=" + name + ", status=" + status + ", temperature=" + temperature
				+ "]";
	}
}
