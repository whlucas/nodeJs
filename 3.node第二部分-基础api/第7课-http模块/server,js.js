// 用http模块来实现上一课的功能

// 引入http模块
let http = require('http');
// 引入url模块,这个模块就是专门用来解析url的
let url = require('url');
// 引入文件读取模块
let fs = require('fs');
// 引入配置信息
let a = 1;
let globalConfig = require("./config");

// 我们前端发的请求分为两种,一种是请求固定的东西,一种是请求不固定的东西
// 固定的东西: 一个html文件,一个图片,一个js文件等等,称为静态资源,如果请求的是这个,我们就给他从配置里面去读,读出来返回,读不出来就404
// 不固定的东西: 当前用户的用户名,称为动态资源,如果是动态资源,我们就得有一些业务逻辑,查数据库啥的

// 所以我们首先要通过url来区分他发过来的请求是动态的还是静态的


http.createServer(function (request, response,) { // 里面穿一个函数,这个函数里面传两个参数
    // 获取url
    let pathName = url.parse(request.url).pathname;
    // 判断是静态文件还是动态文件
    let isStatic = idStaticsRequest(pathName);

    if(isStatic){ // 请求的是静态的文件
        console.log(globalConfig.pagePath);
        console.log(pathName);
        console.log(globalConfig.pagePath + pathName + '')
        // fs.readFileSync(globalConfig["page_path"] + pathName); // 读取路径加文件名的文件
    }else{ // 请求的是动态的数据
        // console.log(a);
    }

}).listen(globalConfig["port"]);

function idStaticsRequest(pathName) {
    for (let i = 0 ; i < globalConfig.static_file_type.length; i++){
        // if(pathName.indexOf(globalConfig.static_file_type[i])){ //我的url里面只要包括了那些类型里面的一个,但是我这个必须要存在于结尾,存在于中间是不好使的所以这样不太对
        //     return true;
        // };

        // 当我这个后缀出现在url的末尾的时候,才算是静态文件
        let temp = globalConfig.static_file_type[i]; // 我把这个每一位提出来
        if(pathName.indexOf(temp) === pathName.length - temp.length){  // 当我出现的位置在末尾的时候才算
            return true
        }
    }
    return false
}