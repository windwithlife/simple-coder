/**
 * Created by zhangyq on 2016/5/25.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackBaseConfig = require("./webpack.config.base.js");
//var cfg = Object.assign(webpackBaseConfig, {
//    devtool: "cheap-module-eval-source-map"
//});




var config = {


    //页面入口文件配置
    entry: {
        app :[path.join(__dirname,'../resources/client/product/router.js')],
        //vendors:['react','react-dom','react-router', 'axios','amazeui-touch','react-addons-css-transition-group']

    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, '../dist/client/product/'),
        publicPath: "/client/product/",//html引用路径
        filename: '[name].js' // 注意我们使用了变量
    },


    //插件项
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
        }),
        //new  webpack.optimize.CommonsChunkPlugin({
        //    name:['vendors'],
        //    minChunks:Infinity
        //}),
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             }
        })
    ],
    externals: webpackBaseConfig.externals,
    module:webpackBaseConfig.module,
    //其它解决方案配置
    resolve: webpackBaseConfig.resolve
};

console.log("ENV:" + process.env.NODE_ENV);

module.exports = config;