Ext.define('<%=data.appName%>.model.<%=data.modelName%>', {
    extend: 'Ext.data.Model',
    fields: [
	<% data.fields.forEach(function (field) {%>
		<%var strCol = JSON.stringify(field) %><%-strCol %>, <%})%>
	]
});
