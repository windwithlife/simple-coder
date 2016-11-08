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
var rename = require("gulp-rename");

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


gulp.task('replace', function() {
    var dirSideSource = dirSource + "/" + sideName +"/**/models/model.js";
    var dirSideDest = dirSource + "/" + sideName +"/";
    var strHost = "$1"+ apiServerAddress + "$2";
    return gulp.src(dirSideSource).pipe(replace(/(serverPath\s*=\s*[",']).+([",'])/g,strHost)).pipe(gulp.dest(dirSideDest));

});


gulp.task("copy-bower-files", function() {
    var baseBowerPath = "../resources/framework/bower_3rd/";
    var baseFramework3rdPath = "../resources/framework/js/3rd/";
    var baseFrameworkThemes3rdPath = "../resources/framework/themes/3rd/";

    gulp.src(baseBowerPath + "jquery/dist/jquery.js")
        .pipe(gulp.dest(baseFramework3rdPath));
    gulp.src(baseBowerPath + "bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest(baseFramework3rdPath));
    gulp.src(baseBowerPath + "requirejs/require.js")
        .pipe(gulp.dest(baseFramework3rdPath));
    gulp.src(baseBowerPath + "backbone/backbone.js")
        .pipe(gulp.dest(baseFramework3rdPath));
    gulp.src(baseBowerPath + "underscore/underscore.js")
        .pipe(gulp.dest(baseFramework3rdPath));
    gulp.src(baseBowerPath + "text/text.js")
        .pipe(gulp.dest(baseFramework3rdPath));

    var cssSourcePath = path.join(baseBowerPath, "bootstrap/less/");
    var cssDestPath  = path.join(baseFrameworkThemes3rdPath,"bootstrap/less");

    xtools.mkdirX(cssSourcePath);
    xtools.copyDirEx(cssSourcePath,cssDestPath);
});

gulp.task("copy-css-fonts",[],function() {
    gulp.src("../resources/framework/themes/**/fonts/*.*",{base:"../resources/framework/themes/"})
        .pipe(gulp.dest("../dist/framework/themes/"));

});
gulp.task("build-entry-css",["copy-css-fonts"], function() {
    gulp.src("../resources/framework/themes/**/css/bootstrap.less",{base:"../resources/framework/themes/"})
        .pipe(less()).pipe(autoprefixer()).pipe(minifycss())
        .pipe(gulp.dest("../dist/framework/themes/"));

});

gulp.task('pre-entry',[],function () {
    var basePath ="../";
    return gulp.src('../resources/framework/js/simple/main.js')
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
                simple: basePath + "simple/components/simple"
            },
            shim: {
                underscore: {exports: "_"},
                jquery: {exports: "$"},
                backbone: {
                    deps: ["underscore","jquery"],
                    exports: "Backbone"
                },
                text: {
                    deps: [],
                    exports: "text"
                }
            },
            wrapShim: true,
            //optimize: "none"
        })).pipe(concat("main_pre.js"))
        .pipe(gulp.dest('../dist/framework/js/'));
});
gulp.task('pre-entry-debug',[],function () {
    var basePath ="../";
    return gulp.src('../resources/framework/js/simple/main.js')
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
                simple: basePath + "simple/components/simple"
            },
            shim: {
                underscore: {exports: "_"},
                jquery: {exports: "$"},
                backbone: {
                    deps: ["underscore","jquery"],
                    exports: "Backbone"
                },
                text: {
                    deps: [],
                    exports: "text"
                }
            },
            wrapShim: true,
            optimize: "none"
        })).pipe(concat("main_pre.js"))
        .pipe(gulp.dest('../dist/framework/js/'));
});


gulp.task('build-entry-js', ["pre-entry"],function () {
    return gulp.src(['../resources/framework/js/3rd/require.js','../dist/framework/js/main_pre.js'])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest('../dist/framework/js/'));
});
gulp.task('build-entry-js-debug', ["pre-entry-debug"],function () {
    return gulp.src(['../resources/framework/js/3rd/require.js','../dist/framework/js/main_pre.js'])
        .pipe(concat("main.js"))
       // .pipe(uglify())
        .pipe(gulp.dest('../dist/framework/js/'));
});

gulp.task('framework', ['build-entry-js','build-entry-css'], function() {
    console.log("finished to build framework entrypoint css and js");
});


gulp.task('build-react-js',[],function () {
    var basePath ="../";
    return gulp.src(['../resources/framework/js/3rd/react-with-addons.min.js'
        ,'../resources/framework/js/3rd/react-dom.min.js'
        ,'../resources/framework/js/3rd/ReactRouter.min.js'
        ,'../resources/framework/js/3rd/amazeui.touch.min.js'
        ,'../resources/framework/js/3rd/axios.min.js'
        ,"../resources/framework/js/simple/main-react.js"
    ]).pipe(concat("main-react.js"))
        .pipe(uglify())
        .pipe(gulp.dest('../dist/framework/js/'));
});

gulp.task('build-react-js-debug',[],function () {
    var basePath ="../";
    return gulp.src(['../resources/framework/js/3rd/react-with-addons.min.js'
        ,'../resources/framework/js/3rd/react-dom.min.js'
        ,'../resources/framework/js/3rd/ReactRouter.min.js'
        ,'../resources/framework/js/3rd/amazeui.touch.min.js'
        ,'../resources/framework/js/3rd/axios.min.js'
        ,"../resources/framework/js/simple/main-react.js"
    ]).pipe(concat("main-react.js"))
        //.pipe(uglify())
        .pipe(gulp.dest('../dist/framework/js/'));
});

gulp.task('clean-release-framework', function() {
    dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/framework/';
    return gulp.src(dirDist, {
        read: false
    })
        .pipe(clean({force:true}));

});

gulp.task('clean', function() {
    dirDist = '../dist/framework/';
    return gulp.src(dirDist, {
        read: false
    })
        .pipe(clean({force:true}));

});
gulp.task('default', ['build-entry-js-debug','build-entry-css','build-react-js-debug'], function() {
    var dirDist = '../../';
    var destJSDist =path.join(dirDist,'js/dist/framework/');
    var destReactDist =path.join(dirDist,'reactjs/dist/framework/');
    gulp.start(function(){
        gulp.src('../dist/framework/**/**/*.*',{base:"../dist/framework/"}).pipe(gulp.dest(destJSDist));
        gulp.src('../dist/framework/**/**/*.*',{base:"../dist/framework/"}).pipe(gulp.dest(destReactDist));
    });

    //console.log('finished to build framework to ../dist/');
});
gulp.task('release', ['build-react-js','framework'], function() {
    var dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
    var destJSDir =path.join(dirDist,'/framework/js/');
    var destThemesDir =path.join(dirDist,'/framework/themes/');

    gulp.src('../dist/framework/js/*.js').pipe(gulp.dest(destJSDir));
    return gulp.src('../dist/framework/themes/**/**/*.*').pipe(gulp.dest(destThemesDir));


});


gulp.task('start-dev' ,function() {
    connect.server({
        port: 5389,
        root: '../dist/',
        livereload: true
    });
});


