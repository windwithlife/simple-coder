//var os         = require('os');
var fs         = require('fs');
var path       = require('path');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var replace   = require('gulp-replace');
var connect   = require('gulp-connect');
var webpack    = require("webpack");
//var webpackConfig = require("./webpack.config.js");
var argv       = require('yargs').argv;
var open       = require('open');
var xtools     = require('./xtools');
//var config     = require('./config.js');
//var apiServerAddress = config.apiServerAddress;
var apiServerAddress = "http://localhost:8080/";
var dirDist    ='../dist/';
var dirSource    ='../resources/';


var sideName = argv.side;
if (!sideName){sideName = "client"}
console.log("side name is:--" +  sideName);

var channelName = argv.channel;
if (!channelName){channelName = "product"}


console.log("dest folder name is:--" +  dirDist);

var host = argv.host;
var port = argv.port;
if (host){apiServerAddress = host};
if (!port){port = 5389};
console.log("ApiServerAddress is:--" +  apiServerAddress);


function sideChannelsBuild(basePath, sideName,destBasePath,webpackConfig){
    var workPath = basePath + "/" + sideName + "/";
    var targetPath  = destBasePath + "/" + sideName + "/";
    var files = fs.readdirSync(workPath);
    files.forEach(function(file){
        var filePath =workPath +  file;
        var stats = fs.statSync(filePath);
        //var modelFile = filePath + "/models/model.js";


        if (stats.isDirectory()){
            var publicPath = "/" + sideName + "/" + file +"/";
            var entryFile = filePath + "/router.js";
            var outPath   = targetPath + file;
            var cfg = Object.assign({},webpackConfig);
            cfg.entry = {};cfg.output={};
            cfg.entry.app = entryFile;
            //cfg.entry.vendors = webpackConfig.entry.vendors;
            cfg.output.path = outPath;
            cfg.output.publicPath = publicPath;
            cfg.output.filename = '[name].js';

            webpack(cfg,function(err, stats){
                if(err){console.log(err);}else{
                    console.log("ENV:" + process.env.NODE_ENV);
                    console.log("successful to build channel entry point file:" + entryFile);
                };

            });
        }
    });

    //console.log(process.env.NODE_ENV);
}

gulp.task('clean', function() {
    var dirSideDist = dirDist + "/" + sideName +"/";
    return gulp.src(dirSideDist, {
        read: false
    }).pipe(clean({force: true}));

});

gulp.task('replace', function() {
    var dirSideSource = dirSource + "/" + sideName +"/**/models/model.js";
    var dirSideDest = dirSource + "/" + sideName +"/";
    var strHost = "$1"+ apiServerAddress + "$2";
    return gulp.src(dirSideSource).pipe(replace(/(serverPath\s*=\s*[",']).+([",'])/g,strHost)).pipe(gulp.dest(dirSideDest));
})

gulp.task('build-release', function() {
    return gulp.start(function(){
        dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
        var config = require("./webpack.config.js");
        process.env.NODE_ENV = 'production';
        sideChannelsBuild(dirSource,sideName,dirDist,config);

    });



});
gulp.task('build-debug', function() {
    return gulp.start(function(){
        dirDist = "../dist/";
        var config = require("./webpack.config.dev.js");
        process.env.NODE_ENV = 'development';
        sideChannelsBuild(dirSource,sideName,dirDist,config);

    });
});

gulp.task('default', ['clean','build-debug']);

gulp.task('release', ['build-release']);

/*
gulp.task('java-release', ['clean'], function() {
    dirDist    ='../../../../src/main/resources/static/dist/';
    gulp.start(function() {

        sideChannelsBuild(dirSource,sideName,dirDist);
    });

});
*/


/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */

gulp.task('start-dev' ,function() {
    connect.server({
        port: port,
        root: '../dist/',
        livereload: true,
        fallback: './index.html'
    });
});

gulp.task('watch', function () {
    gulp.watch(['../resources/**/*.js'], ['rebuild']);
});

gulp.task('rebuild', ['build-debug'],function () {
    gulp.src("../dist/**/**/*.html").pipe(connect.reload());

});
gulp.task('run', ['build-debug','start-dev', 'watch'],function(){
    open('http://localhost:' + port + "/" + sideName + "/product/");
});
