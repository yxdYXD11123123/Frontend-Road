var mysql = require('mysql');
var pool = mysql.createPool({
    // 支持多条语句查询
    multipleStatements: true,
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'homework_one'
});

module.exports = pool;