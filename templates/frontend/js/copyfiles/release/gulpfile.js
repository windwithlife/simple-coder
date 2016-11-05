var os         = require('os');
var path       = require('path');
var fs         = require('fs');
var xtools     = require('./xtools');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var replace   = require('gulp-replace');
var argv       = require('yargs').argv;
var connect   = require('gulp-connect');
var requirejsOptimize = require('gulp-requirejs-optimize');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css'); // CSS压缩


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



gulp.task('build-rjs', function () {
    var basePath ="../../framework/js/";

    return gulp.src('../resources/admin/product/*.js')
        .pipe(requirejsOptimize({
            //mainConfigFile: '../resources/framework/js/simple/global_require_config.js',
            paths: {
                jquery:basePath +  "3rd/jquery.min",
                underscore:basePath + "3rd/underscore-min",
                backbone: basePath + "3rd/backbone-min",
                text:basePath +  "3rd/text",
                urlparser: basePath + "simple/components/url_parser",
                pagenavigator: basePath + "simple/components/page_navigator",
                router:  basePath + "simple/components/router",
                model:basePath +  "simple/components/model",
                params: basePath + "simple/components/params",
                simple: basePath + "simple/components/simple",
                homeModel:"./models/model"
            },
            //optimize: "none",
            exclude: [
                'jquery','underscore','backbone','router','text','model','params','pagenavigator'
            ]
        })).pipe(concat("app.js"))
        .pipe(gulp.dest('../dist/admin/product/'));
});

gulp.task('build-all-rjs', [],function () {
    var workPath = "../resources/" +  sideName + "/";
    var targetPath ="../dist/" + sideName + "/";
    var basePath ="../../framework/js/";
    var files = fs.readdirSync(workPath);
    files.forEach(function(file){
        var filePath =workPath +  file;
        var stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            gulp.src(path.join(workPath,file) + '/*.js')
                .pipe(requirejsOptimize({
                    //mainConfigFile: '../resources/framework/js/simple/global_require_config.js',
                    paths: {
                        jquery:basePath +  "3rd/jquery.min",
                        underscore:basePath + "3rd/underscore-min",
                        backbone: basePath + "3rd/backbone-min",
                        text:basePath +  "3rd/text",
                        urlparser: basePath + "simple/components/url_parser",
                        pagenavigator: basePath + "simple/components/page_navigator",
                        router:  basePath + "simple/components/router",
                        model:basePath +  "simple/components/model",
                        params: basePath + "simple/components/params",
                        simple: basePath + "simple/components/simple",
                        homeModel:"./models/model"
                    },
                    //optimize: "none",
                    exclude: [
                        'jquery','underscore','backbone','router','text','model','params','pagenavigator'
                    ]
                })).pipe(concat("app.js"))
                .pipe(gulp.dest(path.join(targetPath,file)));
        }
    });
});




gulp.task('copy-index',function() {

    return gulp.start(function(){
    var baseSourcePath = "../resources/"+ sideName + "/";
    var baseDestPath = "../dist/"+ sideName + "/";

        var files = fs.readdirSync(baseSourcePath);
        files.forEach(function(file){
            if (file=='common'){ return;}
            var filePath =baseSourcePath +  file;
            var targetFilePath =baseDestPath +  file;
            var stats = fs.statSync(filePath);
            gulp.src("./index.html").pipe(gulp.dest(targetFilePath));

        });
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


gulp.task('rebuild', ['build-all-rjs'],function () {
    gulp.src("../dist/**/**/*.html").pipe(connect.reload());

});
gulp.task('watch', function () {
    gulp.watch(['../resources/**/*.js','../resources/**/templates/*.html'], ['rebuild']);
});

gulp.task('run', ['framework','build-all-rjs','copy-index','start-dev', 'watch']);

