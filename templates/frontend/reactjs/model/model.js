
var model = require('./modelBase');

    //var serverPath = 'http://121.196.221.190:8080/';
    var serverPath = 'http://121.196.221.190:8080/';
    var query = function(cb){
        model.get(serverPath + "/product/queryAll",{},cb);
    };
    var queryReferListByName= function(refer,cb){
        model.get(serverPath + "/" + refer + "/queryAll",{},cb);
    };

    var queryByNameLike = function(params, cb){
        model.get(serverPath +　"/product/queryByNameLike/",params,cb);
    };

    var queryDictionaryListByParams= function(refer, params, cb){
        model.get(serverPath + "/dictionary/queryByCategory/",params,cb);
    };
    var queryByParams = function(params, cb){
        model.get(rootPath + "products/query",params,cb);
    };
    var queryById  = function(params,cb){
        model.get(serverPath + "/product/query/"+params.id, params, cb);
    };
    var update = function(params,cb){
        model.post(serverPath + "/product/update/"+params.id,params,cb);
    };
    var remove = function(params,cb){
        model.post(serverPath +　"/product/remove/"+params.id,params,cb);
    };
    var add = function(params,cb){
        model.post(serverPath　+"/product/save",params,cb);
    };
    module.exports ={
        add:add,
        remove:remove,
        update:update,
        query:query,
        queryById:queryById,
        queryByParams:queryByParams,
        queryByNameLike:queryByNameLike,
        queryReferListByName:queryReferListByName,
        queryReferListByParams:queryDictionaryListByParams,
        queryDictionaryByCategory:queryDictionaryListByParams
    }
