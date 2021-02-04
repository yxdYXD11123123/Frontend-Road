// 引入数据库连接池
const pool = require("../config/dbconfig");

//#region 查询所有用户信息
module.exports.findAllUsers = (callback) => {
    pool.query("select * from users;", function (error, results) {
        if (error) throw error;
        callback(results);
    })
};
//#endregion

//#region 删除单个用户
module.exports.deleteOneUser = (id, callback) => {
    pool.query(`UPDATE users SET status = 'trashed' WHERE id = ${id}`, function (error, results) {
        if (error) throw error;
        callback(results);
    })
}
//#endregion

//#region 删除多个用户
module.exports.deleteManyUsers = (idArr, callback) => {
    // 将数组拼接为字符串  以便放在 in ( )  里
    idArr = idArr.join(',');
    // 修改
    pool.query(`UPDATE users SET STATUS = 'trashed' WHERE id IN (${idArr});`, function (error, results) {
        if (error) throw error;
        callback(results);
    })
}