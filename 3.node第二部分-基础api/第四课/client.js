// 引入net模块
let net = require('net');

// 创建socket
let socket = net.connect(12306, "127.0.0.1");  // 规定我要连接IP与端口



// client里的事件

// connect事件,链接上了服务器触发的事件
socket.on("connect",function(){
    console.log("客户端已连接");


    // client里面的一些属性:
    // 当我链接上的时候把他们打印出来
    console.log(socket.remoteAddress); // 远程(服务器)的地址
    console.log(socket.remotePort);    // 远程的端口
    console.log(socket.localAddress);  // 本地的地址
    console.log(socket.localAddress);  // 本地的端口

});

// data事件,接收到服务器的消息了应该怎么办
socket.on("data", function(data) {
    console.log(data.toString()); // 把收到的消息打印出来
    socket.end(); // 收到消息了就关闭这个socket
});

//close事件,客户端关闭的时候干什么事情
socket.on("close", function(){
   console.log("链接已关闭")
});

// error 报错的时候触发的事件





// client里面的方法


// 我用这个write方法给服务端发送消息
socket.write("hello server");

// 关闭用socket.end()方法关


// setTimeout方法,设置超时时间
socket.setTimeout(2000);

// 如果2000秒之内服务器和客户端没有传信,我这边有一个监听超时的时候触发的事件,执行我这个事件
socket.on("timeout", function(){
    console.log("超时啦");
    socket.end(); //把他关了
});
