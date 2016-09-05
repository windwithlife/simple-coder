package com.simple.base.bz.iot.dao;

import org.springframework.data.jpa.repository.JpaRepository;

//import com.simple.base.bz.iot.entity.DeviceItem;
import com.simple.base.bz.iot.entity.DeviceStatus;

public interface DeviceStatusRepository extends JpaRepository<DeviceStatus, Long> {
	//DeviceStatus findBy
}
