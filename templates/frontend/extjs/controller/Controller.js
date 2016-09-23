Ext.define('<%=data.appName%>.controller.<%=data.controllerName%>', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'mainView',
        selector: '<%=data.xViewName%>'
    },{
        ref: 'mainViewForm',
        selector: '<%=data.xFormName%>'
    }],
    stores: ['<%=data.storeName%>'],
    //models: ['Menu'],
    views: ['<%=data.viewName%>','<%=data.formName%>'],
    init: function () {
        //初始化部分，下面是部分是给菜单绑定单击事件，接下来会用，这里先注释
        this.control({
            '<%=data.xViewName%> button[action=add]': {
                click: this.onUserAdd.bind(this),
            },
            '<%=data.xViewName%> button[action=edit]': {
                click: this.onUserEdit.bind(this)
            },
            '<%=data.xViewName%> button[action=delete]': {
                click: this.onUserDelete.bind(this)
            },
            '<%=data.xFormName%> button[id=buttonSave]': {
                click: this.onFormSave.bind(this)
            },
            '<%=data.xFormName%> button[id=buttonCancel]': {
                click: this.onFormCancel.bind(this)
            }

        });
    },
    onUserAdd: function () {

        var form = Ext.create("<%=data.appName%>.view.<%=data.formName%>", {
            //moduleMainView:this,
        });
        Ext.getCmp('buttonSave').setText('添加');
        var win = Ext.create("Ext.window.Window", {
            xtype: 'PopWindow',
            title: "编辑",	   //标题
            height: 600,						//高度
            width: 800,						    //宽度
            layout: "fit",						//窗口布局类型
            modal: true,                      //是否模态窗口，默认为false
            items: [form]
        });
        win.show();
    },
    onUserEdit: function () {
        //var grid = this.getUser();
        //var store = this.getProductsStore();
        var view = this.getMainView();

        var sm = view.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert('请选择一条记录');
            return;
        }
        var record = sm.getSelection()[0];

        var form = Ext.create("<%=data.appName%>.view.<%=data.formName%>", {
            //moduleMainView:this,
        });
        form.loadRecord(record);
        Ext.getCmp('buttonSave').setText('保存');
        var win = Ext.create("Ext.window.Window", {

            title: "编辑",	   //标题
            height: 600,						//高度
            width: 800,						    //宽度
            layout: "fit",						//窗口布局类型
            modal: true,                      //是否模态窗口，默认为false
            items: [form]
        });
        win.show();

    },
    onUserDelete: function () {
        var view = this.getMainView();

        var store = view.getStore();
        var sm = view.getSelectionModel();
        if (sm.getSelection().length != 1) {
            Ext.Msg.alert('请选择一条记录');
            return;
        }
        var select = sm.getSelection();
        var oneSelect = select[0];
        var id = oneSelect.get('_id');

        //store.remove(sm.getSelection());
        //store.reload();

        Ext.Ajax.request({
            url: '/api/v1/<%=data.moduleName%>/remove',
            success: function (response) {
                var json = Ext.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('消息', json.msg, function () {
                        store.reload();
                    });
                }
            },
            failure: function () {
                Ext.Msg.alert('错误', "删除失败");
            },
            params: "_id=" + id
        });
    },

    //------------------- Begin to handle pop form events--------------\\
    onFormCancel: function() {
        Ext.getCmp('buttonSave').up('window').close();

    },

    onFormSave: function() {
        //var form = Ext.getCmp('buttonSave').up('Form');
        var form = this.getMainViewForm();
        var controller = this;
        if (!form.getForm().isValid()) {
            Ext.Msg.alert('错误', "数据录入格式不正确");
            return;
        }
        if (form.getForm().findField("_id").getValue() == "") {
            // 添加
            form.getForm().findField("_id").disabled = true; //不传给服务端-ID
            form.getForm().submit({
                url: '/api/v1/<%=data.moduleName%>/createNew',
                success: function(f, action) {
                    if (action.result.success) {
                        controller.getMainView().getStore().reload();
                        Ext.Msg.alert('消息', action.result.msg, function() {
                            Ext.getCmp('buttonSave').setText('添加');
                        });
                    }
                },
                failure: function() {
                    Ext.Msg.alert('错误', "添加失败");
                }
            });
        } else {
            // 修改
            form.getForm().submit({
                url: '/api/v1/<%=data.moduleName%>/update',
                success: function(f, action) {
                    if (action.result.success) {
                        controller.getMainView().getStore().reload();
                        Ext.Msg.alert('消息', action.result.msg, function() {

                            Ext.getCmp('buttonSave').setText('添加');
                        });
                    }
                },
                failure: function() {
                    Ext.Msg.alert('错误', "修改失败!");
                }
            });
        }
    }
    //------------------- Finished to handle pop form events-----------\\


});