// 首先引入一下net模块,这个net模块既能创建出Server也能创建吃Socket
let net = require("net");

// 创建一个server
let server = net.createServer();
server.listen(12306, "127.0.0.1"); // 规定我要监听的ip与端口

// server里面的事件

// lintening 事件 一旦我开启监听我就触发了这个事件
server.on("listening", function () {
   console.log("服务已启动");
});

// connection 事件 一旦有人链接我了就触发这个事件
server.on("connection", function(socket) { // 这个socket就是我client那边我创建的管道
   console.log("有新的链接");

   // 这里因为我把client里面我定义的管道socket传过来了,谁跟我连,我这个socket就是谁,所以我们可以给这个socket绑定事件,绑定的事件就是client里面才拥有的事件

    // client里面的data事件,当我收到数据的时候干什么
   socket.on("data",function (data){
      console.log(data.toString()); //我让他把我收到的数据打印出来
       // 我接收到了也可以可以给客户端回一个消息
       socket.write("hello client");
   });

   // 当client那边客户端关闭的时候这边也可以收到消息,那边关了,也可以触发这边关闭的消息
   socket.on("close", function() {
       console.log("客户端已关闭");
       server.close(); // 当我客户端关闭的时候这边也可以关闭
   })
});

// 还有两个事件close和error事件分别是服务器关闭的时候触发和服务器报错的时候触发,不常用

server.on("close", function(){
   console.log("服务已关闭")
});


// server里面的方法
// listen 监听方法,在最上面使用过了
// close 一般不会用close的方式关闭
// server.address() 打印我自己的地址一般也不常用因为主机的ip和端口都是我自己定义的,使用要在事件函数的回调里面使用