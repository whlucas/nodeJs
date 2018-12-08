// 这个文件是写在DAO层里面的

// mySQR给所有的语言都给写了驱动,让这些语言都可以调用他

// 用npm先安装一下
// 命令行 npm init
// npm install mysql -save

// 安装好了之后就可以调用了
let mysql = require("mysql");

// 链接之前我先要配置一下,要不然他不知道要链接哪一个数据库
let connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "7777777",
    database: "school" // 链接哪一个数据库
});

// 我先写一个查

// 写一条语句
// let querySql = "select * from students";
//
// // 查之前的有个连接操作
// connection.connect();
//
// // 执行这条语句connection.query
// connection.query(querySql, function(error, result) { // 两个参数第一个执行的语句,第二个回调,回调里面两个参数,第一个异常,二个结果,两个只会有其一
//     if (error == null){
//         console.log(result);
//     } else {
//         console.log(error);
//     }
// });
//
// // 查完了要关闭,不关的话我这个创建的链接一直都在,下次查又会新来一个链接,不关的话就会有很多很多个链接
// connection.end();

// 一般在公司里面我一个DAO文件只负责查一个表,这个文件一般只负责链接操作,然后在那些查询表的文件里面把这个文件引过去,这样就清晰一点
// 所以就可以把我上面的那一段都写在studentDAO的里面

// 导出我这个链接
module.exports = connection;