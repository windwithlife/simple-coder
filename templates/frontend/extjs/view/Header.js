Ext.define('<%=data.appName%>.view.Header', {
    extend: 'Ext.panel.Panel' ,
    border: false,
    layout:'anchor',
    region:'north',
    cls: 'docs-header',
    height:80,
    items: [{
		id:'header-top',
		xtype:'box',
		cls:'header',
		border:false,
		anchor: 'none -25',
		html:'<h1>ExtTest</h1>'
		//html:'<h1>实训管理系统</h1>'
	},new Ext.Toolbar({
		items:[
			
			{
			 //此处加载登录用户信息
			 xtype:'label',
			 iconCls: 'grid-add',
			 id:'head-lb-1',
			 cls:'welcome',
			 text:'欢迎登陆,XXX',
			 margin:'0 20 0 20'
			 },
			 {
			 xtype:'label',
			 id:'head-lb-3',
			 margin:'0 20 0 50',
			 cls:'welcome',
			 text:'当前日期：2016-04-30'
			 }, '->', {
			 	xtype:'button',
			 	text:'打开首页',
				iconCls: 'grid-add',
				//tooltip: '全屏显示主操作窗口',
				handler: function(){

				}
			 },'-', {
				xtype:'button',
			 	text:'注销',
				iconCls: 'grid-add',
				 handler: function(){
				 	
				 }
			 },'-'
		]}
	)]
}); 
