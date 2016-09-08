/**
 * Created by zhangyq on 2016/4/12.
 */
define(['model'],function(model){
    var rootPath = '/autoapi/';

    var query = function(cb){
        model.get(rootPath + "<%=data.moduleName%>s/",{},function(){
            cb(data._embedded.<%=data.moduleName%>s);
        });
    };
    var queryByParams = function(params, cb){
        model.get(rootPath + "<%=data.moduleName%>s/query",params,cb);
    };
    var queryById  = function(params,cb){
        model.get(rootPath +  "<%=data.moduleName%>s/query/"+params.id,params, cb);
    };
    var update = function(params,cb){
        model.post(rootPath + "<%=data.moduleName%>/save/"+params.id,params,cb);
    };
    var remove = function(params,cb){
        model.post( rootPath +  "<%=data.moduleName%>/remove/"+params.id,params,cb);
    };
    var add = function(params,cb){
        model.post(rootPath + "<%=data.moduleName%>s/",params,cb);
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