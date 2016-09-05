package com.simple.base.bz.iot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import com.simple.base.bz.iot.dao.DeviceItemRepository;
import com.simple.base.bz.iot.dao.DeviceStatusRepository;
//import com.simple.base.bz.iot.entity.DeviceItem;
import com.simple.base.bz.iot.entity.DeviceStatus;


@Service
public class DeviceStatusService {
	@Autowired
	DeviceStatusRepository dao;
	public List<DeviceStatus> getItems(){
		List<DeviceStatus> items = dao.findAll();
		return items;
	}
	public DeviceStatus getById(Long id){
		return dao.findOne(id);
	}
	public DeviceStatus save(DeviceStatus dt){
		return this.dao.save(dt);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
}
