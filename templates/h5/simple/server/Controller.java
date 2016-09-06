package com.simple.base.bz.iot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.simple.base.bz.entity.*;
import com.simple.base.bz.service.*;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/<%=data.moduleName%>s")
public class <%=data.moduleName%>Controller {
	@Autowired
	<%=data.moduleName%>Service service;

	@ApiOperation(value = "设备列表", notes = "获取所有设备类型列表")

	@RequestMapping(value = "/", method = RequestMethod.GET)
	@ResponseBody
	public List<<%=data.moduleName%>> <%=data.moduleName%>s() {
		return service.findAll();
	}

    @ResponseBody
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public <%=data.moduleName%> save(@RequestBody <%=data.moduleName%> item) {
		System.out.println("input device params:" + item.toString());
		<%=data.moduleName%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}
    @ResponseBody
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public <%=data.moduleName%> save(@RequestBody <%=data.moduleName%> item) {
		System.out.println("input device params:" + item.toString());
		<%=data.moduleName%> result = service.save(item);
		System.out.println("output device result data:" + result.toString());
		return result;
	}


    @ResponseBody
 	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
 	public <%=data.moduleName%> save(@PathVariable Long id, @RequestBody <%=data.moduleName%> item) {
 		System.out.println("input device params:" + item.toString());
 		<%=data.moduleName%> result = service.save(item);
 		System.out.println("output device result data:" + result.toString());
 		return result;
 	}
 	@ResponseBody
   	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
     	public <%=data.moduleName%> save(@PathVariable Long id) {
     		System.out.println("input device params:" + item.toString());
     		<%=data.moduleName%> result = service.findById(id);

     		return result;
     	}

    @ResponseBody
   	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
     	public <%=data.moduleName%> save(@PathVariable Long id) {
			service.remove(id);

     }
     @ResponseBody
        	@RequestMapping(value = "/remove/{id}", method = RequestMethod.POST)
          	public <%=data.moduleName%> save(@PathVariable Long id) {
     			service.remove(id);

          }




}