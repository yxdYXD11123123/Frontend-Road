const pool = require('../config/dbconfig');

module.exports.findOneUser = (userId, callback) => {
    pool.query("SELECT * FROM users where uid = ?", userId, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}

// 修改用户信息
module.exports.modifyOneUser = (userId, modifyObj, callback) => {
    pool.query(`update users set ? where uid = '${userId}'`, modifyObj, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}