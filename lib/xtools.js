/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
var fs       = require('fs');

function copyDir(src, dest){
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    var srcPath = src + "/";
    var destPath = dest + "/";
    var files = fs.readdirSync(srcPath);
    files.forEach(function(file){
        var filePath =srcPath + file;
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()){
            var source = fs.readFileSync(filePath, 'utf-8');
            fs.writeFileSync(destPath + file,source,'utf-8');
        }
    });
}
function copyDirEx(src, dest){
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    var srcPath = src + "/";
    var destPath = dest + "/";
    var files = fs.readdirSync(srcPath);
    files.forEach(function(file){
        var srcPathFile =srcPath + file;
        var destPathFile = destPath + file;
        var stats = fs.statSync(srcPathFile);
        if (!stats.isDirectory()){
            var source = fs.readFileSync(srcPathFile, 'utf-8');
            fs.writeFileSync(destPathFile,source,'utf-8');
        }else{
            copyDirEx(srcPathFile,destPathFile);
        }
    });
}
//create directory sync
function createDirectory(dirName){
    console.log("------------begin to create directory:" + dirName);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        console.log("------------successful to create directory:" + dirName);
    }
}
exports.copyDirEx = copyDirEx;
exports.copyDir = copyDir;
exports.createDirectory = createDirectory;
