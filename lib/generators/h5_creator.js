
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
    platform:"pc",
    endName:"admin",
    serverLanguage:"nodejs",
    workRootPath: process.cwd(),
    targetRootPath:process.cwd(),
    language : "h5",
    framework:"simple",
    basePackage:"com.simple.base.bz",

    //targetServerJavaPath:function(){return path.join(this.targetRootPath,"/src/main/java/")  },
    targetServerJavaPath:function(){return path.join(this.targetRootPath,"/autocoder/src/server/")},
    targetServerJavaBZPath:function(){return path.join(this.targetServerJavaPath(),xtools.javaPackageToPath(this.basePackage))},
    //targetWebRootPath:function(){return path.join(this.targetRootPath, "/src/main/resources/auto/")},
    targetWebRootPath:function(){return path.join(this.targetRootPath, "/autocoder/src/frontend/")},
    targetWebSiteRootPath:function(){return path.join(this.targetRootPath, "/autocoder/src/website/")},
    //当前工作目录下的模块定义目录
    workModulesPath: function(){return path.join(this.workRootPath , "modules/")},

    //当前工作目录下的模板目录
    workTemplateRootPath:  function(){return path.join(this.workRootPath,"node_modules/simple-coder/templates/");},
    templatePath: function(){return this.workTemplateRootPath()  + this.language + "/" + this.framework + "/";},
    workConfigTemplatePath:function(){return this.templatePath() + "config/"},
    workRouterTemplatePath:function(){return path.join(this.templatePath() ,"/frontend/",this.platform,this.endName, "router/");},
    workViewTemplatePath:function(){return path.join(this.templatePath() ,"/frontend/",this.platform,this.endName, "view/");},
    workControllerTemplatePath:function(){return path.join(this.templatePath() ,"/frontend/",this.platform,this.endName, "controller/");},
    workModelTemplatePath:function(){return this.templatePath() + "model/"},
    workLayoutTemplatePath:function(){return this.templatePath() + "layout/"},
    workServerTemplatePath:function(){return this.templatePath() +  "server/"},
    workWebsiteRouterTemplatePath:function(){return this.templatePath() +  "router/"},
    workCopyFilesTemplatePath:function() {return this.templatePath() +  "frameworkfiles/"},

    workReleasePackageTemplatePath:function() {return path.join(this.templatePath() , "/frontend/","release/");},
    //web path define

    //代码生成目标目录---网站基本目录
    //targetWebSiteRootPath:function(){return path.join(this.targetWebRootPath(), "/website/")},
    targetWebSiteTemplateRootPath:function(){return path.join(this.targetWebSiteRootPath(),this.serverLanguage ,"/templates/")},
    targetWebSiteServerRootPath:function(){return path.join(this.targetWebSiteRootPath() ,this.serverLanguage, "/webserver/")},
    targetWebSiteControllerAndRouterRootPath:function(){return path.join(this.targetWebSiteRootPath() ,this.serverLanguage, "/controllers")},
    targetWebResourceRootPath:function(){return path.join(this.targetWebRootPath(), "resources/",this.platform, this.endName);},
    targetWebResourceFrameworkPath:function(){return path.join(this.targetWebRootPath(), "resources/" , "framework");},


    //代码生成目标目录---每个模块目录
    targetModuleRootPath:function(){return path.join(this.targetWebResourceRootPath(),this.module);},
    targetModuleModelPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/models/");},
    targetModuleRouterPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/");},
    targetModuleConfigPath:function(){return path.join(this.targetWebResourceRootPath(),this.module + "/");},
    targetModuleViewTemplatePath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/templates/");},
    targetModuleControllerPath:function(){return path.join(this.targetWebResourceRootPath(), this.module + "/");},

    //打包工具代码目录
    targetReleasePackagePath:function(){return path.join(this.targetWebRootPath(),  "/release/");},

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
    var templateFile = config.workLayoutTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleRouterPath() + filename;
    var params = config.buildBaseParams();
    //params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);

};
function createConfigRouter(moduleName,moduleDefine){
    var filename =  "require_config.js";
    var tFilename = filename;
    var templateFile = config.workConfigTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleConfigPath()+ filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

    filename =  "router.js";
    tFilename = filename;
    templateFile = config.workRouterTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleRouterPath() + filename;
    //var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};

function createClientConfigRouter(moduleName,moduleDefine){
    var filename =  "require_config.js";
    var tFilename = filename;
    var templateFile = config.workConfigTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleConfigPath()+ filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

    filename =  "router.js";
    tFilename = filename;
    templateFile = config.workRouterTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleRouterPath() + filename;
    //var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

    filename =  "webpack.config.js";
    tFilename = filename;
    templateFile = config.workReleasePackageTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleRouterPath() + filename;
    //var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};

function createReleasePackageFiles(){

    var filename =  "webpack.config.js";
    tFilename = filename;
    var releaseFilename = config.platform + "." +config.endName + "." +filename;
    var templateFile = config.workReleasePackageTemplatePath() + tFilename ;
    var moduleFile   =  config.targetReleasePackagePath() + releaseFilename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};

function createModel(moduleName,moduleDefine){
    var filename =  "model.js";
    var tFilename = filename;
    var templateFile = config.workModelTemplatePath() + filename;
    var moduleFile   = config.targetModuleModelPath() + tFilename ;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};
function createAddNewViewAndController(moduleName,moduleDefine){
    var filename =  "add.html";
    var tFilename = filename;
    var templateFile = config.workViewTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleViewTemplatePath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    filename =  "add.js";
    tFilename = filename;
    templateFile = config.workControllerTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleControllerPath() + filename;
    // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createEditViewAndController(moduleName,moduleDefine){
    var filename =  "edit.html";
    var tFilename = filename;
    var templateFile = config.workViewTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleViewTemplatePath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    filename =  "edit.js";
    tFilename = filename;
    templateFile = config.workControllerTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleControllerPath() + filename;
    // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};

function createInfoViewAndController(moduleName,moduleDefine){
    var filename =  "info.html";
    var tFilename = filename;
    var templateFile = config.workViewTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleViewTemplatePath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    filename =  "info.js";
    tFilename = filename;
    templateFile = config.workControllerTemplatePath() + tFilename ;
    moduleFile   = config.targetModuleControllerPath() + filename;
    // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createHomeViewAndController(moduleName,moduleDefine){
    var filename =  "home.html";
    var tFilename = filename;
    var templateFile = config.workViewTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleViewTemplatePath() + filename;
    console.log("h5mainview file" + moduleFile);
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    var filename =  "home.js";
    var templateFile = config.workControllerTemplatePath() + filename;
    var moduleFile   = config.targetModuleControllerPath() + filename ;
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createIndexViewAndController(moduleName,moduleDefine){
    var filename =  "index.html";
    var tFilename = filename;
    var templateFile = config.workViewTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleViewTemplatePath() + filename;
    console.log("h5mainview file" + moduleFile);
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    var filename =  "index.js";
    var templateFile = config.workControllerTemplatePath() + filename;
    var moduleFile   = config.targetModuleControllerPath() + filename ;
    codeTools.generateCode(templateFile,params,moduleFile);
};

function createWebRouters(modules){
    //需求调整测试路径
    var filename = "auto_web_router.js";
    var tFilename =  "web_router.js";
    var templateFile = config.workRouterTemplatePath() + tFilename ;
    var moduleFile   = config.targetModuleRouterPath() + "pages/" + filename;
    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createTestRouters(modules){
    var filename = "auto_web_router.js";
    var tFilename =  "web_router.js";
    var templateFile = config.workWebsiteRouterTemplatePath() + tFilename ;
    var moduleFile   = config.targetWebSiteServerRootPath() + filename;
    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}

function createServerBZModules(moduleName,moduleDefine){

    var mName = codeTools.firstUpper(moduleName);
    var templateFile = config.workServerTemplatePath() + "Entity.java" ;
    var targetFile   = config.targetServerJavaBZPath() + "entity/" + mName + ".java";
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    params.moduleName = mName;
    params.clsName = mName;
    params.originModuleName = moduleName;
    params.packageName = config.basePackage;
    params.firstUpper = codeTools.firstUpper;
    codeTools.generateCode(templateFile,params,targetFile);

    templateFile = config.workServerTemplatePath() + "Dao.java" ;
    //var clsName = nName + "Repository";
    targetFile   = config.targetServerJavaBZPath() + "dao/" + mName+"Repository.java";
    codeTools.generateCode(templateFile,params,targetFile);

    templateFile = config.workServerTemplatePath() + "Service.java" ;
    targetFile   = config.targetServerJavaBZPath() + "service/" + mName + "Service.java";
    codeTools.generateCode(templateFile,params,targetFile);


    templateFile = config.workServerTemplatePath() + "Controller.java" ;
    targetFile   = config.targetServerJavaBZPath() + "controller/" + mName + "Controller.java";
    codeTools.generateCode(templateFile,params,targetFile);
};
function createModuleBaseDirectories(moduleName){
    xtools.mkdirX(config.targetWebResourceRootPath());
    codeTools.createDirectory(config.targetModuleRootPath());
    codeTools.createDirectory(config.targetModuleViewTemplatePath());
    codeTools.createDirectory(config.targetModuleControllerPath());
    codeTools.createDirectory(config.targetModuleModelPath());
    codeTools.createDirectory(config.targetModuleRouterPath());
    codeTools.createDirectory(config.targetModuleConfigPath());
}
function generateFrameworkDirectories(){
    console.log("serverRootPath:" + config.targetRootPath + "webRootPath" + config.targetWebRootPath());
    xtools.mkdirX(config.targetServerJavaPath());
    xtools.mkdirX(config.targetServerJavaBZPath());
    xtools.mkdirX(config.targetServerJavaBZPath()+ 'entity');
    xtools.mkdirX(config.targetServerJavaBZPath()+ 'controller');
    xtools.mkdirX(config.targetServerJavaBZPath()+ 'service');
    xtools.mkdirX(config.targetServerJavaBZPath()+ 'dao');
    xtools.mkdirX(config.targetWebRootPath());
    xtools.mkdirX(config.targetWebSiteRootPath());
    xtools.mkdirX(config.targetWebSiteTemplateRootPath());
    xtools.mkdirX(config.targetWebSiteServerRootPath());
    xtools.mkdirX(config.targetWebSiteControllerAndRouterRootPath());

    xtools.mkdirX(config.targetWebResourceFrameworkPath());
    xtools.mkdirX(path.join(config.targetWebResourceRootPath(), '/common/'));

    xtools.mkdirX(config.targetReleasePackagePath());




}
function copyBaseFrameworkFiles(){
    var frameworkServerPath = path.join(config.workCopyFilesTemplatePath(), "apiserver/");
    xtools.copyDirEx(frameworkServerPath,config.targetRootPath);


}

function copyFrameworkFiles(){

    var frameworkPath = config.workCopyFilesTemplatePath() + "/website/nodejs/templates/";
    xtools.copyDirEx(frameworkPath,config.targetWebSiteTemplateRootPath());
    var frameworkThemePath = config.workCopyFilesTemplatePath() + "resources/framework";
    xtools.copyDirEx(frameworkThemePath,config.targetWebResourceFrameworkPath());
    var frameworkBinPath = config.workCopyFilesTemplatePath() + "/website/nodejs/webserver/";
    xtools.copyDirEx(frameworkBinPath,config.targetWebSiteServerRootPath());

}


function copyReleaseFrameworkFiles(){


    var frameworkReleasePath = config.workCopyFilesTemplatePath() + "/resources/release/";
    xtools.copyDirEx(frameworkReleasePath,config.targetReleasePackagePath());



}
function initPathEnv(defines){
    var currentPath = process.cwd();
    var serverRoot = "";
    if (currentPath.indexOf('autocoder')>-1){
        serverRoot = path.resolve(process.cwd(), '../');
    }else{
        serverRoot = path.join(process.cwd(), "server/java/");
    }

    config.workRootPath = currentPath;
    config.targetRootPath = serverRoot;
    config.basePackage = defines.basePackage;
    console.log("workRootPath:" + config.workRootPath + "Code-targetServerPath:" + config.targetRootPath);


}
function initProjectEnv(defines){
    initPathEnv(defines);
    copyBaseFrameworkFiles();
}

function generateFramework(defines){
    initPathEnv(defines);
    generateFrameworkDirectories();
    copyFrameworkFiles();
    copyReleaseFrameworkFiles();
    createTestRouters(defines.enables);

    config.endName='admin';
    config.platform='pc';
    createReleasePackageFiles();

    config.endName='admin';
    config.platform='mobile';
    createReleasePackageFiles();

    config.endName='web';
    config.platform='pc';
    createReleasePackageFiles();

    config.endName='client';
    config.platform='mobile';
    createReleasePackageFiles();



}

function generateModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleBaseDirectories(moduleName);
    createConfigRouter(moduleName,moduleDefine);
    createModel(moduleName,moduleDefine);
    createAddNewViewAndController(moduleName,moduleDefine);
    createEditViewAndController(moduleName,moduleDefine);
    createHomeViewAndController(moduleName,moduleDefine);
    createInfoViewAndController(moduleName,moduleDefine);
    //createServerBZModules(moduleName,moduleDefine);
}
function generateClientModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleBaseDirectories(moduleName);
    createClientConfigRouter(moduleName,moduleDefine);
    createModel(moduleName,moduleDefine);
    createAddNewViewAndController(moduleName,moduleDefine);
    createEditViewAndController(moduleName,moduleDefine);
    createHomeViewAndController(moduleName,moduleDefine);
    createInfoViewAndController(moduleName,moduleDefine);
    createIndexViewAndController(moduleName,moduleDefine);
}

function generateServerAPIModule(moduleName,moduleDefine){
    config.module = moduleName;
    createModuleBaseDirectories(moduleName);
    createServerBZModules(moduleName,moduleDefine);
}

function generateModuleByName(moduleName,defines){
    var mdefine = defines[moduleName];
    if (!mdefine){return;}
    console.log('module defines:' + JSON.stringify(mdefine));

    generateServerAPIModule(mdefine.name,mdefine.fields);

    config.endName='admin';
    config.platform='pc';
    generateModule(mdefine.name,mdefine.fields);

    config.endName='admin';
    config.platform='mobile';
    generateModule(mdefine.name,mdefine.fields);

    config.endName='web';
    config.platform='pc';
    generateClientModule(mdefine.name,mdefine.fields);

    config.endName='client';
    config.platform='mobile';
    generateClientModule(mdefine.name,mdefine.fields);

}
exports.generateFramework = generateFramework;
exports.generateModuleByName = generateModuleByName;
exports.initEnv = initProjectEnv;

exports.coderDefine = {name:"just-for-test",desc:"create a web framework and related project code"};


