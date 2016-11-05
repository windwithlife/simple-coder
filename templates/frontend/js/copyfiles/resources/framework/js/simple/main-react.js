
function __entry_point() {

   require(['urlparser','vendors'], function (urlparser,common) {
	   resFullPath =  urlparser.getPath();
       console.log("resource path is" + resFullPath);
	   var local_config = resFullPath + 'app.js';
       require([local_config],function(config){
		   console.log("finished loader channel entry point file:[" + local_config +"]");
	   });
   });

};


(function ready(fn){
	if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			//注销事件, 避免反复触发
			document.removeEventListener('DOMContentLoaded',arguments.callee, false);
			fn();            //执行函数
		}, false);
	}else if(document.attachEvent) {        //IE
		document.attachEvent('onreadystatechange', function() {
			if(document.readyState == 'complete') {
				document.detachEvent('onreadystatechange', arguments.callee);
				fn();        //函数执行
			}
		});
	}
})(__entry_point);
