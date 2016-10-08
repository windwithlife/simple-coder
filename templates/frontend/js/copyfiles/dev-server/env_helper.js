/**
 * Created by zhangyq on 2016/3/28.
 */
var path = require('path');
function  testOS(req) {
    var $ = {};

    var ua = req.headers['user-agent'];
    //console.log(ua);
    if (/mobile/i.test(ua))
        $.Mobile = true;

    if (/like Mac OS X/.test(ua)) {
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        $.iPhone = /iPhone/.test(ua);
        $.iPad = /iPad/.test(ua);
    }

    if (/Android/.test(ua))
        $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

    if (/webOS\//.test(ua))
        $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

    if (/(Intel|PPC) Mac OS X/.test(ua))
        $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

    if (/Windows NT/.test(ua))
        $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

    return $;
}
module.exports.build = function(req, params,layoutName){
    var os = testOS(req);
    var platform = "mobile";
    var sideName = "client";
    var currentUrlPath = req.path;

    if (currentUrlPath.indexOf('admin')>-1){
        sideName = "admin";
    }else if (currentUrlPath.indexOf('web')>-1){
        sideName = "web";
    }else{
        sideName = "client";
    }
    if (os.Mobile){
        platform = "mobile";
    }else{
        platform = "pc";
    }
    var themeName = global.currentThemeName;
    if (!themeName){
        themeName = 'default';
    }

    var resourcePath = sideName + "/";

    return {
        resourcePath: resourcePath,
        sideName:sideName,
        platform:platform,
        layout: false
    };
}

module.exports.setTheme = function(layoutName){
    global.currentThemeName = layoutName;
    return "success";
}