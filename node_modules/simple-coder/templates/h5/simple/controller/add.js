/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','text!./templates/add.html','router','homeModel'], function (Simple,tpl,router,homeModel) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {
            'click .btn-saveAddNew' : 'saveUpdate',
            'click #listBack': 'back',
        },
        render: function(){

        },

        onLoad: function () {
           // var params = {text:"hello list template",title:"list"};
            this.$el.append(tpl);
            this.template = _.template($("#MainTemplate").html());
            var that = this;
            that.$el.html(that.template({}));
        },
        onShow: function () {

        },
        back:function(){
            xNavigator.back();
            console.log('list back done');
        },
        saveUpdate: function(){
            //alert("saveUPdate!");
            var params = {};
            <%
            var  columns = [];
            for (var field in data.moduleDefine){
                var fieldName = data.moduleDefine[field].dName;
                var keyName = field;
                if (field == "_id"){
                    continue;
                }
            %>
                params.<%=keyName%> = $("#add-<%=keyName%>").val();
            <%}%>
            console.log("form data value:" +　JSON.stringify(params));
            homeModel.add(params,function(result){
                 console.log("AddNewSave result:" + JSON.stringify(result));
                if(result.success){
                    router.goto("");
                }
            });
        }
    });




    return new page();

});
