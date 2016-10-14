package com.simple.core.base.user.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;

import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class User implements Serializable{

	
	private static final long serialVersionUID = -2187415914855805012L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Long userId;
	private String username;
	private String name;
	private String email;
	private String password;
	private String salt;// 加密密码的盐
	private String address;
	private byte state;// 用户状态,0:创建未认证（比如没有激活，没有输入验证码等等）--等待验证的用户 ,
						// 1:正常状态,2：用户被锁定
	// private Byte status;
	@ManyToMany(fetch = FetchType.EAGER) // 立即从数据库中进行加载数据;
	@JoinTable(name = "SysUserRole", joinColumns = { @JoinColumn(name = "uid") }, inverseJoinColumns = {
			@JoinColumn(name = "roleId") })
	private List<SysRole> roleList;// 一个用户具有多个角色

	private @JsonIgnore @LastModifiedDate LocalDateTime lastModifiedDate; 
	public enum Status {
		LOGIN, LONGOUT
	};

	public User() {
		this.state = Integer.valueOf(0).byteValue();
	}

	public List<SysRole> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<SysRole> roleList) {
		this.roleList = roleList;
	}

	public String getCredentialsSalt() {
		return this.username + this.salt;
	}

	public Byte getStatus() {
		return state;
	}

	public void setStatus(Byte status) {
		this.state = status;
	}

	

	public User(Long uid, String name) {
		this.userId = uid;
		this.username = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
