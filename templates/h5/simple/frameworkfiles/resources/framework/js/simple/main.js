/**
 * Created by zhangyq on 2015/7/21.
 */
// 取得当前require_config.js的路径。


require(['global_require_config'], function (g) {

   require(['urlparser','params','simple','jquery'], function (urlparser,params,simple,$) {
      
	   var resPath = $("#entryport-js").data("res-path");
	   if (resPath[resPath.length-1] == '/'){
		   resPath = resPath.substr(0,resPath.length-1);
	   }
       resFullPath = resPath + urlparser.getPath();
       
       console.log("resource path is" + resFullPath);
	   var local_config = resFullPath + 'require_config.js';
       var local_router = resFullPath + 'router.js';
       console.log("local config path" + local_config);
       Simple.P = params;
       Simple.resourceRootPath = resPath;
       require([local_config,local_router],function(config,router){
           //router.main();
    	   console.log("begin to config" + JSON.stringify(config));
    	   for (var item in config){
    		   path = config[item];
    		   if (path[0] == '.'){
    			   path = path.substr(1,path.length-1);
    		   }
    		   path = resFullPath + config[item];
    		   config[item] = path;
    	   }
    	   console.log("begin to config");
    	   console.log("begin to config" + JSON.stringify(config));
    	   require.config({paths:config});
           router.startup();
       });

   });

});