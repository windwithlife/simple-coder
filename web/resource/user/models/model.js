/**
 * Created by zhangyq on 2016/4/12.
 */
define(['model'],function(model){
    var myModel =  model.extend(model, {
        url: "/api/v1/pages/getPageHomeInfo"
    });
    var query = function(cb){
        model.get("/api/v1/user/query",{},cb);
    };
    var queryByParams = function(params, cb){
        model.get("/api/v1/user/query",params,cb);
    };
    var queryById  = function(params,cb){
        model.get("/api/v1/user/queryById",params, cb);
    };
    var update = function(params,cb){
        model.post("/api/v1/user/update",params,cb);
    };
    var remove = function(params,cb){
        model.post("/api/v1/user/remove",params,cb);
    };
    var add = function(params,cb){
        model.post("/api/v1/user/createNew",params,cb);
    };
    return{
        query:query,
        queryById:queryById,
        queryByParams:queryByParams,
        update:update,
        remove:remove,
        add:add,
         };
});