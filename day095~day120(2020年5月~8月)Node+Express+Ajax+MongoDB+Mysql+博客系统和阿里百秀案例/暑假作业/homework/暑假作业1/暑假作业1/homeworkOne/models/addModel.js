// 引入数据库连接池
const pool = require('../config/dbConfig');

// 添加英雄
/**
 * @param {*} heroInfo 英雄信息
 * @param {*} callback 回调函数
 */
module.exports.addOneHero = (heroInfo, callback) => {
    let sql = `insert into hero (hname, nickname, skill) values (?,?,?)`;
    pool.query(sql, [heroInfo.hname, heroInfo.nickname, heroInfo.skill], (error, results) => {
        if (error) throw error;
        callback(results);
    })
}