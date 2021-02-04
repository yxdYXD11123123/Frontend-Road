// 引入数据库连接池
const pool = require('../config/dbconfig');

//#region 通过文章id获取文章信息
module.exports.getPostById = (id, callback) => {
    pool.query(`
    select p.*,c.name,u.nickname from posts as p 
    join users as u join categories as c
    on p.category_id = c.id and p.user_id = u.id
    where p.id = ${id}; 
    SELECT id AS cate_id,name AS cate_name FROM categories; 
    SELECT DISTINCT status FROM posts ;`, function (error, results) {
        if (error) throw error;
        callback(results);
    })
}

//#endregion