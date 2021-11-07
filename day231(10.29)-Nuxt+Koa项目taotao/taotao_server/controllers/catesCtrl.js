const { getOneCategory, getTwoCategory } = require("../models/catesModel")

// 一级分类控制器
module.exports.oneCategory = async (ctx) => {
  const res = await getOneCategory();
  // 一级分类
  ctx.body = {
    status: 200,
    oneCategory: res
  };
}

// 二级分类控制器
module.exports.twoCategory = async (ctx) => {
  const { cid } = ctx.request.query;
  const res = await getTwoCategory(cid);
  // 二级分类
  ctx.body = {
    status: 200,
    twoCategory: res
  };
}