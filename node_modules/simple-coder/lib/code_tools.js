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
exports.generateCode = generateCode;
exports.generateH5Code = generateH5Code;
exports.createDirectory = createDirectory;
