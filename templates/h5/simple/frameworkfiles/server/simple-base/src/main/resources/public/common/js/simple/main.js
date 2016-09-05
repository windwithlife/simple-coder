/**
 * Created by zhangyq on 2015/7/21.
 */
// 取得当前require_config.js的路径。


require(['global_require_config'], function (g) {

   require(['urlparser','params','simple'], function (urlparser,params,simple) {
       var local_config = urlparser.getPath() + '/require_config.js';
       var local_router = urlparser.getPath() + '/router.js';
       Simple.P = params;
       require([local_config,local_router],function(config,router){
           //router.main();
           router.startup();
       });

   });

});