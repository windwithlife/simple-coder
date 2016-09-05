package com.simple.base.components.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.components.user.entity.UserClientInfo;

public interface UserClientInfoRepository extends JpaRepository<UserClientInfo, Long> {

}
