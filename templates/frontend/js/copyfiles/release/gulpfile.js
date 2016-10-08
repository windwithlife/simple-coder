var os         = require('os');
var path       = require('path');
var xtools     = require('./xtools');
var gulp       = require('gulp');
var clean      = require('gulp-clean');

var argv       = require('yargs').argv;


var sideName = argv.side;
var release = argv.release;
if (!sideName){sideName = "admin"}

var dirDist    ='../../../../src/main/resources/static/dist/';
var dirSource    ='../resources/';
if (!release){
    dirDist = "../dist/";
}
if (release == "javaserver"){
    dirDist = '../../../server/java/simpleserver/src/main/resources/static/dist/';
}else if(release =="localserver"){
    dirDist    ='../../../../src/main/resources/static/dist/';
}
xtools.mkdirX(dirDist);
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

gulp.task('default', ['clean'], function() {

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


gulp.task('run', ['clean'] ,function() {

    gulp.start(function() {
        taskProject.build();
        taskProject._watch();
        taskProject.connect();
    });
});
