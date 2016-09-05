package com.simple.base.components.user.rest;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authz.AuthorizationException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping("/user/test")
public class UserManager {

	/* @ExceptionHandler(value = Exception.class)
	 public ModelAndView handleException(Exception e){
		 System.out.println("usermanager mydefine messge" + e.getMessage());
		 ModelAndView model = new ModelAndView("403");
		 model.addObject("errorMsg",e.getMessage());
		 return model;
	 }*/
	 
	 @ExceptionHandler(value = AuthorizationException.class)
	 public ModelAndView handleAuthorizationException(Exception e){
		 System.out.println("A Authorization Failure, MSG: " + e.getMessage());
		 
		 ModelAndView model = new ModelAndView("403");
		 model.addObject("Msg",e.getMessage());
		 return model;
	 }
	 
	 @ExceptionHandler(value = AuthenticationException.class)
	 public String handleAuthenticationException(Exception e){
		 System.out.println(" Authentication Failure, MSG : " + e.getMessage());
		 return "login";
	 }
	 @RequestMapping(value="/login",method=RequestMethod.GET)
	    public String login(){
	       return"login";
	    }
    /**
     * 用户查询.
     * @return
     */
	@Secured("ROLE_TELLER")
    @RequestMapping(value = "/userList", method=RequestMethod.GET)
    public String userInfo(){
       return "userInfo";
    }
   
    /**
     * 用户添加;
     * @return
     */
  
    @RequestMapping(value = "/userAdd", method=RequestMethod.POST)
    public String userInfoAdd(){
       return "userInfoAdd";
    }
    
    /**
     * 用户删除;
     * @return
     */
  
    @RequestMapping(value = "/userDel", method=RequestMethod.POST)
  
    public String userDel(){
       return "userInfoDel";
    }
    
  
}
