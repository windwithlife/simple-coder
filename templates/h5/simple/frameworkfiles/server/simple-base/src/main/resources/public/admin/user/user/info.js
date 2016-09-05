/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','text!./templates/info.html','router','homeModel'], function (Simple,tpl,router,homeModel) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {
            'click .btn-back2main' : 'back',
           
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
        }
       
    });




    return new page();

});
