
var path = require('path');
var fs   = require('fs');
var codeTools = require('../code_tools');
var store = require('../json_db');
var xtools = require('../xtools');

var JavaTypeMap = {
    'string':'String',
    'int'   : 'int',
    'Long'  : 'Long'
};
var config = {
    appName : "",
    module: "",
    rootPath: "",
    serverRoot:"",
    language : "h5",
    framework:"simple",
    basePackage:"com.simple.base.bz",

    rootModulePath: function(){return this.rootPath +"/modules/";},
    serverRootPath:function(){return this.serverRoot + "/src/main/java/"},
    serverBZRootPath:function(){return this.serverRootPath()+ xtools.javaPackageToPath(this.basePackage)},
    webRootPath:function(){return this.serverRoot + "/src/main/resources/web/"},

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
    serverTemplatePath:function(){return this.templatePath() +  "server/"},
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
    //params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);

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

function createServerBZModules(moduleName,moduleDefine){

    var mName = codeTools.firstUpper(moduleName);
    var templateFile = config.serverTemplatePath() + "Entity.java" ;
    var targetFile   = config.serverBZRootPath() + "entity/" + mName + ".java";
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    params.moduleName = mName;
    codeTools.generateCode(templateFile,params,targetFile);

    templateFile = config.serverTemplatePath() + "Dao.java" ;
    //var clsName = nName + "Repository";
    targetFile   = config.serverBZRootPath() + "dao/" + mName+"Repository.java";
    codeTools.generateCode(templateFile,params,targetFile);

    templateFile = config.serverTemplatePath() + "Service.java" ;
    targetFile   = config.serverBZRootPath() + "service/" + mName + "Service.java";
    codeTools.generateCode(templateFile,params,targetFile);


    templateFile = config.serverTemplatePath() + "Controller.java" ;
    targetFile   = config.serverBZRootPath() + "controller/" + mName + "Controller.java";
    codeTools.generateCode(templateFile,params,targetFile);
};
function createModuleBaseDirectories(moduleName){
    codeTools.createDirectory(config.webResourcePath() +moduleName + "/");
    codeTools.createDirectory(config.viewPath());
    codeTools.createDirectory(config.controllerPath());
    codeTools.createDirectory(config.modelPath());
    codeTools.createDirectory(config.routerPath());
    codeTools.createDirectory(config.configPath());
}
function generateFrameworkDirectories(){

    xtools.mkdirX(config.serverRootPath());
    xtools.mkdirX(config.serverBZRootPath());
    xtools.mkdirX(config.serverBZRootPath()+ 'entity');
    xtools.mkdirX(config.serverBZRootPath()+ 'controller');
    xtools.mkdirX(config.serverBZRootPath()+ 'service');
    xtools.mkdirX(config.serverBZRootPath()+ 'dao');
    xtools.mkdirX(config.webRootPath());
    xtools.mkdirX(config.webViewPath());
    xtools.mkdirX(config.webResourcePath());
    xtools.mkdirX(config.webCommonPath());
    xtools.mkdirX(config.webLayoutPath());
    xtools.mkdirX(config.webBinPath());
}
function copyBaseFrameworkFiles(){
    var frameworkServerPath = config.templatePath() + "frameworkfiles/server/";
    xtools.copyDirEx(frameworkServerPath,config.serverRootPath());


}

function copyFrameworkFiles(){

    var frameworkPath = config.templatePath() + "frameworkfiles/views/";
    xtools.copyDirEx(frameworkPath,config.webViewPath());
    var frameworkThemePath = config.templatePath() + "frameworkfiles/themes/";
    xtools.copyDirEx(frameworkThemePath,config.webResourcePath() + "themes");
    var frameworkBinPath = config.templatePath() + "frameworkfiles/bin/";
    xtools.copyDirEx(frameworkBinPath,config.webBinPath());

}
function initPathEnv(){
    var currentPath = process.cwd() + "/";
    var serverRoot = "";
    if (currentPath.indexOf('autocoder')>-1){
        serverRoot = path.resolve(process.cwd() + "/", '../');
    }else{
        serverRoot = process.cwd()+ "/server/java/";
    }

    config.rootPath = currentPath;
    config.serverRoot = serverRoot;
    console.log("rootPath:" + config.rootPath + "serverPath:" + config.serverRoot);
    //store.opendb(config.rootModulePath());

}
function initProjectEnv(defines){
    initPathEnv();
    copyBaseFrameworkFiles();
}

function generateFramework(defines){
    initPathEnv();
    generateFrameworkDirectories();
    //createLayoutFramework(defines);
    copyFrameworkFiles();
    createTestRouters(defines.enables);
    //createWebRouters(defines.modules);

}

function generateModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleBaseDirectories(moduleName);
    createConfigRouter(moduleName,moduleDefine);
    createModel(moduleName,moduleDefine);
    createAddNewViewAndController(moduleName,moduleDefine);
    createEditViewAndController(moduleName,moduleDefine);
    createHomeViewAndController(moduleName,moduleDefine);
    createServerBZModules(moduleName,moduleDefine);

}
function generateModuleByDB(moduleName,defines){

    var mdefine = defines[moduleName];
    if (!mdefine){return;}
    console.log('module defines:' + JSON.stringify(mdefine));
    generateModule(mdefine.name,mdefine.fields);

}
function generateModuleByName(moduleName,defines){
    var mdefine = defines[moduleName];
    if (!mdefine){return;}
    console.log('module defines:' + JSON.stringify(mdefine));
    generateModule(mdefine.name,mdefine.fields);
}
exports.generateFramework = generateFramework;
exports.generateModuleByDB = generateModuleByDB;
exports.generateModuleByName = generateModuleByName;
exports.initEnv = initProjectEnv;

exports.coderDefine = {name:"h5",desc:"create a web framework and related project code"};


