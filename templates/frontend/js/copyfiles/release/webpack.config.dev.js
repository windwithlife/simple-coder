/**
 * Created by zhangyq on 2016/10/18.
 */
var webpack = require("webpack");
var webpackBase = require("./webpack.config.base.js");


var cfg = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    cfg.entry[name] = []
        //添加webpack-dev-server客户端
        .concat("webpack-dev-server/client?http://localhost:9390")
        .concat(webpackBase.entry[name])
});

module.exports = cfg;