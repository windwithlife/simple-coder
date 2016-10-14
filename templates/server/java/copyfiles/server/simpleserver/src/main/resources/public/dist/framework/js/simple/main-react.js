
// 取得当前require_config.js的路径。
function addScript(url){
	var doc=document;
	var script=document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", url);
	var heads = document.getElementsByTagName("head");
	doc.documentElement.appendChild(script);
	
}


require(['global_require_config'], function (g) {

   require(['urlparser','params'], function (urlparser,params) {
      
	   var resPath = $("#entryport-js").data("res-path");
	   if (resPath[resPath.length-1] == '/'){
		   resPath = resPath.substr(0,resPath.length-1);
	   }
       resFullPath = resPath + urlparser.getPath();
             
       var local_router = resFullPath + 'app.js';
       console.log("local router path main.js :" + local_router);
       
       require([local_router],function(router){
      
    	 console.log("end to router-main" + JSON.stringify(router));
       }); 
    	
   });

});