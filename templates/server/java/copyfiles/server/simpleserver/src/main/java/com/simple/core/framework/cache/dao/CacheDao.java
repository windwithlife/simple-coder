package com.simple.core.framework.cache.dao;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

@Repository
public class CacheDao {
	@Autowired
	StringRedisTemplate stringTemplate;
	
	@Resource(name="redisTemplate")
	ValueOperations<String,String> valueOpString;
	
	@Autowired
	RedisTemplate<Object,Object> redisTemplateObj;
	
	@Resource(name="redisTemplateObj")
	ValueOperations<Object,Object> valueOps;
	
	public Object get(Object key){
		return this.valueOps.get(key);
	}
	
	public void put(Object key, Object value){
		valueOps.set(key, value);
	}
	
	public String getString(String key){
		return this.valueOpString.get(key);
	}
	
	public void putString(String key, String value){
		valueOpString.set(key, value);
	}
	
}
