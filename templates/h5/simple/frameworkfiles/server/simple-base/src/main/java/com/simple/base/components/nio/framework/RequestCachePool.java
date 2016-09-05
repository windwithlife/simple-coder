package com.simple.base.components.nio.framework;


import java.util.concurrent.ConcurrentLinkedQueue;

import com.simple.base.components.nio.service.DispatchCenter;


public class RequestCachePool implements Runnable {

	// private Logger logger = Logger.getLogger(getClass());
	//private DispatchCenter mServiceCenter;
	//private Executor messageExecutor;
	private MessageQueue messageQueue = new MessageQueue(
			new ConcurrentLinkedQueue<Request>());
	

	private boolean running;
	private long sleepTime = 200;
	private static  RequestCachePool instance = null;

	public static RequestCachePool getInstance() {
		if (null == instance){
			instance = new RequestCachePool();
			instance.init();
		}
		
		return instance;
	}

	public void setupLocalMessageQueue() {

	}

	

    public boolean pushToPool(Request request){
    	return this.addMessage(request);
    }
	private boolean addMessage(Request request) {
		boolean added = false;
		added = messageQueue.add(request);
		return added;
	}


	public RequestCachePool(){
		//this.messageExecutor = new FixedThreadPoolExecutor(5,80,300);
		
		this.setSleepTime(100);
	}

	public void init() {
		
		if (!running) {
			running = true;
		}

		new Thread(this).start();

	}

	public void stop() {
		running = false;
	}

	public void dispatchMessage(Request req) {
		
		DispatchCenter.getInstance().executeRequest(req);
	}

	public void run() {
		while (running) {

			if (messageQueue == null || messageQueue.size() <= 0
					|| messageQueue.isRunning())
				continue;
			Request req = this.messageQueue.getRequestQueue().poll();
			dispatchMessage(req);

			try {
				Thread.sleep(sleepTime);
			} catch (InterruptedException e) {

			}
		}
	}


	public void setSleepTime(long sleepTime) {
		this.sleepTime = sleepTime;
	}

	

}
