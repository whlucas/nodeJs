// 我这个就专门接收index.html页面发送的请求的一个服务

// 我现在想要让getData2这个请求,去查询我数据库里面的东西
// 首先引入service层里面东西,sevice层里面引入DAO层,DAO层访问数据库
let studentService = require("../service/第5课(3)-studentService")

let path = new Map();

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

// 我想让这个处理请求的方法和路径对应起来,因为我请求请求的是路径
path.set("/getData", getData);
path.set("/getData2", getData2);
module.exports.path = path; // 把我的这个字典导出来