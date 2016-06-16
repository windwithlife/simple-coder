/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','text!./templates/edit.html','router','homeModel'], function (Simple,tpl,router,homeModel) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {
            'click .btn-saveUpdate' : 'saveUpdate',
            'click #listBack': 'back',
        },
        render: function(){

        },

        onLoad: function () {
           // var params = {text:"hello list template",title:"list"};
            this.$el.append(tpl);
            this.template = _.template($("#MainTemplate").html());
            var that = this;
            var p = Simple.P("_id");
            console.log("_id:" + p);
            homeModel.queryById({_id:p},function(data){
                var params = {};params.data = data.data;
                that.$el.html(that.template(params));
            })
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
            
                params._id = $("#edit-_id").val();
            
                params.name = $("#edit-name").val();
            
                params.sex = $("#edit-sex").val();
            
                params.age = $("#edit-age").val();
            
            console.log(JSON.stringify(params));
            homeModel.update(params,function(result){
                 console.log("updateSave result:" + JSON.stringify(result));
                if(result.success){
                    router.goto("");
                }
            });
        }
    });




    return new page();

});
