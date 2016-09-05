/**
 * Created by zhangyq on 2016/4/12.
 */
define(['model'],function(model){
    var query = function(cb){
        model.get("/user/adminUsers/",{},cb);
    };
    var queryById  = function(params,cb){
        model.get("/user/adminUsers/query/"+ params.id,params, cb);
    };
    var update = function(params,cb){
        model.post("/user/adminUsers/save",params,cb);
    };
    var remove = function(params,cb){
        model.post("/iot/deviceTypes/remove/" + params.id, params,cb);
    };
    var add = function(params,cb){
        model.post("/user/adminUsers/save",params,cb);
    };
    return{
        query:query,
        queryById:queryById,
        update:update,
        remove:remove,
        add:add,
         };
});