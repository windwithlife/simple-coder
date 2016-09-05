package com.simple.base.components.wechat.entity;

import java.io.Serializable;

public class CheckEntity implements Serializable {
	private static final long serialVersionUID = -9023745442340631241L;
	public String signature;
	public String timestamp;
	public String nonce;
	public String echostr;
	

}
