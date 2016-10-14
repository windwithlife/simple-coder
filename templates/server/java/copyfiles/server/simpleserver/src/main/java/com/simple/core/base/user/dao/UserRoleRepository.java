package com.simple.core.base.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.core.base.user.entity.SysRole;



public interface UserRoleRepository extends JpaRepository<SysRole, Long> {
	SysRole findById(Long id);
	SysRole findOneByRole(String roleName);
}
