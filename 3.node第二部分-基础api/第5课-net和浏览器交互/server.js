var net = require("net");

var server = net.createServer();
server.listen(12306, "127.0.0.1");

// 监听一下是不是起来了
server.on("listening", function() {
    console.log("服务已启动");
});

// 我用浏览器来当客户端
// 运行这个文件打开服务器,我用浏览器访问127.0.0.1:12306

server.on("connection", function (socket){
   console.log("有新的链接");
    // 这个时候就会打印有新的链接
    // 证明我这里能收的到消息

    // 我如果收到了浏览器发给我的数据我就把它打印出来
    socket.on("data", function(data){
        console.log(data.toString())
        // 我发现打印出来了一个http协议的请求头
        // 这个请求是我从传输层直接截出来的,还没有到达应用层

        // GET / HTTP/1.1
        // Host: 127.0.0.1:12306
        // Connection: keep-alive
        // Cache-Control: max-age=0
        // Upgrade-Insecure-Requests: 1
        // User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36
        // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language: zh-CN,zh;q=0.9


        // 我收到了这个浏览器发给我的请求,我给他回一个消息
        // socket.write("hello browser");
        // 发现这样不行,他没收到消息

        // 因为我们的照着http协议来写回信
        // 写的时候相应头之间是一个\r\n,相应头和数据体之间是\r\n\r\n
        // 其中前两行相应头是必须要写的,后面的可以随意加
        socket.write("HTTP 200OK\r\nContent-type:text/html\r\nServer:DWS/1.1\r\n\r\n<html><body>hello browser</body></html>")
        // 这样就发现浏览器收到相应了

        // 浏览器发给我一个请求,我来解析一下发来的这个请求的url是啥
        var request = data.toString().split("\r\n"); // 先把这个字符串一行一行的拆分
        var url = request[0].split(" ")[1]; // 然后再把第一行拿出来用空格拆分,第一个就是url
        console.log(url) // 这样我就提出来url了
    })


});

