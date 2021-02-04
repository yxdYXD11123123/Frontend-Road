const express = require("express");
// 创建路由
const adminCategoriesRouter = express.Router();

// 引入控制器
const { showCategoriesPage, refreshCategories } = require('../controllers/adminCategoriesCtrl');

// 创建具体路由
adminCategoriesRouter.get("/categories", showCategoriesPage);

adminCategoriesRouter.get("/categories/refreshcategories", refreshCategories);


// 导出
module.exports = adminCategoriesRouter;