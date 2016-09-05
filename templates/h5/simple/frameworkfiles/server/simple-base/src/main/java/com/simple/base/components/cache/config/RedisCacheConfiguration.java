package com.simple.base.components.cache.config;

import java.lang.reflect.Method;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@EnableCaching//
public class RedisCacheConfiguration extends CachingConfigurerSupport {
   
 
    @Bean
    public CacheManager cacheManager(RedisTemplate<?,?> redisTemplate) {
       CacheManager cacheManager = new RedisCacheManager(redisTemplate);
       return cacheManager;
    }
 
    @Override
    public KeyGenerator keyGenerator() {
       System.out.println("RedisCacheConfig.keyGenerator()");
       return new KeyGenerator() {
           @Override
           public Object generate(Object o, Method method, Object... objects) {
              // This will generate a unique key of the class name, the method name
              //and all method parameters appended.
              StringBuilder sb = new StringBuilder();
              sb.append(o.getClass().getName());
              sb.append(method.getName());
              for (Object obj : objects) {
                  sb.append(obj.toString());
              }
              System.out.println("keyGenerator=" + sb.toString());
              return sb.toString();
           }
       };
    }
   
    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory factory) {
       RedisTemplate<String, String> redisTemplate = new RedisTemplate<String, String>();
       redisTemplate.setConnectionFactory(factory);
      
      
       RedisSerializer<String> redisSerializer = new StringRedisSerializer();
       redisTemplate.setKeySerializer(redisSerializer);
       redisTemplate.setHashKeySerializer(redisSerializer);
       redisTemplate.setValueSerializer(redisSerializer);
      
       return redisTemplate;
    }
   
    @Bean
    public RedisTemplate<Object, Object> redisTemplateObject(RedisConnectionFactory factory) {
       RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<Object, Object>();
       redisTemplate.setConnectionFactory(factory);
      
       ObjectMapper om = new ObjectMapper();
       om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
       om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
       
       Jackson2JsonRedisSerializer serializer = new Jackson2JsonRedisSerializer(Object.class);
       serializer.setObjectMapper(om);
      
       RedisSerializer<String> redisSerializer = new StringRedisSerializer();//Long绫诲瀷涓嶅彲浠ヤ細鍑虹幇寮傚父淇℃伅;
       redisTemplate.setKeySerializer(redisSerializer);
       redisTemplate.setHashKeySerializer(redisSerializer);
       redisTemplate.setValueSerializer(serializer);
     
       return redisTemplate;
    }
   
 
}