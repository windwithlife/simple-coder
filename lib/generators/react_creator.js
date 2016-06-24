
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var store = require('../json_db');


var config = {
    appName : "",
    module: "",
    rootPath: "",
    language : "react",
    dbType:"mongodb",
    srcRootPath: function(){return this.rootPath +"/modules/";},
    serverRootPath:function(){return this.rootPath + "server/"},

    serverBinPath: function(){return this.serverRootPath()  + "bin/";},
    serverModelPath: function(){return this.serverRootPath()  + "/model/";},
    routerPath: function(){return this.serverRootPath()  + "/routes/";},
    soaPath:function(){return this.serverRootPath()  + "/apis/";},


    //templates path
    rootTemplatePath:  function(){return this.rootPath +"/node_modules/simple-coder/templates/";},
    templatePath: function(){return this.rootTemplatePath()  + this.language + "/";},
    routerTemplatePath:function(){return this.templatePath() + "/router/"},
    dbTemplatePath:function(){return this.templatePath() + this.dbType + "/"},

    buildBaseParams: function(){
        return {
            appName: this.appName,
            moduleName:this.module,

        };
    }
};


function createModuleDatabaseModel(moduleName,moduleDefine){
    var filename = moduleName + ".js";
    var tFilename = 'model.js';
    var templateFile = config.dbTemplatePath()  + tFilename ;
    var moduleFile   = config.serverModelPath() + filename;
    var columns = [];
    for(var field in moduleDefine){
        var column = {
            type: moduleDefine[field].type,
            name:field
        };

        columns.push(column);
    }
    var params = config.buildBaseParams();
    params.columns = columns;
    codeTools.generateCode(templateFile,params,moduleFile);
    /*
    templateFile = config.templatePath +"nodejs/mysql/" + "dao.js" ;
    var moduleFile   = __dirname + "/../models/mysql/" + filename;
    codeTools.generateCode(templateFile,params,moduleFile);
    */
};
function createModuleSOAs(moduleName,moduleDefine){
    var filename = moduleName + ".js";
    var tFilename = 'api.js';
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = config.routerPath() +"api/"+ filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};


function createSOARouters(moduleName){

    var params = config.buildBaseParams();
    var defines = store.getDefines();
    params.modules = [];
    defines.Definedmodules.forEach(function(item){
        params.modules.push(item.name);
    });

    //get old router file data;
    var oldFilename = "soa_router.js";
    var oldModuleFile   = config.routerPath() + oldFilename;
    if (fs.existsSync(oldModuleFile)){
        var data = fs.readFileSync(oldModuleFile,'utf-8');
        var lines = data.split(/\r?\n/ig);
        var oldrouters = [];
        for (var line in lines)
        {
            if  (/router\.(post|get)/.test(lines[line])){
                if (new RegExp('router\\.(post|get|put)\\(\\/' + moduleName, 'i').test(lines[line])){
                    break;
                }else{
                    oldrouters.push(lines[line] +"\r\n");
                }

            }
        }
        params.oldrouters = oldrouters
    }else{params.oldrouters = []}


    //create header part.
    var filename = "soa_router.js";
    var tFilename =  "soa_router_module.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = config.routerPath()+ "api/" + filename;
    codeTools.generateCode(templateFile,params,moduleFile);

}


function generateFrameworkDirectories(){

    codeTools.createDirectory(config.serverRootPath());
    codeTools.createDirectory(config.serverModelPath());
    codeTools.createDirectory(config.soaPath());
    codeTools.createDirectory(config.routerPath());
    codeTools.createDirectory(config.routerPath()+"api/");

}
function copyBaseFrameworkFiles(){
    var frameworkBinPath = config.templatePath() + "frameworkfiles/framework/";
    xtools.copyDirEx(frameworkBinPath,config.serverBinPath());
}
function generateFramework(){
    initPathEnv();
   // generateFrameworkDirectories();
    copyBaseFrameworkFiles();
}

function initPathEnv(){
    var currentPath =  process.cwd() + "/";
    console.log("[Current Folder is:]"+currentPath);
    config.rootPath = currentPath;
    store.opendb(config.rootModulePath());
}
function generateModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleDatabaseModel(moduleName,moduleDefine);
    createModuleSOAs(moduleName,moduleDefine);

    createSOARouters(moduleName);
}
function generateModuleByDB(moduleName){

    var mdefine = store.getModuleDefine(moduleName);
    if (!mdefine){return;}
    console.log('module defines:' + JSON.stringify(mdefine));
    generateModule(mdefine.name,mdefine.fields);

}
function generateModuleByDefine(moduleName,mdefine){
    initPathEnv();
    config.module = moduleName.toLowerCase();
    if (store.hasModule(moduleName)){
        console.log("MODULE:[" + moduleName + "] already exists");
        return;
    }
    store.addModuleDefine(moduleName,mdefine);
    generateFramework();

    generateModule(moduleName,mdefine.fields);

}


//exports.generateCode = generateCode;

exports.generateFramework = generateFramework;
exports.generateModuleByDB = generateModuleByDB;
exports.generateModuleByDefine = generateModuleByDefine;
exports.coderDefine = {name:"react",desc:"create a react framework and related project code"};


