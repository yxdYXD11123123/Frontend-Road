const pool = require('../config/dbconfig');

/**
 * 添加一个新用户
 * @param {*} userInfo 新用户信息
 * @param {*} callback 回调函数
 */
module.exports.addOneUser = (userInfo, callback) => {
    pool.query("INSERT INTO users SET ?", userInfo, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}