package com.simple.core.base.user.entity;

import java.sql.Date;
import java.sql.Timestamp;

//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.Table;


@Entity
//@Table(name = "uc_user_info", catalog = "hk_onebyone3")
public class UserInfo{
	//private static final long serialVersionUID = -1054811624585432734L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private	Long userId;
	private Date birthday;
	private String nickname;
	private Timestamp lastLoginTime;
	private Timestamp registerTime;
	private String areaName;//区域名

	public UserInfo() {
		this.userId = null;
		this.birthday = null;
		this.nickname = null;
		this.lastLoginTime = null;
		this.areaName = null;
	}
	
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	//@Column(name="birthday")	
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	//@Column(name="nickname", length=20)	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	//@Column(name="last_login_time")	
	public Timestamp getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Timestamp lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	//@Column(name="register_time")	
	public Timestamp getRegisterTime() {
		return registerTime;
	}

	public void setRegisterTime(Timestamp registerTime) {
		this.registerTime = registerTime;
	}
	
	//@Column(name="area_name", length=10)	
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}	
}
