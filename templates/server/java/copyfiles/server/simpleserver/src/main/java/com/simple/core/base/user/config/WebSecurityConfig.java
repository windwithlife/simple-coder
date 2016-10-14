/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.simple.core.base.user.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.simple.core.base.user.service.MyUserDetailsService;


import org.springframework.context.annotation.AdviceMode;


//import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;

@EnableGlobalMethodSecurity(securedEnabled = true)
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	//@Autowired
	//MyUserDetailsService userInfoService;
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
		.authorizeRequests()
			.antMatchers("/css/**", "/index","/img","/js").permitAll()
			.antMatchers("/admin/**").authenticated();
		http.formLogin().loginPage("/login").failureUrl("/error");
		http.logout().permitAll();
		http.csrf().disable(); //permist csrf.
		http.headers().frameOptions().sameOrigin();//Permit cross origin frame source display.
	
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth, @Qualifier("myUserDetailsService") UserDetailsService userDetailsService) throws Exception {
		auth.userDetailsService(userDetailsService);//.passwordEncoder(new BCryptPasswordEncoder());
          /*		
		auth
		.inMemoryAuthentication()
			.withUser("user").password("123456").roles("USER");*/
	}


}
