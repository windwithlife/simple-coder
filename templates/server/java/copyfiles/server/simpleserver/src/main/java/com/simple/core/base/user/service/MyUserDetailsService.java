
package com.simple.core.base.user.service;

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

import com.simple.core.base.user.dao.UserRepository;
import com.simple.core.base.user.entity.SysRole;
import com.simple.core.base.user.entity.User;



@Service
public class MyUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;

	@Autowired
	public MyUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

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
