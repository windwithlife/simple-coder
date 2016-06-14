var express           = require('express');
var router            = express.Router();

<% data.modules.forEach(function (module) {%>
  var <%=module%>  = require('./<%=module%>');
 <%});%>

//页面管理
<% data.modules.forEach(function (module) {%>

 //-----------------------Section---------------------------//
 router.post('/<%=module%>/createNew',<%=module%>.createNew);
 router.post('/<%=module%>/update', <%=module%>.update);
 router.get('/<%=module%>/query',<%=module%>.query);
 router.get('/<%=module%>/queryById',<%=module%>.queryOne);
 router.post('/<%=module%>/remove',<%=module%>.remove);
 <%});%>




module.exports = router;
