const mysql = require('mysql');

// 创建连接池
let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todolist'
});

// 导出连接池
module.exports = pool;