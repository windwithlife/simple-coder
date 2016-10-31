
var fs         = require('fs');
var path       = require('path');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var replace   = require('gulp-replace');
var connect   = require('gulp-connect');
var webpack    = require("webpack");
var webpackConfig = require("./webpack.config.release.js");
var argv       = require('yargs').argv;
var open       = require('open');
var xtools     = require('./xtools');
var config     = require('./config.js');
var apiServerAddress = config.apiServerAddress;
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


function sideChannelsBuild(basePath, sideName,destBasePath){
    var workPath = basePath + "/" + sideName + "/";
    var targetPath  = destBasePath + "/" + sideName + "/";
    var files = fs.readdirSync(workPath);
    files.forEach(function(file){
        var filePath =workPath +  file;
        var stats = fs.statSync(filePath);
        var modelFile = filePath + "/models/model.js";


        if (stats.isDirectory()){
            var publicPath = "/" + sideName + "/" + file +"/";
            var entryFile = filePath + "/router.js";
            var outPath   = targetPath + file;
            var cfg = Object.assign({},webpackConfig);
            cfg.entry = {};cfg.output={};
            cfg.entry.app = entryFile;
            cfg.output.path = outPath;
            cfg.output.publicPath = publicPath;

            webpack(cfg,function(err, stats){
                if(err){console.log(err);}else{
                    console.log("successful to build channel entry point file:" + entryFile);
                };

            });
        }
    });
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

gulp.task('build', function() {
    dirDist = "../dist/";
    gulp.start(function() {

        sideChannelsBuild(dirSource,sideName,dirDist);
    });

});

gulp.task('framework', [], function() {
    dirDist = "../dist/";
    xtools.mkdirX(dirDist);

    var dirSideSource = dirSource  +"/framework/";
    var dirSideDist = dirDist  +"/framework/";
    xtools.copyDirEx(dirSideSource,dirSideDist);
});
gulp.task('default', ['clean','replace','build','framework']);



gulp.task('release', ['clean','replace'], function() {
    dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
    gulp.start(function() {

        sideChannelsBuild(dirSource,sideName,dirDist);
    });

});
gulp.task('java-release', ['clean','replace'], function() {
    dirDist    ='../../../../src/main/resources/static/dist/';
    gulp.start(function() {

        sideChannelsBuild(dirSource,sideName,dirDist);
    });

});



/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */
/*
gulp.task('start-dev' ,function() {
    connect.server({
        port: port,
        root: '../dist/',
        livereload: true
    });
});
*/
//gulp.task('watch', function () {
//    gulp.watch(['../resources/**/*.js'], ['rebuild']);
//});

//gulp.task('rebuild', ['build'],function () {
//    gulp.src("../dist/**/**/*.html").pipe(connect.reload());

//});
//gulp.task('run', ['clean','framework','build','start-dev', 'watch'],function(){
//    open('http://localhost:' + port + "/" + sideName + "/product/");
//});
//gulp.task('run', ['start-dev', 'watch'],function(){
//    open('http://localhost:' + port + "/" + sideName + "/product/");
//});
