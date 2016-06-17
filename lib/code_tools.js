/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
var ejsTool = require('ejs');
var fs       = require('fs');


function generateCode(templateFile, params, outFile){
    var temple = fs.readFileSync(templateFile, 'utf-8');
      var strResult = ejsTool.render(temple, {data: params});
     fs.writeFileSync(outFile,strResult,'utf-8');
}
function generateH5Code(templateFile, params, outFile){
    var temple = fs.readFileSync(templateFile, 'utf-8');
    var strResult = ejsTool.render(temple, {data: params},{delimiter: '?'});
    fs.writeFileSync(outFile,strResult,'utf-8');
}
//create directory sync
function createDirectory(dirName){
    console.log("------------begin to create directory:" + dirName);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        console.log("------------successful to create directory:" + dirName);
    }
}
function testInRightCoderPath(){
    var currentPath = process.cwd();
    var coderFilePath = currentPath + "/node_modules/simple-coder/coder.js";
    if (fs.existsSync(root)) {
       return true;
    }else{
        console.log('you should execute COMMAND:[simple-coder] in right project path! please check that before do a job!');
        return false;
    }
}
exports.generateCode = generateCode;
exports.generateH5Code = generateH5Code;
exports.createDirectory = createDirectory;
