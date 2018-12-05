// 引入日志文件

let fs = require("fs");

let globalConfig = require("./config");

let fileName = globalConfig.log_path + globalConfig.log_name;
// 我在哪个路劲的哪个文件下写入一个 asd




// 同步的方式写入文件
// fs.writeSync(fileName, "asd")


function log(data){
    // 异步的方式写入一个文件
    // 写日志一般和主程序运行没有什么关系,为了节省性能,一般选择异步的方式
    fs.writeFile(fileName, data + "\n",{flag: 'a'}, function () { // 我在写的时候传入一个参数flag,当这个参数为a的时候是查看我写的这个文件有没有,如果有接着写,没有的话创建一个写,如果是默认的w,就是每一次都新创建一个写, 每次写完了一个东西都加上一个\n换行
        // flag的参数:
        // r  可读
        // rs 同步可读 带s就是同步的
        // w  写 可创建
        // wx 写 可创建 我写的时候别人不可以对这个文件操作
        // a  可写 可创建 可追加
        // ax 可写 可创建 可追加 排他追加
        // 带x的就就是排他,带s的就是同步,带+的就是加上一个写/读

    // 这个options除了flag一个参数之外,还有一个mode参数要讲一下
    // 他默认是0o666 0o代表八进制数 666为文件的访问权限
    // 第一个数,文件所有者的权限
    // 第二个数,同组用户的权限
    // 第三个数,非同组的权限

    // r w x
    // 4 2 1
    // 每一位数代表这三个数加起来

        console.log("完成");
    });

    // 有个别人写好的可追加写的方法,这个和上面writeFile然后设置参数的效果一样
    // fs.appendFile(fileName, data + "\n",{flag: 'a'}, function () {
    //     console.log("完成");
    // })

    // 同步的是这个,参数一样,但是没有callback
    // fs.appendFileSync()
}

module.exports = log;