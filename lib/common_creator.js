var path = require('path');
var fs = require('fs');
var codeTools = require('./code_tools');
var store = require('./json_db');
var coder = require('./generators/web_creator');
var generatorList = [];
var moduleDefines = {basePackage:"com.simple.bz",enables: [], modules: {}};

var config = {
    rootPath: "",
    rootModulePath: function () {
        return this.rootPath + "/modules/";
    },
    rootGeneratorsPath: function () {
        return this.rootPath + "node_modules/simple-coder/lib/generators/";
    },
};

function loadModulesDefinesByFiles() {

    var mPath = config.rootModulePath();
    var files = fs.readdirSync(mPath);
    files.forEach(function (file) {
        var filePath = mPath + file;
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()) {
            var mdefine = require(filePath);
            if (!mdefine.name) {
                return;
            }
            console.log(filePath);
            var moduleName = mdefine.name;
            moduleDefines.modules[moduleName] = mdefine;
        }
    });

    var setting = require(mPath + "config");
    moduleDefines.enables = setting.enables;
    moduleDefines.basePackage = setting.basePackage;
}


function findGeneratorByName(name) {
    var foundGenerator;
    generatorList.forEach(function (generator) {
        if (generator.coderDefine.name == name) {
            foundGenerator = generator;
            return;
        }
    });

    return foundGenerator;
}
function generatorPromptMsg(name) {
    var msg = 'Usage:\n';
    generatorList.forEach(function (generator) {
        var cmd = generator.coderDefine.name;
        var desc = generator.coderDefine.name;
        msg = msg + "Command:[" + cmd + "] --Function:" + desc + "\n";
    });

    return msg;
}

function loadGenerators() {
    var mPath = config.rootGeneratorsPath();
    var files = fs.readdirSync(mPath);
    files.forEach(function (file) {
        var filePath = path.join(mPath, file);
        console.log("generater file:" + filePath);
        var stats = fs.statSync(filePath);
        if (!stats.isDirectory()) {
            var generator = require(filePath);
            if (!generator.coderDefine) {
                return;
            }
            if (!generator.coderDefine.name) {
                return;
            }
            generatorList.push(generator);
        }
    });
}
function initGenerators() {
    initPathEnv();
    loadGenerators();
    loadModulesDefinesByFiles();

}
function initPathEnv(projectName) {
    var currentPath = process.cwd() + "/";

    console.log("currentPath is:" + currentPath);
    config.rootPath = currentPath;
}

function initProject(projectName) {
    initGenerators();
    moduleDefines.enables.forEach(function (moduleName) {
        generator.initEnv(moduleDefines);
    });
    console.log("init project");
}
function generateCode(cmdOption, config, verbose) {
    initGenerators();

    var generator = findGeneratorByName(cmdOption);
    if (!generator) {
        return;
    }

    generator.generateFramework(moduleDefines);


    moduleDefines.enables.forEach(function (moduleName) {
        generator.generateModuleByName(moduleName, moduleDefines.modules);
    });
    console.log("generated code by define file in modules directory\n");

}

exports.generateCode = generateCode;
exports.generatorPromptMsg = generatorPromptMsg;
exports.initProject = initProject;





