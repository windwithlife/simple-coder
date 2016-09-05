package com.simple.base.components.nio.framework;

import java.util.Queue;


public final class MessageQueue {

	private Queue<Request> requestQueue;
	private boolean running = false;

	public MessageQueue(Queue<Request> requestQueue) {
		this.requestQueue = requestQueue;
	}

	public Queue<Request> getRequestQueue() {
		return requestQueue;
	}

	/**
	 * 清除消息队列
	 */
	public void clear() {
		requestQueue.clear();
		requestQueue = null;
	}

	/**
	 * 获取消息队列长度
	 * 
	 * @return
	 */
	public int size() {
		return requestQueue != null ? requestQueue.size() : 0;
	}

	/**
	 * 向消息队列中添加请求消息
	 * 
	 * @param request
	 * @return
	 */
	public boolean add(Request request) {
		return this.requestQueue.add(request);
	}

	/**
	 * 设置消息队列运行状态
	 * 
	 * @param running
	 */
	public void setRunning(boolean running) {
		this.running = running;
	}

	/**
	 * 消息队列是否正在被轮询
	 * 
	 * @return
	 */
	public boolean isRunning() {
		return running;
	}

}