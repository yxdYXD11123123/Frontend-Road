// 引入数据库连接池
const pool = require('../config/dbconfig');

//#region 分页查询文章
/**
 * 
 * @param {*} skip 跳过多少条数据
 * @param {*} size 取多少条数据
 * @param {*} callback 回调函数
 */
// module.exports.findByPaging = (skip, size, callback) => {
//     // 占位符写法
//     pool.query(`
// select p.*,c.name,u.nickname from posts as p 
// join users as u join categories as c
// on p.category_id = c.id and p.user_id = u.id
// ORDER BY created
// limit ?,?;
// SELECT COUNT(*) total FROM posts;
// SELECT id AS cate_id,name AS cate_name FROM categories;
//     `, [skip, size], function (error, results) {
//         if (error) throw error;
//         callback(results);
//     })
// };
//#endregion

//#region 
module.exports.findByPaging = (options) => {
    // 是否要分类数据
    let needCategories = options.needCategories || false;
    // 筛选条件
    let status = options.status || null;
    let category = options.category || null;
    // 分页条件
    let skip = options.skip || 0;
    let size = options.size || 5;
    // 回调函数
    let callback = options.callback || null;
    // 基本sql
    let sql = `
    select p.*,c.name,u.nickname from posts as p 
join users as u join categories as c
on p.category_id = c.id and p.user_id = u.id
    `;
    let countSql = `SELECT COUNT(*) total FROM posts`;
    if (!status && category) {
        // 有分类，无状态
        sql += ` WHERE category_id = ${category} `;
        countSql += ` WHERE category_id = ${category} `;
    }
    else if (status && !category) {
        sql += ` WHERE p.status = '${status}' `;
        countSql += ` WHERE status = '${status}' `;
    }
    else if (status && category) {
        sql += ` WHERE category_id = ${category} and p.status = '${status}' `;
        countSql += ` WHERE category_id = ${category} and status = '${status}' `;
    };
    sql += ` ORDER BY created
    limit ?,?;
    ${countSql};
    `;
    // 是否要全部分类
    if (needCategories) {
        sql += ` SELECT id AS cate_id,name AS cate_name FROM categories; `
    };

    // 查询 数据
    pool.query(sql, [skip, size], function (error, results) {
        if (error) throw error;
        callback(results);
    })
}
//#endregion


//#region 通过文章id 删除文章
module.exports.deleteOnePostById = (id, callback) => {
    pool.query(`update posts set status = 'trashed' where id = ${id};`, function (error, results) {
        if (error) throw error;
        callback(results);
    })
}
//#endregion