/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','text!./templates/mainview.html','router','homeModel'], function (Simple,tpl,router,homeModel) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {

            'click .btn-row-remove' : 'removeRow',
            'click .btn-rows-remove' : 'removeRows',
            'click .checked-all-unchecked':'checkedAll',
            'click #listBack': 'back',
        },
        render: function(){

        },

        onLoad: function () {
           // var params = {text:"hello list template",title:"list"};
            this.$el.append(tpl);
            this.template = _.template($("#MainTemplate").html());



        },
        onShow: function () {
            var that = this;
            homeModel.query(function(data){
                var params = {};params.data = data.data;
                that.$el.html(that.template(params));
            })
        },
        back:function(){
           // xNavigator.back();
            console.log('list back done');
        },
        checkedAll:function(){
            var checked = false;
            if ($(".checked-all-unchecked").is(':checked')){
                checked = true;
            }
            $("input[name='checkbox']").each(function(){
                if (checked){
                    $(this).prop("checked",true);
                }else{
                    $(this).prop("checked",false);
                }
            });
        },
        removeRows:function(){
            var str="";
            $("input[name='checkbox']:checked").each(function(){
                str = str + $(this).val()+"|";
            });
            alert(str);
        },
        removeRow: function(event){
            var removeId = event.currentTarget.dataset.id;
            console.log("row data id:" + removeId);
            var that = this;
            homeModel.remove({_id: removeId}, function (data) {
                if (data.success){
                    console.log("successful to remove row");
                    that.onShow().bind(that);
                }else{
                    console.log("failed to remove row");
                }

            })
        }


    });




    return new page();

});
