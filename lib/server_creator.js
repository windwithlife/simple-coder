
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');
var store = require('./json_db');


var config = {
    appName : "",
    module: "",
    rootPath: "",
    language : "nodejs",
    dbType:"mongodb",
    rootModulePath: function(){return this.rootPath +"/node_modules/simple-coder/modules/";},
    serverRootPath:function(){return this.rootPath + "server/"},
    clientRootPath:function(){return this.rootPath + "server/"},

    serverModelPath: function(){return this.serverRootPath()  + "/model/";},
    routerPath: function(){return this.serverRootPath()  + "/routes/";},
    soaPath:function(){return this.serverRootPath()  + "/apis/";},
    clientModelPath:function(){return this.clientRootPath()  + "/model/";},

    //templates path
    rootTemplatePath:  function(){return this.rootPath +"/node_modules/simple-coder/templates/";},
    templatePath: function(){return this.rootTemplatePath()  + this.language + "/";},
    routerTemplatePath:function(){return this.templatePath() + "/router/"},
    dbTemplatePath:function(){return this.templatePath() + this.dbType + "/"},

    buildBaseParams: function(){
        return {
            appName: this.appName,
            moduleName:this.module,
            controllerName: this.module + "." + this.module + "Controller",
            viewName:  this.module + "." + this.module + "MainView",

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
    var moduleFile   = config.routerPath() + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};




function createSOARouters(modules){

    var params = config.buildBaseParams();
    params.modules = modules;

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
                oldrouters.push(lines[line] +"\r\n");
            }
        }
        params.oldrouters = oldrouters
    }else{params.oldrouters = []}


    //create header part.
    var filename = "soa_router.js";
    var tFilename =  "soa_router_module.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = config.routerPath() + filename;
    codeTools.generateCode(templateFile,params,moduleFile);

}

function generateModule(moduleName,moduleDefine){
    createModuleDatabaseModel(moduleName,moduleDefine);
    createModuleSOAs(moduleName,moduleDefine);
    var defines = store.getDefines();
    createSOARouters(defines.modules);
}
function generateModuleDirectories(moduleName){

    codeTools.createDirectory(config.serverRootPath());
    codeTools.createDirectory(config.serverModelPath());
    codeTools.createDirectory(config.soaPath());
    codeTools.createDirectory(config.routerPath());

}
function generateFramework(){
    generateModuleDirectories();
}

function initPathEnv(){
    var currentPath =  process.cwd() + "/";
    console.log(currentPath);
    config.rootPath = currentPath;
    store.opendb(config.rootModulePath());
}

function generateServerByDB(){
    initPathEnv();
    generateFramework();
    var defines = store.getDefines();
    console.log('modules defines:' + JSON.stringify(defines));
    for (var index in defines.Definedmodules)
    {
        var mdefine = defines.Definedmodules[index];
        generateModule(mdefine.name,mdefine.fields);
    }


}
function addModuleByDefine(moduleName,mdefine){
    initPathEnv();
    if (!store.hasModule(moduleName)){
        store.addModuleDefine(moduleName,mdefine);
    }else{
        console.log("MODULE:[" + moduleName + "] already exists");
        return;
    }
    config.module = moduleName.toLowerCase();
    generateModule(moduleName,mdefine);

}

function syncModulesByFiles(){
    var mPath = config.rootModulePath() + "/";
    var files = fs.readdirSync(mPath);
    files.forEach(function(file){
        var filePath = mPath + file;
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()){;

            var  mdefine = require(filePath);
            if (!mdefine.name){return;}
            console.log(filePath);
            var moduleName = file;
            addModuleByDefine(moduleName,mdefine);
        }
    });
}

function generateServer(config){
    if (!config||config=='db'){
        generateServerByDB();
        console.log("generated code by json database config\n");
    }else{
        syncModulesByFiles();
        console.log("generated code by define file in modules directory\n");
    }
}

exports.generateServer = generateServer;
exports.addModuleByDefine = addModuleByDefine;


