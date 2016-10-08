
var fs         = require('fs');
var path       = require('path');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var webpack    = require("webpack");
var webpackConfig = require("./webpack.config.js");

var argv       = require('yargs').argv;



var sideName = argv.side;
if (!sideName){sideName = "client"}
console.log("side name is:--" +  sideName);

var dirDist    ='../../../../src/main/resources/static/dist/';
var dirSource    ='../resources/';
var release = argv.release;
if (!release){
    dirDist = "../dist/";
}
if (release == "javaserver"){
    dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
}else if(release =="localserver"){
    dirDist    ='../../../../src/main/resources/static/dist/';
}
//xtools.mkdirX(dirDist);
console.log("dest folder name is:--" +  dirDist);

var apiServerAddress = argv.host;
if (!apiServerAddress){apiServerAddress = "http://localhost:5389"};
console.log("ApiServerAddress is:--" +  apiServerAddress);

//provider currect api server address and port
function replaceServerHost(basePath,targetHost){
	
}

function sideChannelsBuild(basePath, sideName,destBasePath){
    var workPath = basePath + "/" + sideName + "/";
    var targetPath  = destBasePath + "/" + sideName + "/";
    var files = fs.readdirSync(workPath);
    files.forEach(function(file){
        var filePath =workPath +  file;
        var stats = fs.statSync(filePath);
        var modelFile = filePath + "/models/model.js";
        replaceServerHost(modelFile,apiServerAddress);
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
    })
        .pipe(clean({force: true}));

});

gulp.task('default', ['clean'], function() {

    gulp.start(function() {

        sideChannelsBuild(dirSource,sideName,dirDist);
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
