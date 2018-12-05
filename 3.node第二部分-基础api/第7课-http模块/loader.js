// server.js这个文件是一个通用的,负责跳转的文件,和我的业务逻辑没有关系
// 我们想要在里面实现跳转,而一个一个引人我们实现业务逻辑的文件,又不是很好,引人太多太乱

// 所以我们这里需要一个能够自动的获得web下的所有文件,自动的实现加载

let fs = require("fs");

// 需要拿到c配置文件文件里面的读取路径
let globalConfig = require("./config");

// 用来收集我引入的东西
let controllerSet = [];

let pathMap = new Map();

let files = fs.readdirSync(globalConfig["web_path"]);
// 这个file就是放着路径下的所有的文件名的一个数组

// 把路径下的所有的文件加载进来
for (let i = 0; i < files.length; i ++){
    // console.log(globalConfig.web_path + files[i])
    let temp = require(globalConfig.web_path + files[i]);
    // 我web里面的每一个文件都对应着一个页面的请求,在这里做一个全局的映射,方便管理
    // 我约定每一个web里面处理的文件都要输出一个.path
    if (temp.path){
        for (let [k,v] of temp.path){
            // console.log(k);
            // console.log(v);
            // 我们在放进去之前要先判断一下这个方法里面有没有,防止两个文件里面有重复的方法的存在
            if(pathMap.get(k) == null){ // 如果里面没有重复的
                pathMap.set(k, v); // 就放进去
            } else{
                throw new Error("url path异常, url:" + k);
            }
        }
        controllerSet.push(temp);
    }

}
module.exports = pathMap;

