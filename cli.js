#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var prompt = require('prompt');
var xtools = require('./lib/xtools');


var NPM = (process.platform === 'win32') ? 'npm.cmd' : 'npm';

//程序启动代码
var argv = process.argv;
var commands = argv.slice(2);

if (commands.length === 0) {
    console.error(
        'Please pass command params, [init] or [clean]'
    );
    process.exit(1);
}

switch (commands[0]) {
    case 'init':
        if (!commands[1]) {
            console.error(
                'Usage: simple-react init <ProjectName> [--verbose]'
            );
            process.exit(1);
        } else {
            init(commands[1], argv.indexOf('--verbose')>-1);
        }
        break;
    case 'init-java':
        initJava(argv.indexOf('--verbose')>-1);
        break;
    case '-g':
        if (!commands[1]) {
            console.error(
                'Usage: simple-coder -g [options] [--verbose] \n'+
                    '[options]: \n'+ getGenerator().usage()
            );
            process.exit(1);
        } else {
            generator(commands[1], commands[2],argv.indexOf('--verbose')>-1);
        }
        break;
    case 'clean':
        //cleanBoilerplate();
        break;
    default:
        console.error(
            'Command `%s` unrecognized. ' +
            'Please visit Readme.md file'
        );
        process.exit(1);
        break;
}

function initJava(){
    var root = path.resolve(process.cwd(),'autocoder');
    var projectName = path.basename(root);
    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }
    process.chdir(root);
    var packageDir = path.join(__dirname,"package/");
    console.log("empty package is:" + packageDir);
    xtools.copyDir(packageDir,'./');
    var install = spawn(NPM, ['install', '--verbose', '--save','simple-coder'], {stdio: 'inherit'});
    install.on('close', function (code) {
        if (code !== 0) {
            console.error('`npm install --save simplecoder` failed');
            console.error(code)
            return;
        }

        xtools.copyDir('./node_modules/simple-coder/modules/', './modules/');
        //xtools.copyDir('./node_modules/simple-coder/package/','./');
        getGenerator().init(projectName);
    });
}

function init(name, verbose) {
    if (fs.existsSync(name)) {
        createAfterConfirmation(name, verbose);
    } else {
        createProject(name, verbose);
    }
}


//生成代码
function generator(projectType, config, verbose) {
    if ((!config)||(config=="--verbose")){config = "all"};
    var modulePath = path.resolve(process.cwd(), 'node_modules', 'simple-coder', 'coder.js');
    var mainGenerator =  require(modulePath);
    mainGenerator.generate(projectType,config,verbose);

}
//生成代码
function getGenerator() {
    var modulePath = path.resolve(process.cwd(), 'node_modules', 'simple-coder', 'coder.js');
    var mainGenerator =  require(modulePath);
    return mainGenerator;
}

function createAfterConfirmation(name, verbose) {
    prompt.start();

    var property = {
        name: 'yesno',
        message: 'Directory ' + name + ' already exists. Continue?',
        validator: /y[es]*|n[o]?/,
        warning: 'Must respond yes or no',
        default: 'no'
    };

    prompt.get(property, function (err, result) {
        if (result.yesno[0] === 'y') {
            createProject(name, verbose);
        } else {
            console.log('Project initialization canceled');
            process.exit();
        }
    });
}

function createProject(name, verbose) {
    var root = path.resolve(name);
    var projectName = path.basename(root);

    console.log(
        'in progress to setup package.json ....' + "root:" + root +"projectName:" + projectName
    );

    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }
    process.chdir(root);
    run(root, projectName, verbose);
}

function run(root, projectName, verbose) {

    console.log('run env is-----' + "[root]:" + root +" [projectName]:" + projectName);
    var packageDir = path.join(__dirname,"package/");
    console.log("empty package is:" + packageDir);
    xtools.copyDir(packageDir,'./');
    //安装simple-coder组件及其依赖库
    verboseCommand =  verbose ? ' --verbose':'';
    var install = spawn(NPM, ['install', '--verbose', '--save','simple-coder'], {stdio: 'inherit'});
    install.on('close', function (code) {
        if (code !== 0) {
            console.error('`npm install --save simplecoder` failed');
            console.error(code)
            return;
        }

        xtools.copyDir('./node_modules/simple-coder/modules/','./modules/');
        //xtools.copyDir('./node_modules/simple-coder/package/','./');
        var frontendDir = path.join(process.cwd(),"frontend");
        var serverDir = path.join(process.cwd(),"server");
        if (!fs.existsSync(frontendDir)) {
            fs.mkdirSync(frontendDir);
        }
        if (!fs.existsSync(serverDir)) {
            fs.mkdirSync(serverDir);
        }
        getGenerator().init(projectName);

    });
}



