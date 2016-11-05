/**
 * Created by ctrip on 16/1/6.
 */
define(['urlparser'], function (urlparser) {
    var data = {};
    data.pageItems = new Array();
    data.cachedPageControllers = new Array();
    data.currentPage = null;
    function pushPage(page){
        data.cachedPageControllers.push(page);

    }
    function popPage(){
        return data.cachedPageControllers.pop();
    }
    function getTopPage(){
        return data.cachedPageControllers[data.cachedPageControllers.length -1];
    }

    function registerRouter(path,controller) {
        var item = {};
        item.path = path;item.controller = controller;
        data.pageItems.push(item);
    }


    function getPageItem(path) {
        var result = null;
        _.each(data.pageItems, function (item) {
            if (item.path == path) {
                result = item;
                return;
            }
        });
        return result;
    }



    function jumpTo(path,params) {

        var item = getPageItem(path);
        if (!item){return;}
        jumpToNewPageByController(item);
        pushPage(item);

    };
    function jump(path,params){
        jumpTo(path,params)
    };


    function back(){
        var item = popPage();
        if (item == undefined){
            return;
        }else if (item.pageObject == data.currentPage){
            item = getTopPage();
        }
        jumpToNewPageByController(item);
    };

    function jumpToNewPageByController(item) {

        var controller = item.controller;
        var viewControllerPath =  controller;
        require([viewControllerPath], function (pageView) {
            data.currentPage = pageView;
            pageView.onLoad();
            pageView.render();
            pageView.onShow();
            item.pageObject = pageView;
            item.rendered = true;

        });
    }

    return {
        "jump": jump,
        "registerRouter":registerRouter,
        "back": back,

    };
});