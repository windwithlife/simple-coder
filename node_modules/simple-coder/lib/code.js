#!/usr/bin/env node

/**
 * Module dependencies.
 */
var path = require('path');
var fs   = require('fs');
var codeTools = require('./code-generator');
//var processor = require('processor');


var config = {
    appName : "",
    module: "",
    basePath: "../web/manage/",
    h5BasePath:"../web/",
    h5LayoutBasePath:"../views/common/application/",

    //paths for dest templates files,
    templatePath: "./templates/",
    extjsTemplatePath: function(){return this.templatePath + "extjs/";},
    h5BaseTemplatePath: function(){return this.templatePath + "simple/";},
    languagePath : "nodejs",
    languageTemplatePath : function () { return this.templatePath + this.languagePath; },

    viewTemplatePath:function(){return this.extjsTemplatePath() + "view/"},
    controllerTemplatePath:function(){return this.extjsTemplatePath() + "controller/"},
    storeTemplatePath:function(){return this.extjsTemplatePath() + "store/"},
    modelTemplatePath:function(){return this.extjsTemplatePath() + "model/"},
    mongoTemplatePath:function(){return this.languageTemplatePath() + "/mongodb/"},
    routerTemplatePath:function(){return this.languageTemplatePath() + "/router/"},
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
    modelPath: function(){return this.basePath  + "/model/" + this.module + "/";},

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
    var  mainDefine = require('./modules/main');
    var Params = {};
    Params.appName = mainDefine.all.appName;
    Params.webRoot  = mainDefine.all.webRoot;
    Params.modules  =  mainDefine.all.modules;
    Params.channels  = mainDefine.all.channels;
    var modules =Params.modules;
    Params.Definedmodules = {};
    for(var i=0; i < modules.length; i++){
       var moduleName = modules[i];
        var moduleDefine = require('./modules/' + moduleName).moduleDefine;
        Params.Definedmodules[moduleName] = moduleDefine;

    }
    return Params;
}




