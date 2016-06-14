/**
 * Created by Administrator on 2016/4/11.
 * 文章标签对象
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;


var userSchema = new Schema({

    

});


var user = mongoose.model("user",userSchema,"user");

module.exports = user;

