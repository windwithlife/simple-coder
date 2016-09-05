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

import com.simple.base.bz.iot.dao.TestDao;
import com.simple.base.bz.iot.entity.DeviceItem;
import com.simple.base.bz.iot.entity.DeviceStatus;
import com.simple.base.bz.iot.entity.DeviceType;
import com.simple.base.bz.iot.entity.IOTResponse;
import com.simple.base.bz.iot.service.DeviceItemService;
import com.simple.base.bz.iot.service.DeviceStatusService;
import com.simple.base.bz.iot.service.DeviceTypeService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/iot")
public class IOTController {
	@Autowired
	DeviceTypeService deviceTypeService;
	@Autowired
	DeviceItemService deviceItemService;
	
	@Autowired
	DeviceStatusService statusService;
	@Autowired
	TestDao testDao;
	

	@ApiOperation(value = "设备列表", notes = "获取所有设备类型列表")

	@RequestMapping(value = "/deviceTypes/", method = RequestMethod.GET)
	@ResponseBody
	public List<DeviceType> deviceTypes() {
		return deviceTypeService.getDevices();
	}

	@RequestMapping(value = "/deviceItems/", method = RequestMethod.GET)
	@ResponseBody
	public List<DeviceItem> deviceItems() {
		return deviceItemService.getItems();
	}

	@ResponseBody
	@RequestMapping(value = "/deviceItems/save", method = RequestMethod.POST)
	public DeviceItem saveItem(@RequestParam("typeId")Long tid, @RequestBody DeviceItem dItem) {
		System.out.println("input device params: TypeID:" + tid +" DeviceItem:"+ dItem.toString());
		DeviceType type = deviceTypeService.getDeviceTypeById(tid);
		dItem.setType(type);
		DeviceStatus s = new DeviceStatus();
		DeviceStatus rs = statusService.save(s);
		dItem.setStatus(rs);
		DeviceItem result = deviceItemService.save(dItem);
         
		return result;

	}
	@ResponseBody
	@RequestMapping(value = "/deviceItems/saveStatus", method = RequestMethod.POST)
	public DeviceStatus saveItemStatus(@RequestParam("itemId")Long itemId, @RequestBody DeviceStatus itemStatus) {
		System.out.println("input device params: ID:" + itemId +" DeviceStatus:"+ itemStatus.toString());
		DeviceItem item= deviceItemService.getItemById(itemId);
		DeviceStatus s = item.getStatus();
		if (null == s){
			s = new DeviceStatus();
		}
		s.setStatus(itemStatus.getStatus());
		s.setTemperature(itemStatus.getTemperature());
		item.setStatus(s);
		DeviceItem result = deviceItemService.save(item);
		System.out.println("input item.Temperature:" + item.getStatus().getTemperature() + "output Item.Temperature:" + result.getStatus().getTemperature());
		if (null != result.getStatus()){
			return result.getStatus();
		}else{
			return s;
		}
		

	}
	@ResponseBody
	@RequestMapping(value = "/deviceItems/getStatus", method = RequestMethod.GET)
	public DeviceStatus getItemStatus(@RequestParam("itemId")Long itemId) {
		System.out.println("input device params: ID:" + itemId);
		DeviceItem item= deviceItemService.getItemById(itemId);
		if (null == item){
			return new DeviceStatus();
		}
		DeviceStatus s = item.getStatus();
		if (null == s){
			s = new DeviceStatus();
		}
		return s;

	}

	@ResponseBody
	@RequestMapping(value = "/deviceItems/remove/{id}", method = RequestMethod.POST)
	public IOTResponse removeItem(@PathVariable Long id) {
		System.out.println("input device params ID:" + id);
		deviceItemService.remove(id);
		// System.out.println("output device result data:" + result.toString());
		return new IOTResponse(0, "ok");
		// return "index";
	}

	
	@ApiOperation(value = "设备类型", notes = "根据ID取得设备类型")
	@ApiImplicitParam(name = "id", value = "设备类型ID", required = true, dataType = "Integer")
	@RequestMapping(value = "/deviceTypes/{id}", method = RequestMethod.GET)
	@ResponseBody
	public DeviceType channelpage(@PathVariable Long id) {
		return deviceTypeService.getDeviceTypeById(id);
		// return "index";
	}

	@ResponseBody
	@RequestMapping(value = "/deviceTypes/remove/{id}", method = RequestMethod.POST)
	public IOTResponse remove(@PathVariable Long id) {
		System.out.println("input device params ID:" + id);
		deviceTypeService.remove(id);
		// System.out.println("output device result data:" + result.toString());
		return new IOTResponse(0, "ok");
		// return "index";
	}

	@ResponseBody
	@RequestMapping(value = "/deviceTypes/save", method = RequestMethod.POST)
	public DeviceType save(@RequestBody DeviceType dt) {
		System.out.println("input device params:" + dt.toString());
		DeviceType result = deviceTypeService.save(dt);
		System.out.println("output device result data:" + result.toString());
		return result;
		// return "index";
	}

	public ModelAndView handleAuthorizationException(Exception e) {
		System.out.println("A Authorization Failure, MSG: " + e.getMessage());

		ModelAndView model = new ModelAndView("403");
		model.addObject("Msg", e.getMessage());
		return model;
	}
	@ResponseBody
	@RequestMapping(value = "/test/{name}", method = RequestMethod.GET)
	public List<DeviceType> findTypes(@PathVariable String name) {
		System.out.println("input device params ID:" + name);
		return testDao.findByName(name);
		// System.out.println("output device result data:" + result.toString());
	
	}
}