package com.simple.base.components.nio.framework;

import io.netty.channel.Channel;

public interface ResponseWriter {
	public boolean writeAndFlush(Channel ch, String command, Object response);
}
