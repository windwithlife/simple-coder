package com.simple.base.bz.iot.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.bz.iot.entity.DeviceItem;

public interface DeviceItemRepository extends JpaRepository<DeviceItem, Long> {

}
