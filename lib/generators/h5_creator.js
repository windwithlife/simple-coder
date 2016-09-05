
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var store = require('../json_db');
var xtools = require('../xtools');

var config = {
    appName : "",
    module: "",
    rootPath: "",
    language : "h5",
    framework:"simple",
    dbType:"mongodb",
    //root path define
    rootModulePath: function(){return this.rootPath +"/modules/";},
    serverRootPath:function(){return this.rootPath + "server/"},
    webRootPath:function(){return this.rootPath + "web/"},

    //web path define

    webRouterPath:function(){return this.webRootPath() + "routes/"},
    webViewPath:function(){return this.webRootPath() + "views/"},
    webBinPath:function(){return this.webRootPath() + "bin/"},
    webResourcePath:function(){return this.webRootPath() + "resource/"},
    webCommonPath:function(){return this.webViewPath() + "common/"},
    webLayoutPath:function(){return this.webViewPath() + "common/application/"},

    //resource path define
    modelPath:function(){return this.webResourcePath()  + this.module + "/models/";},
    routerPath:function(){return this.webResourcePath()  + this.module + "/";},
    configPath:function(){return this.webResourcePath()  + this.module + "/";},
    viewPath:function(){return this.webResourcePath()  + this.module + "/views/";},
    controllerPath:function(){return this.webResourcePath()  + this.module + "/controllers/";},
    //server directory define
    serverModelPath: function(){return this.serverRootPath()  + "/model/";},
    serverRouterPath: function(){return this.serverRootPath()  + "/routes/";},
    serverSoaPath:function(){return this.serverRootPath()  + "/apis/";},


    //templates path define
    rootTemplatePath:  function(){return this.rootPath +"/node_modules/simple-coder/templates/";},
    templatePath: function(){return this.rootTemplatePath()  + this.language + "/" + this.framework + "/";},
    configTemplatePath:function(){return this.templatePath() + "config/"},
    routerTemplatePath:function(){return this.templatePath() + "router/"},
    viewTemplatePath:function(){return this.templatePath() + "view/"},
    controllerTemplatePath:function(){return this.templatePath() + "controller/"},
    modelTemplatePath:function(){return this.templatePath() + "model/"},
    layoutTemplatePath:function(){return this.templatePath() + "layout/"},
    dbTemplatePath:function(){return this.templatePath() + this.dbType + "/"},

    //provider params to create all components
    buildBaseParams: function(){
        return {
            appName: this.appName,
            moduleName:this.module,
        };
    }
};



function createLayoutFramework(Defines){


    var filename =  "accordion-menu-outlook.ejs";
    var tFilename = filename;
    var templateFile = config.layoutTemplatePath() + tFilename ;
    var moduleFile   = config.webLayoutPath() + filename;
    var params = config.buildBaseParams();
    params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);

/*
    var filename =  "navbar.ejs";
    var tFilename = filename;
    var templateFile = config.layoutTemplatePath() + tFilename ;
    var moduleFile   = config.webLayoutPath() + filename;
    var params = config.buildBaseParams();
    params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);*/

};
function createConfigRouter(moduleName,moduleDefine){
    var filename =  "require_config.js";
    var tFilename = filename;
    var templateFile = config.configTemplatePath() + tFilename ;
    var moduleFile   = config.configPath()+ filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

    filename =  "router.js";
    tFilename = filename;
    templateFile = config.routerTemplatePath() + tFilename ;
    moduleFile   = config.routerPath() + filename;
    //var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createModel(moduleName,moduleDefine){
    var filename =  "model.js";
    var tFilename = filename;
    var templateFile = config.modelTemplatePath() + filename;
    var moduleFile   = config.modelPath() + tFilename ;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};
