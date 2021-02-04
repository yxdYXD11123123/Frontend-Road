// 引入数据库连接池
const pool = require('../config/dbConfig');

// 查询所有英雄
module.exports.findAllHeros = (callback) => {
    let sql = `select * from hero;`
    pool.query(sql, (error, results) => {
        if (error) throw error;
        callback(results);
    })
};


// 模糊查询英雄
module.exports.findHerosBySearch = (searchKey, callback) => {
    let sql = `select * from hero where hname like '%${searchKey.trim()}%';`
    pool.query(sql, (error, results) => {
        if (error) throw error;
        callback(results);
    });
};


// 删除英雄
module.exports.deleteOneHero = (id, callback) => {
    let sql = ``;
    pool.query(sql, (error, results) => {
        if (error) throw error;
        callback(results);
    })
}