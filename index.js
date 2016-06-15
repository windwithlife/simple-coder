
'use strict';
var path = require('path');
var fs   = require('fs');


// React
var Simple = function(){
    var hello = "hello";
    console.log(hello);
    return hello;
};
var mPath =  process.cwd() + "/";
var files = fs.readdirSync(mPath);
files.forEach(function(file){
    var stats = fs.statSync(mPath+"/"+file);
    if (!stats.isDirectory()){
        console.log(file);
    }
});

module.exports = Simple;