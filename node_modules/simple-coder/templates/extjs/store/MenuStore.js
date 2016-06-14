Ext.define('<%=data.appName%>.store.MenuStore', {
    extend: 'Ext.Component',
	data :<%-data.menus%>,
});
//
//[{
//    text : '商品管理', // 菜单项的名称
//    icon : '', // 菜单顶的图标地址
//    expanded : true, // 在树形菜单中是否展开
//    items : [{
//        text : '商品分类管理', // 菜单条的名称
//        module : 'ProductMainView', // 对应模块的名称
//        icon : '', // 菜单条的图标地址
//        id : 'eProjet',
//        leaf:true
//        // 菜单条的图标字体
//    }, {
//        text : '商品广告管理',
//        module : 'ProductMainView',
//        icon : '',
//        id : 'eTestSection',
//        leaf:true
//    }]
//}]
