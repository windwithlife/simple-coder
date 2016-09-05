package com.simple.base.components.shiro.realm;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.simple.base.components.user.entity.SysPermission;
import com.simple.base.components.user.entity.SysRole;
import com.simple.base.components.user.entity.User;
import com.simple.base.components.user.service.UserService;

public class UserAuthorizingRealm extends AuthorizingRealm {

	@Autowired
	UserService userService;
	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
	       User user  = (User)principals.getPrimaryPrincipal();
	       for(SysRole role: user.getRoleList()){
	           authorizationInfo.addRole(role.getRole());
	           for(SysPermission p:role.getPermissions()){
	              authorizationInfo.addStringPermission(p.getPermission());
	           }
	       }
		// TODO Auto-generated method stub
		return authorizationInfo;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		// TODO Auto-generated method stub
		 //获取用户的输入的账号.
	       String username = (String)token.getPrincipal();
	       System.out.println(token.getCredentials());
	       
	       User userInfo = userService.findByUsername(username);
	       System.out.println("----->>userInfo="+userInfo);
	       if(userInfo == null){
	           return null;
	       }
	       
	       SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
	               userInfo, //用户名
	               userInfo.getPassword(), //密码
	                 this.getName()  //realm name
	         );
	      /* SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
	               userInfo, //用户名
	               userInfo.getPassword(), //密码
	                 ByteSource.Util.bytes(userInfo.getCredentialsSalt()),//salt=username+salt
	                 this.getName()  //realm name
	         );*/
		return authenticationInfo;
	}

}
