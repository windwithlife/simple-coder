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
package com.simple.base.components.user.service;

import java.util.ArrayList;
import java.util.Collection;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.simple.base.components.user.dao.UserRepository;
import com.simple.base.components.user.entity.SysPermission;
import com.simple.base.components.user.entity.SysRole;
import com.simple.base.components.user.entity.User;

import antlr.collections.List;

/**
 * @author Rob Winch
 *
 */
@Service
public class UserRepositoryUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;

	@Autowired
	public UserRepositoryUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername
	 * (java.lang.String)
	 */
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		User user = this.userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("Could not find user " + username);
		}
		return new CustomUserDetails(user);
	}

	private final static class CustomUserDetails extends User implements UserDetails {

		private User user = null;
		private CustomUserDetails(User user) {
			this.user = user;
		
		}

		public Collection<? extends GrantedAuthority> getAuthorities() {
			
			   ArrayList<GrantedAuthority> gaList = new ArrayList<GrantedAuthority>();
			   
		       for(SysRole role: user.getRoleList()){
		    	   gaList.add(new SimpleGrantedAuthority(role.getRole()));        
		       }
			return gaList;
		}

		public String getUsername() {
			//return getEmail();
			return this.user.getUsername();
		}

		public String getPassword() {
			//return getEmail();
			System.out.println(this.user.getUsername() + this.user.getPassword());
			return this.user.getPassword();
		}
		public boolean isAccountNonExpired() {
			return true;
		}

		public boolean isAccountNonLocked() {
			return true;
		}

		public boolean isCredentialsNonExpired() {
			return true;
		}

		public boolean isEnabled() {
			return true;
		}

		private static final long serialVersionUID = 5639683223516504866L;
	}
}
