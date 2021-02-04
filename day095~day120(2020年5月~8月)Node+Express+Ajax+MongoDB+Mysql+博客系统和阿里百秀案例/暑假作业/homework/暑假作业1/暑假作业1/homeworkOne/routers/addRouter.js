const express = require('express');
const addRouter = express.Router();

// 引入控制器
let { showAddPage, addHero } = require('../controllers/addCtrl');

// 显示添加页
addRouter.get('/add', showAddPage);

// 添加英雄信息
addRouter.post('/add', addHero);

// 导出
module.exports = addRouter;