var express           = require('express');
var router            = express.Router();



  var product  = require('./product');
 
  var user  = require('./user');
 

//页面管理


 //-----------------------Section---------------------------//
 router.post('/user/createNew',user.createNew);
 router.post('/user/update', user.update);
 router.get('/user/query',user.query);
 router.get('/user/queryById',user.queryOne);
 router.post('/user/remove',user.remove);

 
 
  router.post('/product/createNew',product.createNew);

 
  router.post('/product/update', product.update);

 
  router.get('/product/query',product.query);

 
  router.get('/product/queryById',product.queryOne);

 
  router.post('/product/remove',product.remove);

 





module.exports = router;
