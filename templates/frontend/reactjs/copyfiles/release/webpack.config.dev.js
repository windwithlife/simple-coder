/**
 * Created by zhangyq on 2016/5/25.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackBaseConfig = require("./webpack.config.base.js");
var cfg = Object.assign(webpackBaseConfig, {
    devtool: "cheap-module-eval-source-map"
});


// 模块名称, 替换此处以便启动并开发对应模块
var projectModule = 'product';


var config = {


    //页面入口文件配置
    entry: {
        app :[path.join(__dirname,'../resources/client/' + projectModule + '/router.js')],
        //vendors:['react','react-dom','react-router', 'axios','amazeui-touch','react-addons-css-transition-group']
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, '../dist/client/' + projectModule + '/'),//用devserver时htmlt会放到这个目录
        publicPath: '/client/' + projectModule + '/', // html引用路径，devserver测试时，生成的目标文件在内存中路径，生成环境可访问到的路径。及目标文件引用的别的文件的内存或生产环境路径。
        filename: '[name].js' // 注意我们使用了变量
    },
    externals: webpackBaseConfig.externals,

    //插件项
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',    //html模板路径
            inject:false,    //允许插件修改哪些内容，包括head与body
            hash:false,    //为静态资源生成hash值
        }),
        //new  webpack.optimize.CommonsChunkPlugin({
        //    name:['vendors'],
        //    minChunks:Infinity
        //}),
        new webpack.HotModuleReplacementPlugin()
    ],
    module:webpackBaseConfig.module,
    //其它解决方案配置
    resolve: webpackBaseConfig.resolve
};



module.exports = config;