function createViewPortAndFramework(Defines){
    //create ViewPort file
    var viewPort = 'ViewPort.js';
    var templateFile = config.viewTemplatePath() + viewPort ;
    var moduleFile   = config.viewPath() + viewPort;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

    //create ViewPort file
    var menu = 'AccordionMainMenu.js';
    templateFile = config.viewTemplatePath() + menu ;
    moduleFile   = config.viewPath() + menu;
    codeTools.generateCode(templateFile,params,moduleFile);

    var menuController = 'AccordionMainMenu.js';
    templateFile = config.controllerTemplatePath() + menuController ;
    moduleFile   = config.controllerPath() + menuController;
    codeTools.generateCode(templateFile,params,moduleFile);

    var menuStore = 'MenuStore.js';
    templateFile = config.storeTemplatePath() + menuStore ;
    moduleFile   = config.storePath() + menuStore;
    var channels = Defines.channels;
    var Menus = [];
    for (var k=0; k< channels.length; k++){
        var group =  channels[k];
        var menuGroup = {
            text:group.name,
            icon:"",
            expanded:true,
            items:[],
        };
        var subItems = group.children;
        for(var i=0; i< subItems.length; i++){
            var subItem = subItems[i];
            var menuItem = {
                text: subItem.name,
                module:subItem.module,
                icon:"",
                leaf:true,
                pid : subItem.module + i,
                glyph : 0xf0ce,
            };
            menuGroup.items.push(menuItem);
        }
        Menus.push(menuGroup);
    }

    params.menus = JSON.stringify(Menus);
    console.log(JSON.stringify(Menus));
    codeTools.generateCode(templateFile,params,moduleFile);

    //create ViewPort file
    var menu = 'Header.js';
    templateFile = config.viewTemplatePath() + menu ;
    moduleFile   = config.viewPath() + menu;
    codeTools.generateCode(templateFile,params,moduleFile);

    var menu = 'South.js';
    templateFile = config.viewTemplatePath() + menu ;
    moduleFile   = config.viewPath() + menu;
    codeTools.generateCode(templateFile,params,moduleFile);

    var menu = 'TabPanel.js';
    templateFile = config.viewTemplatePath() + menu ;
    moduleFile   = config.viewPath() + menu;
    codeTools.generateCode(templateFile,params,moduleFile);

}
function createModuleMainView(moduleName, moduleDefine){
    var filename = config.viewFileName();
    var tFilename = 'MainView.js';
    var templateFile = config.viewTemplatePath() + tFilename ;
    var moduleFile   = config.viewPath() + filename;
    var columns = [];
    for(var field in moduleDefine){
        var column = {
            header: moduleDefine[field].dName,
            dataIndex:field
        };

        columns.push(column);
    }
    var params = config.buildBaseParams();
    params.columns = columns;
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createModuleDatabaseModel(moduleName,moduleDefine){
    var filename = moduleName + ".js";
    var tFilename = 'model.js';
    var templateFile = config.templatePath +"nodejs/mongodb/" + tFilename ;
    var moduleFile   = __dirname + "/../models/" + filename;
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

    templateFile = config.templatePath +"nodejs/mysql/" + "dao.js" ;
    var moduleFile   = __dirname + "/../models/mysql/" + filename;
    codeTools.generateCode(templateFile,params,moduleFile);

};
function createModuleSOAs(moduleName,moduleDefine){
    var filename = moduleName + ".js";
    var tFilename = 'api.js';
    var templateFile = config.templatePath +"nodejs/router/" + tFilename ;
    var moduleFile   = __dirname + "/../routes/api/" + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};


function createModuleForm(moduleName, moduleDefine){
    var filename = config.formFileName();
    var tFilename = 'Form.js';
    var templateFile = config.viewTemplatePath() + tFilename ;
    var moduleFile   = config.viewPath() + filename;
    var params = config.buildBaseParams();
    var columns = [];
    for(var field in moduleDefine){
        var v =  moduleDefine[field];
        var column = {
            name:field,
            fieldLabel: v.dName,
        };


        if (v.type == 'int'){column.xtype =  "numberfield";column.allowNegative = false;}
        if (v.combo){
            column.xtype =  "combo";
            column.valueField= 'value';
            column.displayField = 'text';
        }
        if (field == "_id"){
            column.xtype= 'hidden';
        }
        columns.push(column);
    }
    params.columns = JSON.stringify(columns);
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createModuleController(moduleName, moduleDefine){
    var filename =  config.controllerFileName();
    var tFilename = 'Controller.js';
    var templateFile = config.controllerTemplatePath() + tFilename ;
    var moduleFile   = config.controllerPath() + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createModuleStore(moduleName, moduleDefine){
    var filename =  config.storeFileName();
    var tFilename = 'Store.js';
    var templateFile = config.storeTemplatePath() + tFilename ;
    var moduleFile   = config.storePath() + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createModuleModel(moduleName, moduleDefine){
    var filename =  config.modelFileName();
    var tFilename = 'Model.js';
    var templateFile = config.modelTemplatePath() + tFilename ;
    var moduleFile   = config.modelPath() + filename;
    //var params = config.buildBaseParams();
    var columns = [];
    for(var field in moduleDefine){
        var column = {
            name:field,
            type: moduleDefine[field].type,
        };

        columns.push(column);
    }
    var params = config.buildBaseParams();
    params.fields = columns;
    codeTools.generateCode(templateFile,params,moduleFile);
}

function generateModule(moduleName,Defines){

    createModuleDirectories();
    var moduleDefine =  Defines.Definedmodules[moduleName];
    createModuleMainView(moduleName,moduleDefine);
    createModuleController(moduleName, moduleDefine);
    createModuleForm(moduleName, moduleDefine);;

    createModuleStore(moduleName, moduleDefine);
    createModuleModel(moduleName, moduleDefine);
    createModuleDatabaseModel(moduleName,moduleDefine);
    createModuleSOAs(moduleName,moduleDefine);
    //createModuleH5(moduleName,moduleDefine);
}

function createModuleH5Framework(Defines){
    var filename =  "accordion-menu.ejs";
    var tFilename = filename;
    var templateFile = config.h5LayoutTemplatePath() + tFilename ;
    var moduleFile   = config.h5LayoutPath() + filename;
    var params = config.buildBaseParams();
    params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);

    var filename =  "accordion-menu-outlook.ejs";
    var tFilename = filename;
    var templateFile = config.h5LayoutTemplatePath() + tFilename ;
    var moduleFile   = config.h5LayoutPath() + filename;
    var params = config.buildBaseParams();
    params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);


    var filename =  "navbar.ejs";
    var tFilename = filename;
    var templateFile = config.h5LayoutTemplatePath() + tFilename ;
    var moduleFile   = config.h5LayoutPath() + filename;
    var params = config.buildBaseParams();
    params.menus  = Defines.channels;
    codeTools.generateCode(templateFile,params,moduleFile);

    var filename =  "breadcrumb.ejs";
    var tFilename = filename;
    var templateFile = config.h5LayoutTemplatePath() + tFilename ;
    var moduleFile   = config.h5LayoutPath() + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createModuleH5HomeView(moduleName,moduleDefine){
    var filename =  "mainview.html";
    var tFilename = filename;
    var templateFile = config.h5ViewTemplatePath() + tFilename ;
    var moduleFile   = config.h5ViewPath() + filename;
    console.log("h5mainview file" + moduleFile);
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);
};
function createModuleH5EditViewAndController(moduleName,moduleDefine){
    var filename =  "edit.html";
    var tFilename = filename;
    var templateFile = config.h5ViewTemplatePath() + tFilename ;
    var moduleFile   = config.h5ViewPath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

     filename =  "edit.js";
     tFilename = filename;
     templateFile = config.h5ControllerTemplatePath() + tFilename ;
     moduleFile   = config.h5ControllerPath() + filename;
   // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createModuleH5AddNewViewAndController(moduleName,moduleDefine){
    var filename =  "add.html";
    var tFilename = filename;
    var templateFile = config.h5ViewTemplatePath() + tFilename ;
    var moduleFile   = config.h5ViewPath() + filename;
    var params = config.buildBaseParams();
    params.moduleDefine = moduleDefine;
    codeTools.generateH5Code(templateFile,params,moduleFile);

    filename =  "add.js";
    tFilename = filename;
    templateFile = config.h5ControllerTemplatePath() + tFilename ;
    moduleFile   = config.h5ControllerPath() + filename;
    // params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createModuleH5Controller(moduleName,moduleDefine){
    var filename =  "main.js";
    var tFilename = filename;
    var templateFile = config.h5ControllerTemplatePath() + filename;
    var moduleFile   = config.h5ControllerPath() + tFilename ;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createModuleH5Model(moduleName,moduleDefine){
    var filename =  "model.js";
    var tFilename = filename;
    var templateFile = config.h5ModelTemplatePath() + filename;
    var moduleFile   = config.h5ModelPath() + tFilename ;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

};

function createModuleH5ConfigRouter(moduleName,moduleDefine){
    var filename =  "require_config.js";
    var tFilename = filename;
    var templateFile = config.h5ConfigTemplatePath() + tFilename ;
    var moduleFile   = config.h5ConfigPath() + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);

     filename =  "router.js";
     tFilename = filename;
     templateFile = config.h5RouterTemplatePath() + tFilename ;
     moduleFile   = config.h5RouterPath() + filename;
    //var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
};
function createWebH5Directories(){
    createDirectory(config.h5BasePath);
    createDirectory(config.h5ControllerPath());
    createDirectory(config.h5ViewPath());
    createDirectory(config.h5ModelPath());
}
function generateh5Module(moduleName,Defines){

    //createDirectories();
    createWebH5Directories();
    var moduleDefine =  Defines.Definedmodules[moduleName];

    createModuleH5HomeView(moduleName, moduleDefine);
   // createModuleH5DetailView(moduleName,moduleDefine);
   createModuleH5Controller(moduleName, moduleDefine);
    createModuleH5Model(moduleName, moduleDefine);
   createModuleH5ConfigRouter(moduleName,moduleDefine);
    createModuleH5EditViewAndController(moduleName,moduleDefine);
    createModuleH5AddNewViewAndController(moduleName,moduleDefine);
   // createModuleH5Router(moduleName,moduleDefine);
}

function createSOARouters(modules){
    var filename = "soa_router.js";
    var tFilename =  "soa_router.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = __dirname + "/../routes/api/" + filename;
    //var params = config.buildBaseParams();

    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createWebRouters(modules){
    var filename = "auto_web_router.js";
    var tFilename =  "web_router.js";
    var templateFile = config.routerTemplatePath() + tFilename ;
    var moduleFile   = __dirname + "/../routes/pages/" + filename;
    var params = config.buildBaseParams();
    params.modules = modules;
    codeTools.generateCode(templateFile,params,moduleFile);
}
function createTestIndex(defines){
    var filename =  "index.html";
    var tFilename = 'index.html';
    var templateFile = config.extjsTemplatePath() + tFilename ;
    var moduleFile   = config.basePath + filename;
    var params = config.buildBaseParams();
    codeTools.generateCode(templateFile,params,moduleFile);
}
function generateApp(){
     var currentPath = __dirname + "/";
     console.log(currentPath);
     var defines = loadDefinedParams();
     var appName = defines.appName;
     var appPath = currentPath + defines.webRoot + appName + "/";
     config.basePath = appPath;
     config.templatePath = currentPath + config.templatePath;
    config.h5BasePath = currentPath + config.h5BasePath;
     config.appName  = defines.appName;
    createDirectory(appPath);
    createModuleDirectories();
    var modules =defines.modules;
    var controllers = [];
    for (var i =0; i < modules.length; i++){
        var controller = modules[i] + "." + modules[i] + "Controller";
        controllers.push(controller);
    }
    var tempFile = config.extjsTemplatePath() + 'app.js';
    var appFile = appPath + "app.js";

    console.log("source file" +　tempFile);
    codeTools.generateCode(tempFile, {appName:appName, controllers:controllers},appFile );

    createViewPortAndFramework(defines);
    createModuleH5Framework(defines);
    for(var i=0; i < modules.length; i++){
        config.module = modules[i];
        generateModule(modules[i],defines);
        generateh5Module(modules[i],defines)
    }
    createSOARouters(modules);
    createWebRouters(modules);
    //create test index.html
    createTestIndex(defines);
}
generateApp();


function createModuleDirectories(){
    codeTools.createDirectory(config.viewPath());
    codeTools.createDirectory(config.controllerPath());
    codeTools.createDirectory(config.storePath());
    codeTools.createDirectory(config.modelPath());
    console.log('--------------successful to create all directories-------------');
}
exports.generateModule = generateModule;
exports.generateApp = generateApp;

