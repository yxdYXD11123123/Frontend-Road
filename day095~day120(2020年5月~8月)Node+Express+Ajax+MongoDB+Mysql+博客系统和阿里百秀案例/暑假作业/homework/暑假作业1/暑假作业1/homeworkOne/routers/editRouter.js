const express = require('express');
const editRouter = express.Router();

// 引入控制器
const { editHeroInfo, showEditPage } = require('../controllers/editCtrl');

// 显示编辑页
editRouter.get('/edit', showEditPage);

// 编辑英雄信息
editRouter.post('/edit', editHeroInfo);

module.exports = editRouter;