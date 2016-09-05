package com.simple.base.components.nio.framework.stringline;


import com.simple.base.utils.JsonUtils;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public class StringLineEncoder extends MessageToByteEncoder<Object> {



	@Override
	protected void encode(ChannelHandlerContext arg0, Object arg1, ByteBuf arg2)
			throws Exception {
		// TODO Auto-generated method stub
		String str = "";
		if (arg1 instanceof String){
			str = (String)arg1;
		}else{
			str = JsonUtils.getInstance().toJsonStr(arg1);
		}
		str = str + "\r\n";
		arg2.writeBytes(str.getBytes());
		//arg0.writeAndFlush(arg0);
	}

}
