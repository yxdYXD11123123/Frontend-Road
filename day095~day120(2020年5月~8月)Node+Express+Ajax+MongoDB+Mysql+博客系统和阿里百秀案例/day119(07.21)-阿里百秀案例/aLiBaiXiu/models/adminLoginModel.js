// 引入数据库连接池
const pool = require('../config/dbconfig');

// 从数据库连接池中通过连接去查询数据库
// pool.query('sql语句', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

module.exports.findUser = (email, callback) => {
    pool.query(`select * from users where email = '${email}'`, function (error, results, fields) {
        // 字段包
        // console.log(fields);
        if (error) throw error;
        callback(results);
    });
}

