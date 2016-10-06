var dirDist    ='../../../../src/main/resources/static/dist/',
    dirSource    ='../resources/';

var fs         = require('fs');
var path       = require('path');
//var xtools     = require('./xtools');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var webpack    = require("webpack");
var webpackConfig = require("./webpack.config.js");

function sideChannelsBuild(basePath, sideName,destBasePath){
    var workPath = basePath + "/" + sideName + "/";
    var targetPath  = destBasePath + "/" + sideName + "/";
    var files = fs.readdirSync(workPath);
    files.forEach(function(file){
        var filePath =workPath +  file;
        var stats = fs.statSync(filePath);
        if (stats.isDirectory()){
            var entryFile = filePath + "/router.js";
            var outPath   = targetPath + file;
            webpackConfig.entry.app = entryFile;
            webpackConfig.output.path = outPath;
            webpack(webpackConfig,function(err, stats){
                if(err){console.log(err);}else{
                    console.log("successful to build channel entry point file:" + entryFile);
                };

            });
        }
    });
}

gulp.task('clean', function() {

    return gulp.src(dirDist, {
        read: false
    })
        .pipe(clean({force: true}));

});

gulp.task('default', ['clean'], function() {

    gulp.start(function() {
        //taskProject.moveToDist();
        //xtools.copyDirEx(dirSource,dirDist);
        sideChannelsBuild(dirSource,"client",dirDist);
    });

});


/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */


gulp.task('run', ['clean'] ,function() {

    gulp.start(function() {

    });
});
