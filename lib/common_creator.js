
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');
var store = require('./json_db');
var coder = require('./generators/web_creator');
var generatorList = [];

var config = {
    rootPath: "",
    rootModulePath: function(){return this.rootPath +"/modules/";},
    rootGeneratorsPath: function(){return this.rootPath +"node_modules/simple-coder/lib/generators/";},
};


function initPathEnv(){
    var currentPath =  process.cwd() + "/";
    console.log(currentPath);
    config.rootPath = currentPath;
    store.opendb(config.rootModulePath());
}



function syncModulesDefinesByFiles(){

    var mPath = config.rootModulePath();
    var files = fs.readdirSync(mPath);
    files.forEach(function(file){
        var filePath = mPath + file;
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()){
            var  mdefine = require(filePath);
            if (!mdefine.name){return;}
            console.log(filePath);
            var moduleName = mdefine.name;
            if (!store.hasModule(moduleName)){
                store.addModuleDefine(moduleName,mdefine);
            }else{
                console.log("MODULE:[" + moduleName + "] already exists");
                return;
            }
        }
    });
}




function findGeneratorByName(name){
    var foundGenerator;
    generatorList.forEach(function(generator){
        if (generator.coderDefine.name == name){
            foundGenerator = generator;
            return;
        }
    });

    return foundGenerator;
}
function generatorPromptMsg(name){
    var msg='Usage:\n';
    generatorList.forEach(function(generator){
        var cmd  = generator.coderDefine.name;
        var desc = generator.coderDefine.name;
        msg =  msg + "Command:[" + cmd + "] --Function:" + desc + "\n";
    });

    return msg;
}

function loadGenerators(){
    var mPath = config.rootGeneratorsPath();
    var files = fs.readdirSync(mPath);
    files.forEach(function(file){
        var filePath =  path.join(mPath,file);
        console.log("generater file:" +  filePath);
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()){
            var generator = require(filePath);
            if (!generator.coderDefine){return;}
            if (!generator.coderDefine.name){return;}
            generatorList.push(generator);
        }
    });
}
function initGenerators(){
    initPathEnv();
    loadGenerators();
    syncModulesDefinesByFiles();

}

function generateCode(cmdOption,config,verbose){
    initGenerators();

    var generator = findGeneratorByName(cmdOption);
    if (!generator) {
        return;
    }
    //generator =coder;
    generator.generateFramework();

    if ((!config) || (config=='all')){
        store.getDefines().Definedmodules.forEach(function(mdefine){
            generator.generateModuleByDB(mdefine.name);
        })
    }else{
        var modules = config.split(" ");
        modules.forEach(function (moduleName) {
            generator.generateModuleByDB(moduleName);
        });
        console.log("generated code by define file in modules directory\n");
    }
    //generator.generateCode(config, verbose);
}

function generateNewModuleCodeByDefine(cmdOption,moduleName, mdefine){
    initGenerators();
    if (!store.hasModule(moduleName)){
        console.log("MODULE:[" + moduleName + "] already exists");
        return;
    }
    store.addModuleDefine(moduleName,mdefine);
    var generator = findGeneratorByName(cmdOption);
    if (!generator) {
        return;
    }
    generator.generateFramework();
    generator.generateModuleByDB(moduleName);
    console.log("generated code by define file in modules directory\n");

}


exports.generateNewModuleCode = generateNewModuleCodeByDefine;
exports.generateCode = generateCode;
exports.generatorPromptMsg = generatorPromptMsg;




