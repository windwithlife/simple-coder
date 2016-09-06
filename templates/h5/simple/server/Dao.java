package com.simple.base.bz.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simple.base.bz.entity.*;

public interface <%=data.moduleName%>Repository extends JpaRepository<<%=data.moduleName%>, Long> {

}
