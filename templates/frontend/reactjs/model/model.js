var model = require('./modelBase');


var serverPath = '<%=data.apiServer%>';
var query = function (cb) {
    model.get(serverPath + "/<%=data.moduleName%>/queryAll", {}, cb);
};
var queryReferListByName = function (refer, cb) {
    model.get(serverPath + "/" + refer + "/queryAll", {}, cb);
};

var queryByNameLike = function (params, cb) {
    model.get(serverPath + "/<%=data.moduleName%>/queryByNameLike/", params, cb);
};

var queryDictionaryListByParams = function (refer, params, cb) {
    model.get(serverPath + "/dictionary/queryByCategory/", params, cb);
};
var queryByParams = function (params, cb) {
    model.get(serverPath + "<%=data.moduleName%>s/query", params, cb);
};
var queryById = function (params, cb) {
    model.get(serverPath + "/<%=data.moduleName%>/query/" + params.id, params, cb);
};
var update = function (params, cb) {
    model.post(serverPath + "/<%=data.moduleName%>/update/" + params.id, params, cb);
};
var remove = function (params, cb) {
    model.post(serverPath + "/<%=data.moduleName%>/remove/" + params.id, params, cb);
};
var add = function (params, cb) {
    model.post(serverPath + "/<%=data.moduleName%>/save", params, cb);
};
module.exports = {
    add: add,
    remove: remove,
    update: update,
    query: query,
    queryById: queryById,
    queryByParams: queryByParams,
    queryByNameLike: queryByNameLike,
    queryReferListByName: queryReferListByName,
    queryReferListByParams: queryDictionaryListByParams,
    queryDictionaryByCategory: queryDictionaryListByParams
}

