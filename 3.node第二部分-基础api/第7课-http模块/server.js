// 用http模块来实现上一课的功能
// 我这个文件就是为了跳转的和我的业务逻辑没有任何关系

// 引入http模块
let http = require('http');
// 引入url模块,这个模块就是专门用来解析url的
let url = require('url');
// 引入文件读取模块
let fs = require('fs');
// 引入配置信息
let globalConfig2 = require("./config");
// 引入写日志的模块
let log = require("./log");

let loader = require("./loader");

// 引入拦截器
let filterSet = require("./filterLoader")

// 我们前端发的请求分为两种,一种是请求固定的东西,一种是请求不固定的东西
// 固定的东西: 一个html文件,一个图片,一个js文件等等,称为静态资源,如果请求的是这个,我们就给他从配置里面去读,读出来返回,读不出来就404
// 不固定的东西: 当前用户的用户名,称为动态资源,如果是动态资源,我们就得有一些业务逻辑,查数据库啥的

// 所以我们首先要通过url来区分他发过来的请求是动态的还是静态的


http.createServer(function (request, response) { // 里面穿一个函数,这个函数里面传两个参数
    // 获取url
    let pathName = url.parse(request.url).pathname;
    // 获取参数
    // let param = url.parse(request.url, true).query; // 加一个true就把参数们变成对象的形式
    // 判断是静态文件还是动态文件
    let isStatic = isStaticsRequest(pathName);

    // 写一个日志
    log(pathName);

    // 刚一进来我就拦截,拦截拦不住了我再走后面的
    for (let i = 0; i < filterSet.length; i++) {
        let flag = filterSet[i](request, response);
        if(!flag){ // 如果拦住了就结束了,不往下走了
            return;
        }
    }


    if(isStatic){ // 请求的是静态的文件
        try{
            // 把文件读出来
            let data = fs.readFileSync(globalConfig2.page_path + pathName); // 读取路径加文件名的文件
            // 返回用的是response这个参数
            // 写相应头
            response.writeHead(200);

            // 这里其实需要按照拓展名来决定content-type的类型，比如.html拓展名就是text/html,访问.jpg就是image/jpeg

            // 可以做一个优化，如果url中不存在拓展名，此时表示这是一个文件夹，此时再后面自动补全/index.html
            // 这里还有一个坑，如果不是以/结尾，此时会造成浏览器识别文件的路径层次有问题
            // 比如http://127.0.0.1/b 和http://127.0.0.1/b/不一样，同样的一个文件wangjunkai.jpg前者认为是同级目录下的文件，后者认为是b文件夹中的，所以要识别一下最后一个是不是'/'，如果不是就给他加一个/

            // let extname = path.extname(pathname);
            // if(!extname){
            //     if (pathname.substr(-1) != "/"){
            //         res.writeHead(302, {"Location" : pathname + "/"})
            //     }
            //     pathname += "/index.html";
            // }

            // 还有一个问题是要解决304的问题，就是文件没变或者没有改动就拒绝传输新文件并返回304，一般用框架就完事了

            // formidable用来处理post请求，可以处理图片、zip等文件的上传

            //写相应体
            response.write(data);
            // 把他关了
            response.end()
        }catch(e){
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>");
            response.end()
        }

    }else{ // 请求的是动态的数据
        if (loader.get(pathName)){ // 如果我请求的这个路径在我的库里面有这个方法的话
            // 为了防止我这个调用的方法出错而导致我整个服务器停了,所以我在这里try catch
            try{
                loader.get(pathName)(request, response) //如果能拿到这个方法的话,就执行这个方法,把这两个参数传进去
            }catch(e){
                response.writeHead(500);
                // 打印一个服务器端的错误
                response.write("<html><body><h1>500 BadServer</h1></body></html>");
                response.end()
            }
        }else{ // 如果没有这个方法的话就404
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>");
            response.end();
        }
    }

}).listen(globalConfig2["port"]);


function isStaticsRequest(pathName) {
    for (let i = 0 ; i < globalConfig2.static_file_type.length; i++){
        // if(pathName.indexOf(globalConfig.static_file_type[i])){ //我的url里面只要包括了那些类型里面的一个,但是我这个必须要存在于结尾,存在于中间是不好使的所以这样不太对
        //     return true;
        // };

        // 当我这个后缀出现在url的末尾的时候,才算是静态文件
        let temp = globalConfig2.static_file_type[i]; // 我把这个每一位提出来
        if(pathName.indexOf(temp) === pathName.length - temp.length){  // 当我出现的位置在末尾的时候才算
            return true
        }
    }
    return false
}