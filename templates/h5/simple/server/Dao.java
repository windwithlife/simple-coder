package <%=data.packageName%>.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import <%=data.packageName%>.entity.*;

public interface <%=data.moduleName%>Repository extends JpaRepository<<%=data.moduleName%>, Long> {

}
