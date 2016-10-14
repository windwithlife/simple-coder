/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','text!./templates/edit2.html','router','homeModel'], function (Simple,tpl,router,homeModel) {

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
            var p = Simple.P("id");
            console.log("id:" + p);
            homeModel.queryById({id:p},function(data){
                var params = {};params.data = data;
                that.$el.html(that.template(params));
            })
        },
        onShow: function () {

        },
        back:function(){
        	router.back();
            console.log('list back done');
        },
        saveUpdate: function(){
            //alert("saveUPdate!");
        	 var params = {};
        	 params.id = $("#save-id").val();
             params.picid = $("#add-pic-id").val();
             params.pic = $("#add-pic").val();
             params.des = $("#add-desc").val();
             params.name = $("#add-name").val();
             params.model = $("#add-model").val();
            
            console.log(JSON.stringify(params));
            homeModel.update(params,function(result){
                 console.log("updateSave result:" + JSON.stringify(result));
                if(result){
                    router.goto("");
                }
            });
        }
    });




    return new page();

});
