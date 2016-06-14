Ext.define('<%=data.appName%>.store.<%=data.storeName%>', {
    extend: 'Ext.data.Store',
    requires: '<%=data.appName%>.model.<%=data.modelName%>',
    model: '<%=data.appName%>.model.<%=data.modelName%>',
	pageSize: 15,

	proxy: {
		type: 'ajax',
		url: '/api/v1/<%=data.moduleName%>/query',
		reader: {
			type: 'json',
			totalProperty: 'totalCount',
			root: 'data',
			idProperty: '_id'
		}
	},
	autoLoad : true,
	remoteSort: true
});