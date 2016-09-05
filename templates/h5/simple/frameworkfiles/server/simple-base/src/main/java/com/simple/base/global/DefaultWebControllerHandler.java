package com.simple.base.global;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.access.AccessDeniedException;

@ControllerAdvice
public class DefaultWebControllerHandler {
   
    public static final String DEFAULT_ERROR_VIEW = "error";

    @ExceptionHandler(value = Exception.class)
    public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
    	ModelAndView mav = new ModelAndView();
        mav.addObject("exception", e.getMessage());
        
        mav.addObject("url", req.getRequestURL());
    	if (e instanceof AccessDeniedException){
    		 mav.setViewName("403");
    		 System.out.println("No Permission!");
    	     return mav;	 
        }
    	
        mav.setViewName(DEFAULT_ERROR_VIEW);
        e.printStackTrace();
        System.out.println("**********************************************/n/r\n\r"
        		+ "Error happened !!!, Be handled in Global-DefaultException-Handler!\r\n"
        		+ "###############################################");
        return mav;
    }
   
  @ModelAttribute
  public void addAttribute(Model model){
	  model.addAttribute("msg", "test global message");
  }
   
}