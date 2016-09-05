define(['backbone', 'jquery','pagenavigator'], function (Backbone, $,navigator) {

    var AppRouter = Backbone.Router.extend({

        startup:function(){
            Backbone.history.start();
        },
        addRouter: function (path, pageController) {
            console.log("---------register path----[" + path + "] Controller:[" + pageController +"]");
            navigator.registerRouter(path,pageController);
            this.route(path,"page",function(hashKeys){
                console.log("---------haskKeys----" + hashKeys);
                console.log("---------jump to Path----" + path);
                navigator.jump(path);
            });
        },
        back: function(){
                  navigator.back();
        },
        goto:function(path, params){
            var fullPath = "";
            var queryString = "";
            for(var field in params){
               var str = field + "=" +  params[field] + "&";
                queryString = queryString + str;
            }
            if (queryString.length > 0){
                fullPath = path + "?" + queryString.substring(0,queryString.length-1);
            }else{
                fullPath = path;
            }
            console.log("navigate path :" + fullPath);
            this.navigate(fullPath,{trigger:true});
        }
    });

    var appRouter = new AppRouter();
    //appRouter.addRouter("","main");

    return appRouter;

});
