package com.simple.base.components.user.rest;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.simple.base.components.user.dao.UserRoleRepository;
import com.simple.base.components.user.entity.SysRole;
import com.simple.base.components.user.entity.User;
import com.simple.base.components.user.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRoleRepository roleDao;
	
	@RequestMapping(value="/register",method=RequestMethod.POST)
	public User register(@RequestBody User user){
	
		return userService.register(user);
	}
	
	@ResponseBody
	@RequestMapping(value="/adminUsers/save",method=RequestMethod.POST)
	public User addUser(@RequestBody User user){
		return userService.save(user);
	}
	
	@ResponseBody
	@RequestMapping(value="/adminUsers/",method=RequestMethod.GET)
	public List<User> getAdminUsers(){
		return userService.getUsers();
	}
	
	@ResponseBody
	@RequestMapping(value="/roles/",method=RequestMethod.GET)
	public List<SysRole> getRoles(){
		return roleDao.findAll();
	}
	
	@ResponseBody
	@RequestMapping(value="/roles/save",method=RequestMethod.POST)
	public SysRole addRole(@RequestBody SysRole role){
		return roleDao.save(role);
	}
	
	@ResponseBody
	@RequestMapping(value="/roles/query/{id}",method=RequestMethod.GET)
	public SysRole getRoleById(@RequestParam Long id){
		//return userService.getUsers();
		return roleDao.findById(id);
	}
	
	@ResponseBody
	@RequestMapping(value="/adminUsers/query/{id}",method=RequestMethod.GET)
	public User getAdminUserById(@RequestParam Long id){
		//return userService.getUsers();
		return null;
	}
	@ResponseBody
	@RequestMapping(value="/users/",method=RequestMethod.POST)
	public List<User> getUsers(@RequestBody User user){
		return userService.getUsers();
	}
	@RequestMapping(value={"/","/index"},method=RequestMethod.GET)
    public String index(){
       return "index";
    }
   
    @RequestMapping(value="/login",method=RequestMethod.GET)
    public String login(){
       return"login";
    }
	
    /**
     * 用户添加;
     * @return
     */
    
    @RequestMapping(value="/403",method=RequestMethod.GET)
    public String noPersmission(){
       return "403";
    }
    
   
	@RequestMapping(value="/shiro/login",method=RequestMethod.POST)
    public String login(HttpServletRequest request, Map<String, Object> map) throws Exception {
       System.out.println("HomeController.login()");
       // 登录失败从request中获取shiro处理的异常信息。
       // shiroLoginFailure:就是shiro异常类的全类名.
       String exception = (String) request.getAttribute("shiroLoginFailure");
 
       System.out.println("exception=" + exception);
       String msg = "";
       if (exception != null) {
           if (UnknownAccountException.class.getName().equals(exception)) {
              System.out.println("UnknownAccountException -- > 账号不存在：");
              msg = "UnknownAccountException -- > 账号不存在：";
           } else if (IncorrectCredentialsException.class.getName().equals(exception)) {
              System.out.println("IncorrectCredentialsException -- > 密码不正确：");
              msg = "IncorrectCredentialsException -- > 密码不正确：";
           } else if ("kaptchaValidateFailed".equals(exception)) {
              System.out.println("kaptchaValidateFailed -- > 验证码错误");
              msg = "kaptchaValidateFailed -- > 验证码错误";
           } else {
              msg = "else >> "+exception;
              System.out.println("else -- >" + exception);
           }
       }
       map.put("msg", msg);
       // 此方法不处理登录成功,由shiro进行处理.
       return "login";
       
    }
}
