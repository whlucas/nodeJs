// 我这个就专门接收index.html页面发送的请求的一个服务

// 我现在想要让getData2这个请求,去查询我数据库里面的东西
// 首先引入service层里面东西,sevice层里面引入DAO层,DAO层访问数据库
let studentService = require("../service/第5课(3)-studentService");

let path = new Map();

let url = require('url');


// 设置一个请求路径为getData所对应处理的函数
function getData(request, response){ // 这个里面处理路径是getdata的请求
    // 收到请求返回一个hello
    response.writeHead(200);
    response.write("hello"); // 这个hello,就被发送那个请求的函数接收到,然后用这个结果做处理
    response.end();
}

// 设置一个请求路径为getData2对应的处理函数
function getData2(request, response){
    studentService.queryAllStudent(function(result){
        let resArr = [];
        // 我把结果里面的名字放到resArr数组里面去
        for (let i = 0; i < result.length; i ++){
            resArr.push(result[i].name);
        }
        response.write(resArr.toString()); // 我把我从数据库拿到的结果经过上面的处理返回回去,注意这里write函数里面要放字符串
        response.end();
    })
}

function login(request, response) {

    // 获取我传过来的url里面的参数
    let params = url.parse(request.url, true).query; // 加一个true就把参数们变成对象的形式

    studentService.queryStudentByStuNum(params.stuNum, function (result) {
        let res;
        if(result == null || result.length === 0){
            res = "Fail"; // 如果没找到
        }else{
            if (result[0].pwd === params.password){ // 返回的是一个数组,返回第一个
                res = "OK"; // 找到了相等
            }else{
                res = "Fail"; // 找到了不相等
            }
        }


        response.write(res);
        response.end();
    })
}

// 处理post请求,请求内容和上面的get请求
function login1(request, response) {

    // post请求的参数没有放在url里面,所以解析url是解析不到参数的
    // let params = url.parse(request.url, true).query; // 加一个true就把参数们变成对象的形式

    // 接收post请求里面的参数
    // post请求的数据是在data事件里面捕获的
    request.on("data", function(data){ // 如果有data,这个data就是参数
        // 解析一下data
        let stuNum = data.toString().split("&")[0].split("=")[1];
        let password = data.toString().split("&")[1].split("=")[1];

        // 把剩下的放到这个函数里面去
        studentService.queryStudentByStuNum(stuNum, function (result) {
            let res;
            if(result == null || result.length === 0){
                // 这里假设我用的是form表单的提交,就得在这个里面写跳转,分开写,这里写失败的跳转
                // 如果没用form表单就直接返回值就行了,用js依据返回值跳转,就不用下面的跳转语句了
                res = "Fail"; // 如果没找到
                // response.writeHead(302, {"location": "./error.html"});
                // response.end();
            }else{
                if (result[0].pwd === password){ // 返回的是一个数组,返回第一个
                    res = "OK"; // 找到了相等
                    //往里面写一个cookie,代表我登录过了
                    response.writeHead(200, {"Set-Cookie":"id=" + result[0].id});

                    // 这里写form表单成功的跳转与写入cookie
                    // response.writeHead(302, {"location": "./main.html", "Set-Cookie":"id=" + result[0].id});
                    // response.end();
                }else{
                    res = "Fail"; // 找到了不相等
                    // 这里写form表单失败的跳转
                    // response.writeHead(302, {"location": "./error.html"});
                    // response.end();
                }
            }
            // 如果不是form表单就用这两句话
            response.write(res);
            response.end();

            // 如果我是用form表单发送的请求,没法在回调里面写js
            // 所以就要在后端这边写一个请求成功后跳转
            // 我们叫重定向

            // 写一个响应头,里面有一个字段就让他跳转,这个跳转是浏览器读了这个之后浏览器来做的
            // response.writeHead(302, {"location": "./main.html"}); // 3开头的表示跳转, {}里面写响应头里面的字段
            // response.end();
        })
    });


}


// 我想让这个处理请求的方法和路径对应起来,因为我请求请求的是路径
path.set("/getData", getData);
path.set("/getData2", getData2);
path.set("/login", login);
path.set("/login1", login1);
module.exports.path = path; // 把我的这个字典导出来
