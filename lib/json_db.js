/**
 * Created by zhangyq on 2016/5/1.
 */

var path = require('path');
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');

var db = {};


function opendb(dbPath){
    if (!dbPath) {dbPath="./"}
    var dbfile = path.join(dbPath,"db.json");
    console.log("-------database path directory:" + JSON.stringify(dbfile));
    db = low(dbfile, {
        storage: fileAsync
    })
}
function getDefines(){

    var params = db.read().value();
    console.log("[defines]:" + JSON.stringify(params));
    return params;
}
function addModuleDefine(filename,mdefine){
    db.get("Definedmodules").push({filename:mdefine}).value();
}
function hasModule(module){
    return db.has("Definedmodules." +module).value();
}
//getDefines("./");
exports.opendb = opendb;
exports.getDefines = getDefines;
exports.hasModule = hasModule;
exports.addModuleDefine = addModuleDefine;



