let fs = require("fs");

// 需要拿到配置文件文件里面的filter_path路径
let globalConfig = require("./config");

// 这个files就是放着路径下的所有的文件名的一个数组
let files = fs.readdirSync(globalConfig["filter_path"]);

// 定义一个拦截器的集合,我拦的时候是用这个拦截器的集合去拦截,只要有一个拦截器拦下来了就不行
let filterSet = [];

// 把路径下的所有的文件加载进来
for (let i = 0; i < files.length; i ++){
    // console.log(globalConfig.web_path + files[i])
    // temp就代表每一个文件的目录
    let temp = require(globalConfig["filter_path"] + files[i]);
    filterSet.push(temp);
}

module.exports = filterSet;