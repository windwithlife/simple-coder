#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var prompt = require('prompt');
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
    case '-g':
        if (!commands[1]) {
            console.error(
                'Usage: simple-coder -g [options] [--verbose] \n'+
                    '[options]: \n'+
                "server-nodejs: create nodejs server code \n"+
                "server-java: create nodejs server code \n"+
                "js-web: create nodejs server code \n" +
                "js-react: create nodejs server code \n"
            );
            process.exit(1);
        } else {
            generator(commands[1], argv.indexOf('--verbose')>-1);
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

function init(name, verbose) {
    if (fs.existsSync(name)) {
        createAfterConfirmation(name, verbose);
    } else {
        createProject(name, verbose);
    }
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
        'in progress to setup package.json ....',
        root
    );

    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }

    var customConfig = {
        name: projectName,
        version: '0.0.1',
        private: true,
        scripts: {
            "start": "node node_modules/react-native/local-cli/cli.js start",
            "ios": "node node_modules/react-native/local-cli/cli.js run-ios",
            "android": "node node_modules/react-native/local-cli/cli.js run-android",
            "web": "node node_modules/moles-web/local-cli/cli.js start web/webpack.config.js",
            "bundle-web": "node node_modules/moles-web/local-cli/cli.js build web/webpack.config.js",
            "bundle-ios": "node node_modules/react-native/local-cli/cli.js bundle --entry-file index.ios.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false",
            "bundle-android": "node node_modules/react-native/local-cli/cli.js bundle --entry-file index.android.js --bundle-output ./android/bundle/index.android.jsbundle --platform android --assets-dest ./android/bundle --dev false"
        }

    };
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(customConfig, null, 4));
    process.chdir(root);

    console.log('Installing simple-react ...');
    run(root, projectName, verbose);
}

function run(root, projectName, verbose) {

    //安装react-native
    verboseCommand =  verbose ? ' --verbose':'';
    var install = spawn(NPM, ['install', '--verbose', '--save','simple-coder'], {stdio: 'inherit'});
    install.on('close', function (code) {
        if (code !== 0) {
            console.error('`npm install --save react-native` failed');
            console.error(code)
            return;
        }

        //生成ReactNative
        exec('node node_modules/simple-coder/coder.js init '+projectName + verboseCommand, function(e, stdout, stderr){
            if (e) {
                console.error('generate react-native project failed');
                console.error(e)
                process.exit(1);
            }
            stderr && console.warn(stderr);


        });
    });
}
function generator(cmdOptions, verbose) {

    //生成代码
    verboseCommand =  verbose ? ' --verbose':'';
    //生成ReactNative
    exec('node node_modules/simple-coder/coder.js -g '+cmdOptions + verboseCommand, function(e, stdout, stderr){
        if (e) {
            console.error('generate code failed');
            console.error(e)
            process.exit(1);
        }
        stderr && console.warn(stderr);


    });

   
}

console.log("hello,simple-coder.....!");