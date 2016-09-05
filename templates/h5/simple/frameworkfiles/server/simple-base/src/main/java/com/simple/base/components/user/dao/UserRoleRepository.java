package com.simple.base.components.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.components.user.entity.SysRole;
import com.simple.base.components.user.entity.User;

public interface UserRoleRepository extends JpaRepository<SysRole, Long> {
	SysRole findById(Long id);	
}
