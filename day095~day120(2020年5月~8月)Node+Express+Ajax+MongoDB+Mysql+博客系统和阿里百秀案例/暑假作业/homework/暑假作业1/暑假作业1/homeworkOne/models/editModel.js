// 引入数据库连接池
const pool = require('../config/dbConfig');

// 编辑英雄信息
module.exports.updateHeroInfo = (id, updateInfo, callback) => {
    let sql = `UPDATE hero SET ? WHERE id = ${id};`;
    pool.query(sql, updateInfo, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}

// 查询一个英雄
module.exports.findOneHero = (id, callback) => {
    let sql = `SELECT * FROM hero WHERE id = ${id};`;
    pool.query(sql, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}