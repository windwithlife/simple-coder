package com.simple.core.base.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.core.base.user.entity.UserInfo;



public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

}
