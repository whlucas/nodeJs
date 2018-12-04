let fs = require("fs");

// 加载配置文件
let globalConf = {};
let conf = fs.readFileSync("./server.conf");
let confs = conf.toString().split("\r\n"); // 转成字符串用换行拆分
for (let i = 0; i < confs.length; i ++){
    let tempConf = confs[i].split("="); // 用等号把每一行拆成两部分
    if (tempConf.length < 2){
        continue;  // 没有就下一个循环
    } else {
        globalConf[tempConf[0]] =  tempConf[1]; // 如果有值就把这个值赋给我在服务器里面定义的配置对象globalConf
    }
}

// 我想通过配置文件的第三行信息来判断我这个路径是相对路径还是绝对路径
if(globalConf.path_position === "relative"){
    globalConf.basePath = __dirname + globalConf.path; // 如果是相对路径就给他加上绝对路径
}  else {
    globalConf.basePath = globalConf.path // 如果是绝对路径就啥也不干直接付过来
}

console.log(globalConf.basePath);

// 比如我想要访问的这个文件在桌面上,我只需要改配置文件里面的路径信息,改成绝对路径,然后把桌面的路径输入到里面,然后就可以放问到桌面上的文件了

// 如果我把端口号设置成80,浏览器在访问的时候就不用输入端口号了,80是默认端口

module.exports = globalConf; // 我在这里把我这个配置读出来,然后通过exports导出去