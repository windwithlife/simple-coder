package com.simple.base.components.nio.entity;

public class ForwardCommand {
	
	public ForwardCommand(String cmd){
		if (cmd != null){
			this.cmd = cmd;
		}
		
	}
	public String deviceId   = "123456";
	public String fromUserId = "222";
	public String toUserId = "111";
	public String cmd      = "open";

}
