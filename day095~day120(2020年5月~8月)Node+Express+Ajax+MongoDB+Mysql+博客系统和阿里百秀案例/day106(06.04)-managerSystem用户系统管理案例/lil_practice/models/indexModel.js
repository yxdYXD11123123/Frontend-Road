const pool = require('../config/dbconfig');

//#region 
/**
 * 查询所有用户信息
 * @param {*} callback 
 */
module.exports.findAllUsers = (callback) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        callback(results);
    })
}
//#endregion