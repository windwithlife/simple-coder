/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
/*

 */
// just for  code generation

var express = require('express');
var router = express.Router();
var themeHelper = require('../helper/theme_helper');

//页面管理
<% data.modules.forEach(function (module) {%>

 //-----------------------Section---------------------------//
 router.get('/<%=module%>/', function(req, res, next) {
  res.render('index',themeHelper.build(req));
 });
 <%});%>


module.exports = router;
