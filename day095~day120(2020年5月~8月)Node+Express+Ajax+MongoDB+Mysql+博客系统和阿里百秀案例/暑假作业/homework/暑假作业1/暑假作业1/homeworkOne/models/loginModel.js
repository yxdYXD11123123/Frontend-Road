// 引入数据库连接池
const pool = require('../config/dbConfig');

// 查询用户是否存在
module.exports.findUser = (username, callback) => {
    let sql = `SELECT * FROM users WHERE username = '${username}';`
    pool.query(sql, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}