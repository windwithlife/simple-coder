package com.simple.core.base.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.core.base.user.entity.UserClientInfo;



public interface UserClientInfoRepository extends JpaRepository<UserClientInfo, Long> {

}
