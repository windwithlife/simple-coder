
var fs         = require('fs');
var path       = require('path');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var replace   = require('gulp-replace');
var webpack    = require("webpack");
var webpackConfig = require("./webpack.config.js");
var argv       = require('yargs').argv;
var xtools     = require('./xtools');

var apiServerAddress ="localhost:5389";
var dirDist    ='../dist/';
var dirSource    ='../resources/';


var sideName = argv.side;
if (!sideName){sideName = "client"}
console.log("side name is:--" +  sideName);

/*
var release = argv.release;
if (!release){
    dirDist = "../dist/";
}
if (release == "javaserver"){
    dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
}else if(release =="localserver"){
    dirDist    ='../../../../src/main/resources/static/dist/';
}*/
//xtools.mkdirX(dirDist);
console.log("dest folder name is:--" +  dirDist);

var host = argv.host;
if (host){apiServerAddress = host};
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
    var dirSideDist = dirDist + "/" + sideName +"/";
    return gulp.src(dirSideDist, {
        read: false
    }).pipe(clean({force: true}));

});

gulp.task('replace', function() {
    var dirSideSource = dirSource + "/" + sideName +"/**/models/model.js";
    var dirSideDest = dirSource + "/" + sideName +"/";
    var strHost = "$1"+ apiServerAddress + "$2";
    return gulp.src(dirSideSource).pipe(replace(/(serverPath\s*=\s*[",']http[s]{0,1}:\/\/).+([",'])/g,strHost)).pipe(gulp.dest(dirSideDest));

})

gulp.task('default', ['clean','replace','framework'], function() {
    dirDist = "../dist/";
    gulp.start(function() {

        sideChannelsBuild(dirSource,sideName,dirDist);
    });

});

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



gulp.task('framework', [], function() {
    dirDist = "../dist/";
    xtools.mkdirX(dirDist);

    var dirSideSource = dirSource  +"/framework/";
    var dirSideDist = dirDist  +"/framework/";
    xtools.copyDirEx(dirSideSource,dirSideDist);
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
