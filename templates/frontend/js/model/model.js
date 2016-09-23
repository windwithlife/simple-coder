/**
 * Created by zhangyq on 2016/4/12.
 */
define(['model'],function(model){
    var rootPath = '/autoapi/';

    var query = function(cb){
        model.get("/<%=data.moduleName%>/queryAll",{},cb);
    };
    var queryReferListByName= function(refer,cb){
        model.get( "/" + refer + "/queryAll",{},cb);
    };

    var queryByNameLike = function(params, cb){
        model.get("/<%=data.moduleName%>/queryByNameLike/",params,cb);
    };

    var queryDictionaryListByParams= function(refer, params, cb){
        model.get( "/dictionary/queryByCategory/",params,cb);
    };
    var queryByParams = function(params, cb){
        model.get(rootPath + "<%=data.moduleName%>s/query",params,cb);
    };
    var queryById  = function(params,cb){
        model.get("/<%=data.moduleName%>/query/"+params.id, params, cb);
    };
    var update = function(params,cb){
        model.post("/<%=data.moduleName%>/update/"+params.id,params,cb);
    };
    var remove = function(params,cb){
        model.post("/<%=data.moduleName%>/remove/"+params.id,params,cb);
    };
    var add = function(params,cb){
        model.post("/<%=data.moduleName%>/save",params,cb);
    };
    return{
        query:query,
        queryById:queryById,
        queryByParams:queryByParams,
        queryByNameLike:queryByNameLike,
        queryReferListByName:queryReferListByName,
        queryReferListByParams:queryDictionaryListByParams,
        queryDictionaryByCategory:queryDictionaryListByParams,
        update:update,
        remove:remove,
        add:add,
         };
});