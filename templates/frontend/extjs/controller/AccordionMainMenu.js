Ext.define('<%=data.appName%>.controller.AccordionMainMenu', {
    extend: 'Ext.app.Controller',
    views: ['AccordionMainMenu'],
    init: function () {
        //Ext.MessageBox.alert('test', 'setup click');
        this.control({
            'mainmenuaccordion button': {
                click: this.loadMenu
            }
        });

    },


    loadMenu: function (menuItem) {
        var panel = Ext.getCmp(menuItem.mid);
        if (!panel) {
            panel = {
                id: menuItem.pid,
                title:menuItem.text,
                xtype: menuItem.module,
                closable: true,
                layout: 'fit'
            };
            this.openTab(panel,menuItem.mid);
        } else {
            var main = Ext.getCmp("content-panel");
            main.setActiveTab(panel);
        }

    },
    openTab: function (panel, id) {
        //var o = (typeof panel == "string" ? panel : id || panel.id);
        var main = Ext.getCmp("content-panel");
        var tab = main.getComponent(panel.id);
        if (tab) {
            main.setActiveTab(tab);
        } else if (typeof panel != "string") {
            //panel.id = o;
            var p = main.add(panel);
            main.setActiveTab(p);
        }
    }

});