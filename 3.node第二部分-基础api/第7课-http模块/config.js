let fs = require("fs");

let  globalConfig2 = {};

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