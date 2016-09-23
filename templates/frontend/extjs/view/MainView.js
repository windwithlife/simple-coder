/**
 * Created by zhangyq on 2016/5/1.
 */
function renderColumn(data, cell, record, rowIndex, columnIndex, store) {
    cell.style = "background-color:" + "#FBF8BF";
    return data;
}
var colums = [new Ext.grid.RowNumberer(),
    <% data.columns.forEach(function (col) {%>
        <%var strCol = JSON.stringify(col) %><%-strCol %>, <%})%>
    {
        xtype: 'actioncolumn',
        text: "操作",
        width: 50,
        items: [{
            icon: '/extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
            tooltip: 'Edit',
            html: "<h1>Edit</h1>",
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                alert("Edit " + rec.get('name'));
            }
        }, {}, {
            icon: '/extjs/examples/restful/images/delete.png',
            tooltip: 'Delete',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                alert("Delete " + rec.get('name'));
            }
        }]
    }
]
;


Ext.define('<%=data.appName%>.view.<%=data.viewName%>', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.<%=data.xViewName%>',
    //id: '<%=data.moduleName%>_view',
    //xtype:'Products',
    title: '信息列表',
    autoHeight: true,
    autoEl: true,
    //store: store,
    store: '<%=data.storeName%>',
    columns: colums,
    //selModel: new Ext.selection.CheckboxModel(),
    //plugins:[new Ext.grid.plugin.RowEditing({clickToEdit:2})]
    forceFit: true,
    tbar: [{
        iconCls: 'icon-add',
        text: '添加',
        action: 'add'
    }, {
        iconCls: 'icon-edit',
        text: '修改',
        action: 'edit'
    }, {
        iconCls: 'icon-delete',
        text: '删除',
        action: 'delete'
    }],
    bbar: {xtype: "pagingtoolbar", pageSize: 10, store: '<%=data.store%>', displayInfo: true},

    initComponent: function () {
        var myStore = this.getStore();
        this.callParent();
    }
});


