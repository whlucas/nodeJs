// 引入
// 如果我想引入系统自带的模块直接这样吧模块名字放上去就可以了
require("http");

// 如果我想引入我自己的文件,一定要把路劲带上
require("./test.js");


let test = require("./test.js"); // 返回的是一个模块对象