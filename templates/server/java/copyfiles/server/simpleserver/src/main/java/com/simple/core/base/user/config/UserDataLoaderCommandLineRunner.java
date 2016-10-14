package com.simple.core.base.user.config;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.simple.core.base.user.dao.UserRepository;
import com.simple.core.base.user.dao.UserRoleRepository;
import com.simple.core.base.user.entity.SysRole;
import com.simple.core.base.user.entity.User;



@Component
@Order(value=1)
public class UserDataLoaderCommandLineRunner implements CommandLineRunner {

	@Autowired
	UserRepository userDao;
	
	@Autowired
	UserRoleRepository roleDao;
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		SysRole admin = this.roleDao.findOneByRole("ADMIN");
		if (null == admin){
			admin = new SysRole();
			admin.setRole("ADMIN");
			admin.setAvailable(true);
			admin = roleDao.save(admin);
		}
		
		ArrayList<SysRole> roles = new ArrayList<SysRole>();
	    roles.add(admin);
        
        User adminUser = userDao.findByUsername("admin");
        if (null == adminUser){
        	adminUser = new User();
        	adminUser.setUsername("admin");
            adminUser.setPassword("123456");
        }
        adminUser.setRoleList(roles);
        this.userDao.save(adminUser);
	}

}
