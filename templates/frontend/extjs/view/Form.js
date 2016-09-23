/**
 * Created by zhangyq on 2016/4/28.
 */

Ext.define('<%=data.appName%>.view.<%=data.formName%>',{
    extend: 'Ext.form.FormPanel',
    title: '编辑学生信息',
        alias: 'widget.<%=data.xFormName%>',
    region: 'east',
    frame: true,
    width: 260,
    autoHeight: true,
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'right',
        labelWidth: 60
    },
    items:<%-data.columns%>,
    buttons: [{
        id: 'buttonSave',
        text: '添加',

    },{
        text: '取消',
        id: 'buttonCancel',

    }]
});

/*

items: [{
    xtype: 'hidden',
    name: '_id'
},{
    fieldLabel: '百川编号',
    name: 'open_id'
},{
    fieldLabel: '商品名称',
    name: 'name'
},{
    fieldLabel: '商品淘宝ID',
    name: 't_id',
    xtype: 'numberfield',
    allowNegative: false
},{
    fieldLabel: '图',
    name: 'pic'
},{
    fieldLabel: '头图列表',
    name: 'head_pic'
},{
    fieldLabel: '价格',
    name: 'price',
    xtype: 'numberfield',
    allowNegative: false
},{
    fieldLabel: '折扣价',
    name: 'dis_price',
    xtype: 'numberfield',
    allowNegative: false
},{
    fieldLabel: '性别',
    name: 'sex',
    xtype: 'combo',
    store: new Ext.data.SimpleStore({
        fields: [{name:'value',type:'int'},'text'],
        data: [['1','男'],['2','女']]
    }),
    emptyText: '请选择',
    mode: 'local',
    triggerAction: 'all',
    valueField: 'value',
    displayField: 'text',
    editable: false
}],*/
