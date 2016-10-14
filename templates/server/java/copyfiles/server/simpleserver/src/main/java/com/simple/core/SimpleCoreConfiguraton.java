package com.simple.core;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration

//@EnableJpaAuditing
@EnableRedisHttpSession
public class SimpleCoreConfiguraton {

}
