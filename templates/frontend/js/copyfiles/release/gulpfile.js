var os         = require('os');
var path       = require('path');
var xtools     = require('./xtools');
var gulp       = require('gulp');
var clean      = require('gulp-clean');
var replace   = require('gulp-replace');
var argv       = require('yargs').argv;

//
var apiServerAddress = "localhost:5389";


var dirDist    ='../dist/';
var dirSource    ='../resources/';

var sideName = argv.side;
var release = argv.release;
if (!sideName){sideName = "admin"}


var host = argv.host;
if (host){apiServerAddress = host};
console.log("ApiServerAddress is:--" +  apiServerAddress);

var printMsg = function() {
    console.log('\033[0;31m\n文件已经迁移到TFS环境中');
    console.log('当前迁移的TFS路径为：' + dirtfs.dir().toString());
    console.log('如果TFS路径不正确，请自行在lib目录中增加 .tfsdir 文件，文件的内容为TFS路径\033[0m\n');
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

})
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
    xtools.copyDirEx(dirSideSource,dirSideDist);

});
/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */


gulp.task('run', ['clean'] ,function() {

    gulp.start(function() {
        taskProject._watch();
        taskProject.connect();
    });
});
