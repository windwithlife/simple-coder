#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var xcoder = require('./lib/server_creator');




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
                'Usage: simple-coder init <ProjectName> [--verbose]'
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

function init(name, verbose) {
   console.log('initialize the project env!');
}


function generator(cmdOptions,config, verbose) {

    //生成代码
    verboseCommand =  verbose ? ' --verbose':'';
    switch (cmdOptions) {
        case 'server-nodejs':
            xcoder.generateServer(config);
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
}
