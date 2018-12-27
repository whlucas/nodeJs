// 拦截器有很多个,不光有这么一个loginFilter,所以要在把这个filter文件夹里面的拦截器都加载了,要在配置里面配置一下这个路径,利用更目录下的filterLoader.js把他们都加载进来

let url = require('url');

let globalConfig2 = require("../config");

function loginFilter(request, response){
    // 获取url
    let pathName = url.parse(request.url).pathname;
    console.log(pathName);
    // 如果pathname是除了html的静态文件,/login.html,/login1,放行
    if (pathName === "/login.html" || pathName === "/login1" || isStaticsRequest(pathName)){
        console.log("放行");
        return true;
    }else{
        // 如果不是要放行的文件,判断一下cookie值有没有,有的话就证明登陆过了,放行
        if(request.headers.cookie){ // cookie值在这个里面,先判断有没有
            // 注意每一个cookie值都是用分号和空格链接连接的,需要做字符串的拆分
            let cookies = request.headers.cookie.split(";"); // 得到每一条cookie
            for (let i = 0 ; i < cookies.length; i++){
                // 看一下cookie的左边是不是等于id
                // 在看的时候注意如果这一条cookie不是第一条的话,左边是带着空格的,需要吧空格去掉
                if (cookies[i].split("=")[0].trim() === "id") {
                    return true // 如果有一条的左边是id的话就是true,都没有的话就跳出去拦截
                }
            }
        }
        console.log("拦截");
        response.writeHead(302, {"location": "/login.html"});
        response.end();
        return false;
    }
}

// 利用一下这个前面server里面的判断是不是静态文件的函数
function isStaticsRequest(pathName) {
    for (let i = 0 ; i < globalConfig2.static_file_type.length; i++){
        // if(pathName.indexOf(globalConfig.static_file_type[i])){ //我的url里面只要包括了那些类型里面的一个,但是我这个必须要存在于结尾,存在于中间是不好使的所以这样不太对
        //     return true;
        // };


        let temp = globalConfig2.static_file_type[i]; // 我把这个每一位提出来

        // html要拦截,所以要单独处理
        if (temp === ".html") {
            continue
        }

        // 当我这个后缀出现在url的末尾的时候,才算是静态文件
        if(pathName.indexOf(temp) === pathName.length - temp.length){  // 当我出现的位置在末尾的时候才算
            return true
        }
    }
    return false
}

module.exports = loginFilter;