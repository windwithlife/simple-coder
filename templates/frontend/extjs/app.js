Ext.Loader.setConfig({enabled: true});		//开启动态加载
Ext.application({
	name:'<%=data.appName%>',			//呵呵，就是ExtTest
	autoCreateViewport: true,
	appFolder:'./',	//指定根目录

	controllers:  ['AccordionMainMenu',<% data.controllers.forEach(function(controller){ %>
		"<%=controller%>",
		<% }) %>]
});
