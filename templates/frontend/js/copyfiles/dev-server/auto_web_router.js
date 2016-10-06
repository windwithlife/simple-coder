
// just for  code generation

var express = require('express');
var router = express.Router();
var envHelper = require('./env_helper');
var path = require('path');


 //-----------------------Section---------------------------//
 router.get('/*', function(req, res, next) {
     var env = envHelper.build(req);
     var page =env.commonResourcePath +　"index";
     console.log(page);
     res.render(page,env);
 });

module.exports = router;
