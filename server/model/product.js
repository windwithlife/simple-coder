/**
 * Created by Administrator on 2016/4/11.
 * 文章标签对象
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;


var productSchema = new Schema({

    
            _id :{type: String,unique: true,'default': shortid.generate},
            
            name :String,
            
            sex :Number,
            
            age :Number,
            

});


var product = mongoose.model("product",productSchema,"product");

module.exports = product;

