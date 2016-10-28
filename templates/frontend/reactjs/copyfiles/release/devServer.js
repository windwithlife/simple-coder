/**
 * Created by zhangyq on 2016/10/18.
 */

var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.config.dev.js");
webpackCfg.entry.app.unshift("webpack-dev-server/client?http://localhost:5389/", "webpack/hot/dev-server");
//webpackCfg.entry.app.unshift("webpack-dev-server/client?http://localhost:5389/", "webpack/hot/only-dev-server");

webpackCfg.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(webpackCfg);
var port = 5389;
//init server
var app = new webpackDevServer(compiler, {
    //注意此处publicPath必填
    hot:true,
    contentBase: path.join(__dirname,'../dist/'),
    publicPath: webpackCfg.output.publicPath
});

app.listen(port, "localhost", function (err) {
    if (err) {
        console.log(err);
    }else{
        console.log("listen at http://localhost:" + port);
    }
});

