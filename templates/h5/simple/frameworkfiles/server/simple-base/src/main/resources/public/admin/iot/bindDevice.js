/**
 * Created by zhangyq on 2015/9/15.
 */

define(['simple','websocket','text!/admin/iot/templates/bindDevice.html','router'], function (Simple,wsocket,tpl,router) {

    var page =Simple.PageView.extend({
        //model : new PersonModel(),
        el : '#controller',
        socket: null,
        template: null,
        events: {
            'click #btnSend' : 'testMessage',
            'click #btnBind' : 'bindDevice'

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


            wsocket.connection(8000, function(msg){
                //alert(msg.msg);
                $('#responseText').append("MessageType:" + msg.msgType + "\r\nMessageContent:" + msg.msg +"\r\n");
            });

        },
        onShow: function () {

        },
        testMessage: function(){
            var message = {
                command:  20001,
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
                command:  20001,
                deviceId: $('#deviceId').val(),
                cmd:      $('#control-cmd').val()
            };
            //alert(JSON.stringify(message));
            wsocket.sendMessage(JSON.stringify(message));
        }


    });




    return new page();

});
