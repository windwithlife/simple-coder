/**
 * Created by zhangyq on 2016/4/12.
 */
define(['model'],function(model){
    var myModel =  model.extend(model, {
        url: "/api/v1/pages/getPageHomeInfo"
    });
    var query = function(cb){
        model.get("/api/v1/faq/query",{},cb);
    };
    var queryByParams = function(params, cb){
        model.get("/api/v1/faq/query",params,cb);
    };
    var queryById  = function(params,cb){
        model.get("/api/v1/faq/queryById",params, cb);
    };
    var update = function(params,cb){
        model.post("/api/v1/faq/update",params,cb);
    };
    var remove = function(params,cb){
        model.post("/api/v1/faq/remove",params,cb);
    };
    var add = function(params,cb){
        model.post("/api/v1/faq/createNew",params,cb);
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