var settings = require("../../config/settings");

var product = require('../../models/product');

var query = function (req, res, next) {
    req.session._loginReferer = req.headers.referer;
    var params = req.query;
    console.log("-------------get url params:" + JSON.stringify(params));
    product.find(params, function(error, records){
        console.log(JSON.stringify(records));
        var result = {
            totalCount:100,
            data:records,
        }
        res.json(result);
    });
};

var queryOne = function (req, res, next) {
    req.session._loginReferer = req.headers.referer;
    var params = req.query;
    console.log("-------------get url params:" + JSON.stringify(params));
    product.findOne(params, function(error, record){
        console.log(JSON.stringify(record));
        var result = {
            totalCount:100,
            data:record,
        }
        res.json(result);
    });
};


var update = function (req, res, next) {
    req.session._loginReferer = req.headers.referer;
    var params = req.body;
    console.log("------------update params:" + JSON.stringify(params));
    product.update({_id:req.body._id},params, function(error, records){
        console.log(JSON.stringify(records));
        var result = {
            msg:"success",
            success:true,

            data : records,
        };
        res.json(result);
    });
};

var remove = function (req, res, next) {
    req.session._loginReferer = req.headers.referer;
    var params = req.body;
    console.log(params);
    console.log(req.body._id);
    product.remove({_id:req.body._id}, function(error, records){
        console.log(JSON.stringify(records));
        var msg = 'success';
        var success = true;
        if(error) {
            msg = "failed";
            success = false;
        }
        var result = {
            msg:msg,
            success:success,
            data : records,
        };
        res.json(result);
    });
};

var createNew = function (req, res, next) {
    req.session._loginReferer = req.headers.referer;
    var params = req.body;
    console.log(params);
    console.log("-----create New params:" +JSON.stringify(params));
    product.create(params, function(error, record){
        console.log(JSON.stringify(record));
        var result = {
            msg:"success",
            success:true,
            data : record,
        };
        res.json(result);
    });
};

exports.query = query;
exports.createNew = createNew;
exports.update = update;
exports.remove = remove;
exports.queryOne = queryOne;


//exports.showPages = showPageIndex;
//exports.showPage = showPage;

