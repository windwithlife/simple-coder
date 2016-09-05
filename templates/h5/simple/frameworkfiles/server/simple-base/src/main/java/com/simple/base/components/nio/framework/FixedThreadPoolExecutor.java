package com.simple.base.components.nio.framework;

import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class FixedThreadPoolExecutor extends ThreadPoolExecutor {
	public FixedThreadPoolExecutor(int corePoolSize, int maximumPoolSize,
			long keepAliveSecond, String poolName) {
		super(corePoolSize, maximumPoolSize, keepAliveSecond, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>(), Executors.defaultThreadFactory());
	}
	
	public FixedThreadPoolExecutor(int corePoolSize, int maximumPoolSize,
			long keepAliveSecond) {
		super(corePoolSize, maximumPoolSize, keepAliveSecond, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());
	}
}
