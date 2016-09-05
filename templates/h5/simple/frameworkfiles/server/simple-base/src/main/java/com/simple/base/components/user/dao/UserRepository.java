package com.simple.base.components.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.components.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByIdAndPassword(Long id, String password);
	User findByUsername(String username);
	User findById(Long id);
	User findByEmail(String email);
	
}
