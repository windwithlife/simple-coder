define(['simple', 'jquery'], function (Simple, $) {
     var Model = {
         "url"    : '',
         "params" : {},
         "extend" : Simple.extend,
         "setParams": function(params){
             this.params = params;
         },
         "setUrl": function(url){
             this.url = url;
         },
         "update" : function(callback){
             this.onResult = callback;
             $.post(this.url,this.params, _.bind(this.__onResult,this),"json");
         },
         "post" : function(url,params,callback){
        	 $.ajaxSetup({  
        		 contentType: "application/json; charset=utf-8",
        	    });  
             $.post(url,JSON.stringify(params),function (data, textStatus){
                     if (textStatus == "success"){
                         callback(data);
                     }else{
                    	 console.log("POST FAILED");
                         callback();
                     }
             }, "json");
         },
         "get": function(url,params,callback){
        	 $.ajaxSetup({  
        		 contentType: "application/json; charset=utf-8",
        	    });
             $.get(url,params,function (data, textStatus){
                 if (textStatus == "success"){
                     callback(data);
                 }else{
                     callback();
                 }
             }, "json");
         }

     };
     return Model;
});
