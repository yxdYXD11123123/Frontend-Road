const mysql = require('mysql');

// 配置数据库信息
const pool = mysql.createPool({
    // 支持多条sql语句的查询语句
    multipleStatements: true,
    // 数据库连接池中，有多少连接
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lil_practice'
})

module.exports = pool;