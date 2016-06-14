/**
 * Created by zhangyq on 2016/4/27.
 */

/**
 * 折叠式(accordion)菜单，样式可以自己用css进行美化
 */

Ext.define('<%=data.appName%>.view.AccordionMainMenu', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.mainmenuaccordion',
    title : '系统菜单',
    //glyph : 0xf0c9,
   // region: 'west',
    layout : {
        type : 'accordion',
        animate : true
    },
    requires:['<%=data.appName%>.store.MenuStore'],
    getMenuStore :function(){
        return Ext.create('<%=data.appName%>.store.MenuStore');
    },
    initComponent : function() {
        this.items = [];
        var menus = this.getMenuStore().data;
        for (var i in menus) {
            var menugroup = menus[i];
            var accpanel = {
                menuAccordion : true,
                xtype : 'panel',
                title : menugroup.text,
                bodyStyle : {
                    padding : '10px'
                },
                layout : 'fit',
                dockedItems : [{
                    dock : 'left',
                    xtype : 'toolbar',
                    items : []
                }],
                glyph : menugroup.glyph
            };
            for (var j in menugroup.items) {
                var menumodule = menugroup.items[j];
                accpanel.dockedItems[0].items.push({
                    xtype : 'button',
                    text : this.addSpace(menumodule.text, 12),
                    pid : menumodule.pid,
                    module:menumodule.module,
                    glyph : menumodule.glyph,

                });
            }
            this.items.push(accpanel);
        }

        Ext.apply(this,{
            id: 'menu-panel',
            title: '菜单',
            stateId: 'navigation-panel',
            iconCls:'icon-menu',
            margins : '0 0 -1 1',
            region:'west',
            border : false,
            enableDD : false,
            split: true,
            width : 212,
            minSize : 130,
            maxSize : 300,
            containerScroll : true,
            collapsible : true,
            autoScroll: false,
        });

        this.callParent(arguments);
    },

    addSpace : function(text, len) {
        console.log(text.length);
        var result = text;
        for (var i = text.length; i < len; i++) {
            result += '　';
        }
        return result;
    }



})