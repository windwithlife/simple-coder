function getPath (url) {
	var reURL = /^([^:\s]+):\/{2,3}([^\/\s:]+)(?::(\d{1,5}))?(\/[^\?\s#]+)?(\?[^#\s]+)?(#[^\s]+)?/;
	var URLLi = "protocol host port path search hash";
	if (!url) {
		url = location.href;
	}

	var arr = url.match(reURL),
		temp = {};

	URLLi.split(" ").map(function (item, i) {
		temp[item] = arr[i+1];
	});

	//console.log(JSON.stringify(temp));
	var path;

	if (temp.path[temp.path.length-1] != '/'){
		path = temp.path + '/';
	}else{
		path = temp.path;
	}
	console.log('current path is：' + path);
	return path;
};

//
function addScript(url,callback){
	var doc=document;
	var script=document.createElement("script");
	script.async = true;
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", url);
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
			callback();
			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
		}
	};
	var heads = document.getElementsByTagName("head");
	doc.body.appendChild(script);
	//doc.documentElement.appendChild(script);

}
function __entry_point() {

   require(['common'], function (common) {
	   var resRootPath="/";
	   var elementSelf = document.getElementById("entryport-js");
	   if (elementSelf){
		   var pathValue = elementSelf.getAttribute('data-res-path');
		   if (pathValue){resRootPath = pathValue};
	   };
	   var resFullPath =  resRootPath +　getPath();
	   if (resFullPath.substr(0,2)=="//") {
		   resFullPath = resFullPath.substr(1,resFullPath.length-1);
	   }
	   console.log("the resources file directory is set to:["+ resFullPath +"]");
	   var channel_entrypoint_file = resFullPath + 'app.js';
	   addScript(channel_entrypoint_file,function(){
		   require(['approuter'],function(router){
			   if (router.startup){router.startup();}
		   });
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
