let fs = require("fs");

let  globalConfig2 = {};



// 我来一个异步的读文件,没有返回结果,有回调函数,返回结果在回调里面,回调里面一定要写两个参数,如果出错了err就有值,data就没值,没出错就data有值,err没值
// fs.readFile("./server.conf", function (err,data) {
//     // 如果是异步的,我就要把之后的东西粘进来,因为要用到这个data参数
//
//     let configArr = data.toString().split("\r\n");
//
//     for (let i = 0; i < configArr.length; i ++){
//         let tempConf = configArr[i].split("="); // 用等号把每一行拆成两部分
//         if (tempConf.length < 2){
//             continue;  // 没有就下一个循环
//         } else {
//             globalConfig2[tempConf[0]] = tempConf[1]; // 如果有值就把这个值赋给我在服务器里面定义的配置对象globalConf
//         }
//     }
//
// // 把是不是静态资源的类型分隔开
//     if(globalConfig2.static_file_type){
//         globalConfig2.static_file_type = globalConfig2.static_file_type.split("|") // 用竖线拆开
//     }else{
//         // 我们的所有的主程序是运行在一个线程里面的,我这个线程出现了任何错误都会导致我这个程序停掉
//         throw new Error("配置文件异常,缺少:static_file_type");
//     }
// });
//
// // 如果是异步的,我在这里打印这个我组织好的对象,发现是空对象,因为是异步,打印的时候异步还没完事呢,所以这种我最后生成出来的要用到异步里面的产物的情况,我就不能使用异步,还的是同步的才好使
// console.log(globalConfig2);

// 这个是同步的读文件
let conf = fs.readFileSync("./server.conf");

let configArr = conf.toString().split("\r\n");

for (let i = 0; i < configArr.length; i ++){
    let tempConf = configArr[i].split("="); // 用等号把每一行拆成两部分
    if (tempConf.length < 2){
        continue;  // 没有就下一个循环
    } else {
        globalConfig2[tempConf[0]] = tempConf[1]; // 如果有值就把这个值赋给我在服务器里面定义的配置对象globalConf
    }
}

// 把是不是静态资源的类型分隔开
if(globalConfig2.static_file_type){
    globalConfig2.static_file_type = globalConfig2.static_file_type.split("|") // 用竖线拆开
}else{
    // 我们的所有的主程序是运行在一个线程里面的,我这个线程出现了任何错误都会导致我这个程序停掉
    throw new Error("配置文件异常,缺少:static_file_type");
}


module.exports = globalConfig2;