

/**
 * Module dependencies.
 */

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
    rootTemplatePath:  function(){return this.rootPath +"/node_modules/simple-coder/templates/";},
    templatePath: function(){return this.rootTemplatePath()  + this.language + "/";},
    serverModelPath: function(){return this.serverRootPath()  + "/model/";},
    routerPath: function(){return this.serverRootPath()  + "/routes/";},
    soaPath:function(){return this.serverRootPath()  + "/apis/";},
    clientModelPath:function(){return this.clientRootPath()  + "/model/";},

    //templates path
    routerTemplatePath:function(){return this.templatePath() + "/router/"},
    dbTemplatePath:function(){return this.templatePath() + this.dbType + "/"},

    h5LayoutBasePath:"../views/common/application/",

    //paths for dest templates files,

    extjsTemplatePath: function(){return this.templatePath + "extjs/";},
    h5BaseTemplatePath: function(){return this.templatePath + "simple/";},

    languageTemplatePath : function () { return this.templatePath + this.languagePath; },


    mongoTemplatePath:function(){return this.languageTemplatePath() + "/mongodb/"},


    //paths for dest extjs js files,
    viewPath : function(){return  this.basePath + "/view/"  + this.module + "/";},
    controllerPath:function(){return this.basePath  + "/controller/"+ this.module + "/";},
    storePath:function(){return this.basePath  + "/store/" + this.module + "/"; },

    //paths for h5 channel files,
    //Building the base setting params
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


function createTestIndex(defines){
    var filename =  "index.html";
    var tFilename = 'index.html';
    var templateFile = config.extjsTemplatePath() + tFilename ;
    var moduleFile   = config.basePath + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
}



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

function generateModule(moduleName,moduleDefine,modules){
    createModuleDatabaseModel(moduleName,moduleDefine);
    createModuleSOAs(moduleName,moduleDefine);
    createSOARouters(modules);
}
function generateModuleDirectories(moduleName){

    codeTools.createDirectory(config.serverRootPath());
    codeTools.createDirectory(config.serverModelPath());
    codeTools.createDirectory(config.soaPath());
    codeTools.createDirectory(config.routerPath());

}
function generateServer(){

    var currentPath =  process.cwd() + "/";
    console.log(currentPath);
    config.rootPath = currentPath;
    store.opendb(config.rootModulePath());
    var defines = store.getDefines();
    console.log('modules defines:' + JSON.stringify(defines));
    var modules =defines.modules;
    generateModuleDirectories();

    for(var i=0; i < modules.length; i++){
        var moduleName = config.module = modules[i].toLowerCase();
        var moduleDefine =  defines.Definedmodules[moduleName];
        generateModule(moduleName,moduleDefine,defines.modules);

    }


}

function addModuleByFile(filename,channelName){
    var  mdefine = require(config.rootModulePath() + filename);
    var moduleName = filename;
    addModuleByJson(moduleName,mdefine);
}
function addModuleByJson(moduleName,mdefine){
    if (store.hasModule(moduleName)){
        return;
    }
    store.addModuleDefine(moduleName,mdefine);
    var defines = store.getDefines();
    //var defines = store.getDefines();
    config.module = moduleName.toLowerCase();
    generateModule(moduleName,mdefine,defines.modules);

}
exports.generateServer = generateServer;
exports.addModuleByFile = addModuleByFile;


