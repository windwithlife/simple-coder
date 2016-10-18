var os         = require('os');
var path       = require('path');
var fs         = require('fs');
var xtools     = require('./xtools');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var replace   = require('gulp-replace');
var argv       = require('yargs').argv;
var connect   = require('gulp-connect');


//
var apiServerAddress = "localhost:5389";


var dirDist    ='../dist/';
var dirSource    ='../resources/';

var sideName = argv.side;
var release = argv.release;
if (!sideName){sideName = "admin"}


var host = argv.host;
if (host){apiServerAddress = host}
console.log("ApiServerAddress is:--" +  apiServerAddress);

var printMsg = function() {
    console.log('\033[0;31m\n文件已经迁移到TFS环境中');
    console.log('如果TFS路径不正确，请自行在lib目录中增加 .tfsdir 文件，文件的内容为TFS路径\033[0m\n');
}


function sideChannelsBuild(basePath, sideName,destBasePath){


    var workPath = basePath + "/" + sideName + "/";
    var targetPath  = destBasePath + "/" + sideName + "/";

    xtools.copyDirEx(workPath,targetPath);
    var files = fs.readdirSync(workPath);
    files.forEach(function(file){
        var filePath =workPath +  file;
        var stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            var indexFile = targetPath + file + "/index.html";
            var indexFileSrc = "./index.html";
            fs.writeFileSync(indexFile, fs.readFileSync(indexFileSrc));
        }
    });
}

gulp.task('clean', function() {
    var dirSideDest = dirDist +"/" + sideName +"/";
    return gulp.src(dirSideDest, {
        read: false
    })
        .pipe(clean({force:true}));

});

gulp.task('replace', function() {
    var dirSideSource = dirSource + "/" + sideName +"/**/models/model.js";
    var dirSideDest = dirSource + "/" + sideName +"/";
    var strHost = "$1"+ apiServerAddress + "$2";
    return gulp.src(dirSideSource).pipe(replace(/(serverPath\s*=\s*[",']).+([",'])/g,strHost)).pipe(gulp.dest(dirSideDest));

});
gulp.task('build', function() {
    dirDist = "../dist/";
    xtools.mkdirX(dirDist);
    gulp.start(function() {
      sideChannelsBuild(dirSource,sideName,dirDist);
    });

});
gulp.task('default', ['clean','replace','framework'], function() {
    dirDist = "../dist/";
    xtools.mkdirX(dirDist);
    gulp.start(function() {
        var dirSideSource = dirSource  +"/" + sideName +"/";
        var dirSideDist = dirDist  +"/" + sideName +"/";

        xtools.copyDirEx(dirSideSource,dirSideDist);
    });

});
gulp.task('release', ['clean','replace'], function() {
    dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
    xtools.mkdirX(dirDist);
    gulp.start(function() {
        var dirSideSource = dirSource  +"/" + sideName +"/";
        var dirSideDist = dirDist  +"/" + sideName +"/";

        xtools.copyDirEx(dirSideSource,dirSideDist);
    });

});

gulp.task('java-release', ['clean','replace'], function() {
    dirDist    ='../../../../src/main/resources/static/dist/';
    xtools.mkdirX(dirDist);
    gulp.start(function() {
        var dirSideSource = dirSource  +"/" + sideName +"/";
        var dirSideDist = dirDist  +"/" + sideName +"/";

        xtools.copyDirEx(dirSideSource,dirSideDist);
    });

});

gulp.task('framework', [], function() {
    dirDist = "../dist/";
    xtools.mkdirX(dirDist);

    var dirSideSource = dirSource  +"/framework/";
    var dirSideDist = dirDist  +"/framework/";
    xtools.copyDirEx(dirSideSource,dirSideDist);
    //xtools.copyDirEx(dirSideSource,dirSideDist);

});
/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */
/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */

gulp.task('start-dev' ,function() {
    connect.server({
        port: 5389,
        root: '../dist/',
        livereload: true
    });
});


gulp.task('rebuild', ['build'],function () {
    gulp.src("../dist/**/**/*.html").pipe(connect.reload());

});

gulp.task('watch', function () {
    gulp.watch(['../resources/**/*.js','../resources/**/templates/*.html'], ['rebuild']);
});

gulp.task('run', ['clean','framework','build','start-dev', 'watch']);

