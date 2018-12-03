console.log(require);
// 我打印一下require发现是个function
console.log(module);
// 他是个对象,里面有很多属性
console.log(exports);
// 他是一个空对象
console.log(__dirname);
// __dirname打印当前路径
console.log(__filename);
// __firename这个文件名的全称 路径+文件名+后缀


// NodeJs的模块是运行在一个函数当中的
// 这个函数大概是这样的
function xyz(exports,require,module,__filename,__dirname) { //在运行这个函数的时候会传入这些参数

    // ---
    // 中间的内容是我们写的NodeJs代码
    // 比如:
    console.log(require); // 我们在运行代码的时候可以直接用是因为他是传进来的
    console.log(module);
    console.log(exports);
    console.log(__dirname);
    console.log(__filename);
    // ---

    return module.exports; // 为什么实际上引入的是module.exports,因为他return的就是这个
}

// 如何证明
// 我直接在js文件里面打印
console.log(arguments)
// 发现打印出来了一个参数列表,里面就是上面函数里面我传入的五个参数

// 我再证明一下
// 如果我这个arguments[0] 和 exports相等,那就是他俩是一个地址一样对象
console.log(arfuments[0] == exports); // 发现相等
console.log(arfuments[1] == require); // 发现也相等,后面就不试了



// 研究一下module对象

// children属性
// 引入了哪个模块哪个就是这个模块的children
require("./Md1.js");
// 如果我这里引入了一个模块
// 这个module对象里面的chirdren属性里面就会有一个Md1.js的子模块,

// loaded属性
// 表示当前这个模块又没有完全加载(执行)完


// path属性
// 有的时候我用的模块既不是自己写的,也不是系统自带的,是别人写好的框架
// 这个框架由npm引入,引入完成了之后就就会在当前路劲下给我创建一个node_modules文件夹
// 比如我在这个文件夹里面输入npm init
// 然后随便下载一个npm install express
// 就会在当前路径下添加一个node_modules文件夹
// 这个path就是添加一个mode_modules这个路径,让他能找到这个文件夹,他添加了很过个防止找不到

// 我下载的东西的目录都放在了package.json文件里面,我给别的时候把这个目录给别人就行了,给别人了之后别人直接npm install就可以了