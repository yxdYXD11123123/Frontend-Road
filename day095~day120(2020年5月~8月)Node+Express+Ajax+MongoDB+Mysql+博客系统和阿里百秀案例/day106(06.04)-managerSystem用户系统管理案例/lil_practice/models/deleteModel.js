const pool = require('../config/dbconfig');

module.exports.deleteUser = (userId, callback) => {
    pool.query("delete from users where uid = ?", [userId], (error, results) => {
        if (error) throw error;
        callback(results);
    })
}