// 获取浏览器发给我们的请求里面的url,通过这个url看看他想要什么文件,我看看我这里有没有,要是有的话就干会给它

let net = require("net");
let fs = require("fs");  // 这是一个file system 文件系统




// 加载配置文件
// let globalConf = {};
// let conf = fs.readFileSync("./一个简易的小服务器/server.conf");
// let confs = conf.toString().split("\r\n"); // 转成字符串用换行拆分
// for (let i = 0; i < confs.length; i ++){
//     let tempConf = confs[i].split("="); // 用等号把每一行拆成两部分
//     if (tempConf.length < 2){
//         continue;  // 没有就下一个循环
//     } else {
//         globalConf[tempConf[0]] =  tempConf[1]; // 如果有值就把这个值赋给我在服务器里面定义的配置对象globalConf
//     }
// }
// console.log(globalConf);
// 发现我这个加载配置文件和下面的启动服务器没什么关系,所以我这里要用到模块化,把他放在另外一个文件引入进来

// 在这里引入我配置文件中导出来的配置数据
let globalConf = require("./conf.js")


let server = net.createServer();
server.listen(globalConf.port, "127.0.0.1");

server.on("listening", function () {
   console.log("服务器已启动");
});

server.on("connection", function(socket) { // 拿到传给我的socket对象
    socket.on("data", function (data){
        // 我通过浏览器打给我的请求,拿到这个请求的url
        let url = data.toString().split("\r\n")[0].split(" ")[1];


        // 读文件,有同步读取,和异步读取,同步比较的简单
        // 我们先用一下同步的读取文件

        // 为了防止读不到文件报错,我用try catch写一下
        try {
            // let data = fs.readFileSync("index.html");  // 读取文件
            // let dataFile = fs.readFileSync(__dirname + globalConf.path + url);  // 我要读绝对路径就这么读,中间再加上我配置文件里面的文件所在目录

            // 如果我想通过我conf文件里面的路径直接付进来,并且保证赋进来的一定是绝对路径的话,就要先对配置文件里面的路径做处理(写在conf.js文件里面),然后直接在这里传入配置文件里面设置好的路径
            let dataFile = fs.readFileSync(globalConf["basePath"] + url);

            // 如果用谷歌浏览器的话不写contentType也行,他比较的先进
            // socket.write("HTTP/1.1 200OK\r\n\r\n" + data.toString()) //我这里虽然是传过去的是字符串,但是他浏览器读的时候可以读成html文件 我这么写有个问题,他都转成字符串了我的照片就读不出来了,所以不这么写

            // 我这样分开写就发现图片就出来了,我们还可以在index.html里面引入css文件,这样也可以一起引入进来
            socket.write("HTTP/1.1 200OK\r\n\r\n");
            socket.write(dataFile);

        } catch(e){
            socket.write("HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>")
        }
        socket.end(); // 返回完了就可以结束了
    })
});
