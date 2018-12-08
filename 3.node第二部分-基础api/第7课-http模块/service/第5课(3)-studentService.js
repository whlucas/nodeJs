// 这个文件一般写在service层
let studentDAO = require("../DAO/第5课(2)-studentDAO");

// 服务层去调DAO层
function queryAllStudent(success) {
    studentDAO.queryAllStudent(success); // 传一个成功了的回调函数进去
}

function queryStudentByStuNum(stuNum, success) {
    studentDAO.queryStudentByStuNum(stuNum, success);
}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByStuNum": queryStudentByStuNum
};

// 这样就是service层,掉DAO层,DAO层掉数据库
// queryAllStudent();

