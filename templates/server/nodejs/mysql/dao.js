/**
 * Created by Administrator on 2015/4/15.
 * 文章标签对象
 */
var connection = require('../database/db-manager').getConnection();
var tableName =  "<%=data.moduleName%>";
function buildWhereParams(params){
    var strCondition = " where ";
    var conditionCount = 0;
    params.forEach(function(field){
        conditionCount++;
        if (conditionCount > 1)
        {
            strCondition = strCondition + "and" + field + "=" + params[field];
        }else{
            strCondition = strCondition + field + "=" + params[field];
        }
    });
    return strCondition;
}

function buildUpdateParams(params){
    var strUpdate = " set ";
    var conditionCount = 0;
    params.forEach(function(field){
        conditionCount++;
        if (conditionCount > 1)
        {
            strUpdate = strUpdate + "," + field + "=" + "?";
        }else{
            strUpdate = strUpdate + field + "=" +  "?";
        }
    });
    return strUpdate;
}


function ParseValueWhere(params,where){
    var cols = [],values = [],vPositions= [];

    params.forEach(function(field){
       cols.push(field);
       values.push(params[field]);
        vPositions.push("?");
    });
    return {
        where:buildWhereParams(where),
        insertSql: "insert into " + tableName + " (" + cols.toString() +  ") " + " values" + "(" + vPositions.toString() + ")",
        insertValues:values,
        updateSql:"update " + tableName +  buildUpdateParams(params) +  buildWhereParams(where),
        updateValues:values,
        removeSql: "delete from " +tableName + buildWhereParams(where),
        querySql:"select * from " + tableName + buildWhereParams(where)
    }

}

var dao = {
    find: function(params,callback){
              connection.query(ParseValueWhere(null,params).querySql, function(err, rows) {
                  callback(err,rows);
              });
          },
    findOne: function(params,callback){
        connection.query(ParseValueWhere(null,params).querySql, function(err, rows) {
            callback(err,rows);
        });
    },
    update: function(params,where,callback){
        var sql = ParseValueWhere(params,where);
        connection.query(sql.updateSql,sql.updateValues, function(err, rows) {
            callback(err,rows);
        });
    },
    remove: function(params,callback){
        var sql = ParseValueWhere(null,params);
        connection.query(sql.removeSql, function(err, rows) {
            callback(err,rows);
        });
    },
    create: function(params,callback){
        var sql = ParseValueWhere(params);
        connection.query(sql.insertSql, sql.insertValues,function(err, rows) {
            callback(err,rows);
        });
    },

}



module.exports = dao;

