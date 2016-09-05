/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','websocket','text!/iot/templates/list.html','xnavigator'], function (Simple,wsocket,tpl,xNavigator) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {
            'click #btnSend' : 'sendMessage',
            'click #btnBind' : 'bindDevice',
            'click #listBack': 'back',
        },
        render: function(){

        },

        onLoad: function () {
            var params = {text:"hello list template",title:"list"};
            this.$el.append(tpl);
            this.els ={
                main:this.$el.find("#container"),
                test:this.$el.find("#testContainer")
                };

            this.template = _.template($("#MainTemplate").html());
            this.testTpl  = _.template($("#TestTemplate").html());
            this.$el.html(this.template(params));
            this.$el.find("#testContainer").html(this.testTpl(params));


        },
        onShow: function () {

        },
        back:function(){
            xNavigator.back();
            console.log('list back done');
        },
        sendMessage: function(){
            var message = {
                command:  $('#command').val(),
                deviceId: $('#deviceId').val(),
                cmd:      $('#control-cmd').val()
            };
            //alert(JSON.stringify(message));
            wsocket.sendMessage(JSON.stringify(message));
            //this.socket.send(message);
        },
        bindDevice: function(){
            alert('start bindDevice');
        }


    });




    return new page();

});
