const { query } = require("../config/query");

// 获取一级分类
module.exports.getOneCategory = () => {
  return query('select * from category;');
}

// 获取二级分类
module.exports.getTwoCategory = (categoryId) => {
  return query("select * from brand where categoryId = ?;", [categoryId])
}