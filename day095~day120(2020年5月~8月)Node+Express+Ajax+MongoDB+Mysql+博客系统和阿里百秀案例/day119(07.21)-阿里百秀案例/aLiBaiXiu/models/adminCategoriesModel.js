const pool = require("../config/dbconfig");

//#region 查询所有分类信息
module.exports.findAllCategories = (callback) => [
    pool.query("SELECT * FROM categories", (error, result) => {
        if (error) throw error;
        callback(result);
    })
]
//#endregion