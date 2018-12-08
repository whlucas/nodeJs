// 关于查学生有关的操作全都放在这里,这里可以有很过个函数

let connection = require("./第5课(1)-node链接数据库");

function queryAllStudent(success) { // 传一个成功了的回调函数
    // 我先写一个查

    // 写一条语句
    let querySql = "select * from students";

    // 查之前的有个连接操作
    connection.connect();

    // 执行这条语句connection.query
    connection.query(querySql, function(error, result) { // 两个参数第一个执行的语句,第二个回调,回调里面两个参数,第一个异常,二个结果,两个只会有其一
        if (error == null){
            console.log(result);
            success(result) // 成功了的话就执行我这个传进来的回调函数,把这个结果传进去
        } else {
            console.log(error);
        }
    });

    // 查完了要关闭,不关的话我这个创建的链接一直都在,下次查又会新来一个链接,不关的话就会有很多很多个链接
    connection.end();
}

// queryAllStudent();

// 我写一个查找某个班级的学生
function queryStudentByClassAndAge(classNum, age){
    // 本来是可以这么写的,但是这样写容易被SQL注入
    // let querySql = "select * from students where class = " + classNum + ";";

    // 所以我们换一种方式写
    let querySql = "select * from students where class = ? and age = ?";
    // 我在这里要传参的地方写一个?,代表我这里传参数 参数在我执行这个语句的时候以参数的方式传入

    connection.connect();

    // 我因为要传两个参数,所以要调整一下传进去的形式,
    let queryParams = [classNum, age];

    // 在这里第二个参数传参,这里不能只接argumens传参,要调整成上面queryParams的形式
    connection.query(querySql, queryParams, function(error, result) {
        if (error == null){
            console.log(result);
        } else {
            console.log(error);
        }
    });

    connection.end();
}

// 这个东西的导出,导出给service用
module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByClassAndAge": queryStudentByClassAndAge
};

// 基本是web层调用service service调用DAO