package com.simple.base.bz.iot.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.bz.iot.entity.DeviceType;

public interface DeviceTypeRepository extends JpaRepository<DeviceType, Long> {
	
}
