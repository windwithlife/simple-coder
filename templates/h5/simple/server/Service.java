package com.simple.base.bz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simple.base.bz.dao.*;
import com.simple.base.bz.entity.*;


@Service
public class <%=data.moduleName%>Service {
	@Autowired
	<%=data.moduleName%>Repository dao;
	public List<<%=data.moduleName%>> findAll(){
		return  deviceItemDao.findAll();
		//return items;
	}
	public <%=data.moduleName%> findById(Long id){
		return dao.findOne(id);
	}
	public <%=data.moduleName%> save(<%=data.moduleName%> item){
		return this.dao.save(item);
	}
	public void remove(Long id){
		this.dao.delete(id);
	}
}
