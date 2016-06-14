var express           = require('express');
var router            = express.Router();

<% modules=data.modules %>
<% modules.forEach(function (module) {%>
  var <%=module%>  = require('./<%=module%>');
 <%});%>

//页面管理

<%module=data.moduleName%>
 //-----------------------Section---------------------------//
 router.post('/<%=module%>/createNew',<%=module%>.createNew);
 router.post('/<%=module%>/update', <%=module%>.update);
 router.get('/<%=module%>/query',<%=module%>.query);
 router.get('/<%=module%>/queryById',<%=module%>.queryOne);
 router.post('/<%=module%>/remove',<%=module%>.remove);

 <%=data.oldModules%>





module.exports = router;
