const mysql = require("mysql");

const { dbConfig } = require('./dbConfig')

// 创建连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  ...dbConfig[process.env.DB_ENV]
});


/**
 * 执行sql语句
 * @param {*} sql sql 查询语句
 * @param {Array} payload sql 查询参数列表
 * @returns {Promise} sql结果
 */
module.exports.query = (sql, payload) => {
  return new Promise((resolve, reject) => {
    // 连接
    pool.getConnection((err, connection) => {
      // 使用连接查询
      connection.query(sql, payload, (error, results, fields) => {
        // 释放连接
        connection.release();
        if (error) throw error;
        // 获取结果
        resolve(results);
      })
    })
  })
}