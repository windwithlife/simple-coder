/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','websocket','text!/admin/iot/templates/test.html','router'], function (Simple,wsocket,tpl,router) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {
            'click #btnSend' : 'sendMessage',
            'click #btnBind' : 'bindDevice',
            'click #jumpToHome' : 'jumpHome',
        },
        jumpHome :function(){
            router.goto("list");
        },
        render: function(){

        },

        onLoad: function () {
            var params = {text:"hello my conditioner template",title:"TEST"};
            this.$el.append(tpl);
            this.els ={
                main:this.$el.find("#container"),
                test:this.$el.find("#testContainer")
                };

            this.template = _.template($("#MainTemplate").html());
            this.$el.html(this.template(params));

            //alert('this is ok in onlad()');
            //this.model.on('refresh', _.bind(this.showPerson,this));
            //this.bindSharkEvent();
            wsocket.connection(8000, function(msg){
                //alert(msg.msg);
                //$('#responseText').html("MessageType:" + msg.msgType + "\r\nMessageContent:" + msg.msg +"\r\n");
                $('#responseText').append("MessageType:" + msg.msgType + "\r\nMessageContent:" + msg.msg +"\r\n");
            });

        },
        onShow: function () {

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
           // alert('start bindDevice');
            console.log("bind device via webocket connection...");
            var message = {
                command:  $('#command').val(),
                deviceId: $('#deviceId').val(),
                cmd:      $('#control-cmd').val()
            };
            //alert(JSON.stringify(message));
            wsocket.sendMessage(JSON.stringify(message));
        }


    });




    return new page();

});
