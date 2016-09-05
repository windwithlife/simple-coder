/**
 * Created by ctrip on 15/12/16.
 */


define(['simple'], function (Simple) {


    function XWebSocket(){
        this.socket = null;
        this.WebSocket = null;
    }

    XWebSocket.prototype.sendMessage= function(msg){
        if (null === this.WebSocket) {
            return;
        }
        if (this.socket.readyState == WebSocket.OPEN) {

            this.socket.send(msg);
        } else {
            alert("WebSocket 连接没有建立成功！");
        }
    };
    XWebSocket.prototype.connection= function(port, callback){
        var result ={
            msgType:"",
            code: 0,
            msg:""
        };

        if(!window.WebSocket){

            window.WebSocket = window.MozWebSocket;
        }
        this.WebSocket = window.WebSocket;
        if (null===this.WebSocket){
            this.WebSocket = window.MozWebSocket;
            result.msg = "您的浏览器不支持WebSocket协议！";
            callback(result);
        }
        //this.WebSocket = WebSocket;
        this.socket = new WebSocket("ws://121.196.221.190:8000/websocket");
        this.socket.onopen = function (event) {
            result.msg =  "打开WebSoket 服务正常，浏览器支持WebSoket!" + "\r\n";
            result.msgType ="OpenConnection";
            callback(result);
        };

        this.socket.onclose = function (event) {
            result.msg =  "WebSocket 关闭" + "\r\n";
            result.msgType ="CloseConnection";
            callback(result);
        };
        this.socket.onmessage = function(event){

            result.msg =  event.data+"\r\n";
            result.msgType ="Recieved Data ";
            callback(result);
        };
    };

    return new XWebSocket();

});

