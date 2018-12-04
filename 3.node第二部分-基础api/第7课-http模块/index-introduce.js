// net模块,是TCP/IP协议的

// 现在讲他们的上一层HTTP层

// 引入http模块
let http = require('http');
// 引入url模块,这个模块就是专门用来解析url的
let url = require('url');

// 实际上他这个模块就是调用了net模块,然后在他的基础上又解析了一下
http.createServer(function (request, response) { // 里面穿一个函数,这个函数里面传两个参数
    // console.log(request); // 我这个request里面就有很多个属性,其中一个就是他给我解析好的url

    let pathName = url.parse(request.url).pathname; // 我把request里面的url传到这个url模块里面解析,用parse方法解析,解析完了就是一个对象,这个对象里面就放着解析完成之后的各个属性,这个pathname属性就是原原本本不带参数拼接的url
    let params = url.parse(request.url).query; // 这个就是我拼接的参数
    let params2 = url.parse(request.url, true).query; //我这里多传一个参数true,他就给我解析成对象了,就可以想拿哪个拿哪个了
    console.log(pathName,params,params2);

}).listen(12306); // 创建完了监听12306窗口,这里号线不需要写地址,只需要写端口号就行