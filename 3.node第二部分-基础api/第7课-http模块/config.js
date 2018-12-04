let fs = require("fs");

let  globalConfig = {};

let conf = fs.readFileSync("./server.conf");

let configArr = conf.toString().split("\n");

for(let i = 0; i < configArr.length; i ++){
    globalConfig[configArr[i].split("=")[0]] = configArr[i].split("=")[1];
}

// 把是不是静态资源的类型分隔开
if(globalConfig.static_file_type){
    globalConfig.static_file_type = globalConfig.static_file_type.split("|") // 用竖线拆开
}else{
    // 我们的所有的主程序是运行在一个线程里面的,我这个线程出现了任何错误都会导致我这个程序停掉
    throw new Error("配置文件异常,缺少:static_file_type");
}

module.exports = globalConfig;