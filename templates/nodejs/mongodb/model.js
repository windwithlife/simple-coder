/**
 * Created by Administrator on 2016/4/11.
 * 文章标签对象
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;


var <%=data.moduleName %>Schema = new Schema({

    <% data.columns.forEach(function (col) {
            var dname = col.name;
            var dtype = col.type;
            var mtype = "String";
            if (dtype == 'int') {
                mtype = "Number";
            } else if (dtype == 'string') {
                mtype = "String";
            } else if (dtype == 'date') {
                mtype = "{ type: Date, default: Date.now }";
            };

            if (dname == '_id') {
                mtype = "{type: String,unique: true,'default': shortid.generate}";
            };%>
            <%-dname %> :<%-mtype %>,
            <%});%>

});


var <%=data.moduleName%> = mongoose.model("<%=data.moduleName%>",<%=data.moduleName%>Schema,"<%=data.moduleName%>");

module.exports = <%=data.moduleName %>;

