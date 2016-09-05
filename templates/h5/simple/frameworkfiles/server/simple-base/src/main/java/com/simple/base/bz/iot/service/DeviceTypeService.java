package com.simple.base.bz.iot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.base.bz.iot.dao.DeviceTypeRepository;
import com.simple.base.bz.iot.entity.DeviceType;

@Service
public class DeviceTypeService {
	@Autowired
	DeviceTypeRepository deviceDao;
	public List<DeviceType> getDevices(){
		return deviceDao.findAll();
	}
	public DeviceType getDeviceTypeById(Long id){
		return deviceDao.findOne(id);
	}
	public DeviceType save(DeviceType dt){
		return this.deviceDao.save(dt);
	}
	public void remove(Long id){
		this.deviceDao.delete(id);
	}
}
