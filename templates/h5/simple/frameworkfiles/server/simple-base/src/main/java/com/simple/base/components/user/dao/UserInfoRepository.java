package com.simple.base.components.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.components.user.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

}
