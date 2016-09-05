/**
 * Created by zhangyq on 2016/4/12.
 */
define(['model'],function(model){
    var rootPath = '/autoapi/';

    var query = function(cb){
        model.get(rootPath + "<%=data.moduleName%>s/",{},cb);
    };
    var queryByParams = function(params, cb){
        model.get(rootPath + "<%=data.moduleName%>/query",params,cb);
    };
    var queryById  = function(params,cb){
        model.get(rootPath +  "<%=data.moduleName%>/queryById",params, cb);
    };
    var update = function(params,cb){
        model.post(rootPath + "<%=data.moduleName%>/update",params,cb);
    };
    var remove = function(params,cb){
        model.post( rootPath +  "<%=data.moduleName%>/remove",params,cb);
    };
    var add = function(params,cb){
        model.post(rootPath + "<%=data.moduleName%>/createNew",params,cb);
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