package com.simple.base.bz.admin.controller;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/admin")
public class AdminController  implements EnvironmentAware {
	
	 private String port ;
	 
	@Override
    public void setEnvironment(Environment environment) {
        String s = environment.getProperty("server.port");
        System.out.println(s);
        this.port = s;
    }
	 
	   @RequestMapping(value= "/iot/deviceType", method=RequestMethod.GET)
	    //@RequiresPermissions("userInfo:del")//权限管理;
	    public String channelpage(){
	       return "index";
	    }
	   @RequestMapping(value= "/iot", method=RequestMethod.GET)
	    public String rootpage(){
	       return "index";
	   }
	 
	   @RequestMapping(value= "/user/user", method=RequestMethod.GET)
	    public String userHome(){
	       return "index";
	    }
	   @RequestMapping(value= "/user/role", method=RequestMethod.GET)
	    public String userRoleHome(){
	       return "index";
	    }
	   @RequestMapping(value= "/cms/channel", method=RequestMethod.GET)
	    public String cmsChannelHome(){
	       return "index";
	    }
	   @RequestMapping(value= "/cms/content", method=RequestMethod.GET)
	    public String cmsContentHome(){
	       return "index";
	    }
	  
	   @RequestMapping(value= "/analyse/{side}", method=RequestMethod.GET)
	    //@RequiresPermissions("userInfo:del")//权限管理;
	    public ModelAndView manageAndAnalysis(@PathVariable String side){
		     String url = "http://localhost:" + this.port + "/manage/" + side;
             System.out.println(url);
             ModelAndView model = new ModelAndView("analyse");
             RestTemplate restTemplate = new RestTemplate();
        
             try{
            	 String result = restTemplate.getForObject(url, String.class);
            	 System.out.println("analyse" + result);
            	
            	 model.addObject("item",result);
             }catch(Exception e){
            	 System.out.println("Can't get analyse result");
            	 model.addObject("item","Can't get analyse result");
             }
			 return model;
	       //return "analyse";
	    }
	   
	  public ModelAndView handleAuthorizationException(Exception e){
			 System.out.println("A Authorization Failure, MSG: " + e.getMessage());
			 
			 ModelAndView model = new ModelAndView("403");
			 model.addObject("Msg",e.getMessage());
			 return model;
		 }
}