function createAddNewViewAndController(moduleName,moduleDefine){
    var filename =  "add.html";
    var tFilename = filename;
    var templateFile = config.viewTemplatePath() + tFilename ;
    var moduleFile   = config.viewPath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    filename =  "add.js";
    tFilename = filename;
    templateFile = config.controllerTemplatePath() + tFilename ;
    moduleFile   = config.controllerPath() + filename;
    // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createEditViewAndController(moduleName,moduleDefine){
    var filename =  "edit.html";
    var tFilename = filename;
    var templateFile = config.viewTemplatePath() + tFilename ;
    var moduleFile   = config.viewPath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    filename =  "edit.js";
    tFilename = filename;
    templateFile = config.controllerTemplatePath() + tFilename ;
    moduleFile   = config.controllerPath() + filename;
    // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createHomeViewAndController(moduleName,moduleDefine){
    var filename =  "mainview.html";
    var tFilename = filename;
    var templateFile = config.viewTemplatePath() + tFilename ;
    var moduleFile   = config.viewPath() + filename;
    console.log("h5mainview file" + moduleFile);
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    var filename =  "main.js";
    var templateFile = config.controllerTemplatePath() + filename;
    var moduleFile   = config.controllerPath() + filename ;
    codeTools.generateCode(templateFile,params,moduleFile);
};

function createWebRouters(modules){
    var filename = "auto_web_router.js";
    var tFilename =  "web_router.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = config.webRouterPath() + "pages/" + filename;
    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createTestRouters(modules){
    var filename = "auto_web_router.js";
    var tFilename =  "web_router.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = config.webBinPath() + filename;
    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}

function createModuleBaseDirectories(moduleName){
    codeTools.createDirectory(config.webResourcePath() +moduleName + "/");
    codeTools.createDirectory(config.viewPath());
    codeTools.createDirectory(config.controllerPath());
    codeTools.createDirectory(config.modelPath());
    codeTools.createDirectory(config.routerPath());
    codeTools.createDirectory(config.configPath());
}
function generateFrameworkDirectories(){

    codeTools.createDirectory(config.webRootPath());
    codeTools.createDirectory(config.webViewPath());
    codeTools.createDirectory(config.webRouterPath());
    //codeTools.createDirectory(config.webRouterPath()+"pages/");
    codeTools.createDirectory(config.webResourcePath());
    codeTools.createDirectory(config.webCommonPath());
    codeTools.createDirectory(config.webLayoutPath());
    codeTools.createDirectory(config.webBinPath());
}
function copyBaseFrameworkFiles(){
    var frameworkPath = config.templatePath() + "frameworkfiles/views/";
    xtools.copyDirEx(frameworkPath,config.webViewPath());
    var frameworkThemePath = config.templatePath() + "frameworkfiles/themes/";
    xtools.copyDirEx(frameworkThemePath,config.webResourcePath() + "themes");
    var frameworkBinPath = config.templatePath() + "frameworkfiles/bin/";
    xtools.copyDirEx(frameworkBinPath,config.webBinPath());
}
function initPathEnv(){
    config.rootPath = process.cwd() + "/";;
    store.opendb(config.rootModulePath());
}


function generateFramework(){
    initPathEnv();
    var defines = store.getDefines();
    generateFrameworkDirectories();
    createLayoutFramework(defines);
    createTestRouters(defines.modules);
    //createWebRouters(defines.modules);
    copyBaseFrameworkFiles();

}

function generateModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleBaseDirectories(moduleName);
    createConfigRouter(moduleName,moduleDefine);
    createModel(moduleName,moduleDefine);
    createAddNewViewAndController(moduleName,moduleDefine);
    createEditViewAndController(moduleName,moduleDefine);
    createHomeViewAndController(moduleName,moduleDefine);
}
function generateModuleByDB(moduleName){

    var mdefine = store.getModuleDefine(moduleName);
    if (!mdefine){return;}
    console.log('module defines:' + JSON.stringify(mdefine));
    generateModule(mdefine.name,mdefine.fields);

}

exports.generateFramework = generateFramework;
exports.generateModuleByDB = generateModuleByDB;

exports.coderDefine = {name:"h5",desc:"create a web framework and related project code"};


