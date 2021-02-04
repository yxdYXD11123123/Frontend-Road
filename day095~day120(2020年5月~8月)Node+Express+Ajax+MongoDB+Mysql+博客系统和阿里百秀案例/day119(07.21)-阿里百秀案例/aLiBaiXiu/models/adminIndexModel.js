// 引入数据库连接池
const pool = require('../config/dbconfig');


//#region 查询站点统计数据
module.exports.findCount = (callback) => {
    pool.query(`
    -- 所有文章
    SELECT COUNT(*) pcount FROM posts;
    -- 所有草稿
    SELECT COUNT(*) dcount FROM posts WHERE STATUS = 'drafted';
    -- 所有分类
    SELECT COUNT(*) cacount FROM categories;
    -- 所有评论
    SELECT COUNT(*) cocount FROM comments;
    -- 所有待审核评论
    SELECT COUNT(*) hcount FROM comments WHERE STATUS = 'held';
    `, function (error, results) {
        if (error) throw error;
        callback(results);
    })
}
//#endregion

