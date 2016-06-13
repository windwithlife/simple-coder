

/**
 * Module dependencies.
 */

var path = require('path');
var fs   = require('fs');
var codeTools = require('./code_tools');



var config = {
    appName : "",
    module: "",
    rootPath: "",
    language : "nodejs",
    dbType:"mongodb",
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

    h5ViewTemplatePath:function(){return this.h5BaseTemplatePath() + "view/"},
    h5TemplateTemplatePath:function(){return this.h5BaseTemplatePath() + "template/"},
    h5RouterTemplatePath:function(){return this.h5BaseTemplatePath() + "router/"},
    h5ConfigTemplatePath:function(){return this.h5BaseTemplatePath() + "config/"},
    h5ControllerTemplatePath:function(){return this.h5BaseTemplatePath() + "controller/"},
    h5ModelTemplatePath:function(){return this.h5BaseTemplatePath() + "model/"},
    h5LayoutTemplatePath:function(){return this.h5BaseTemplatePath() + "layout/"},

    //paths for dest extjs js files,
    viewPath : function(){return  this.basePath + "/view/"  + this.module + "/";},
    controllerPath:function(){return this.basePath  + "/controller/"+ this.module + "/";},
    storePath:function(){return this.basePath  + "/store/" + this.module + "/"; },
    serverModelPath: function(){return this.basePath  + "/model/" + this.module + "/";},

    //paths for h5 channel files,
    h5ModulePath : function(){return  this.h5BasePath +  this.module + "/";},
    h5ControllerPath:function(){return  this.h5ModulePath();},
    h5TemplatePath:function(){return  this.h5ModulePath() + "templates/" },
    h5ViewPath : function(){return  this.h5TemplatePath();},
    h5ModelPath : function(){return  this.h5ModulePath() + "models/" },
    h5ConfigPath : function(){return  this.h5ModulePath(); },
    h5RouterPath : function(){return  this.h5ModulePath(); },
    h5LayoutPath : function(){return  this.h5LayoutBasePath;},

    viewFileName: function(){return this.module + "MainView.js"},
    controllerFileName: function(){ return this.module + "Controller.js"},
    formFileName: function(){ return this.module + "Form.js"},
    storeFileName: function(){return this.module + "Store.js"},
    modelFileName: function(){return this.module + "Model.js"},
    //Building the base setting params
    buildBaseParams: function(){
        return {appName: this.appName, moduleName:this.module,

            controllerName: this.module + "." + this.module + "Controller",
            storeName:  this.module + "." + this.module + "Store",
            modelName:  this.module + "." + this.module + "Model",
            viewName:  this.module + "." + this.module + "MainView",
            formName:  this.module + "." + this.module + "Form",
            xViewName: this.module + "MainView",
            xStoreName: this.module + "Store",
            xFormName: this.module + "Form",
        };
    }
};


function loadDefinedParams(){
    var  mainDefine = require('../modules/main');
    var Params = {};
    Params.appName = mainDefine.all.appName;
    Params.webRoot  = mainDefine.all.webRoot;
    Params.modules  =  mainDefine.all.modules;
    Params.channels  = mainDefine.all.channels;
    var modules =Params.modules;
    Params.Definedmodules = {};
    for(var i=0; i < modules.length; i++){
        var moduleName = modules[i];
        var moduleDefine = require('../modules/' + moduleName).moduleDefine;
        Params.Definedmodules[moduleName] = moduleDefine;

    }
    return Params;
}




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


function generateh5Module(moduleName,Defines){

    var moduleDefine =  Defines.Definedmodules[moduleName];
    //generateModuleDirectories(moduleName);
    createModuleDatabaseModel(moduleName,moduleDefine);
    createModuleSOAs(moduleName,moduleDefine);
}

function createSOARouters(modules){
    var filename = "soa_router.js";
    var tFilename =  "soa_router.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = config.routerPath() + filename;

    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}
//codeTools.createDirectory(appPath);
function generateModuleDirectories(moduleName){
    codeTools.createDirectory(config.serverModelPath());
    codeTools.createDirectory(config.soaPath());
    codeTools.createDirectory(config.routerPath());

}
function generateServer(){
    //var currentPath = __dirname + "/";
    var currentPath =  process.cwd() + "/";

    console.log(currentPath);
    var defines = loadDefinedParams();
    var appName = defines.appName;

    //var appPath = currentPath ;
    config.rootPath = currentPath;
    config.templatePath = currentPath + "node_modules/simple-coder/templates/";
    config.appName  = defines.appName;

    generateModuleDirectories();
    createSOARouters(modules);
    createTestIndex(defines);
    var modules =defines.modules;
    for(var i=0; i < modules.length; i++){
        config.module = modules[i];
        generateh5Module(modules[i],defines)
    }


}

exports.generateServer = generateServer;


