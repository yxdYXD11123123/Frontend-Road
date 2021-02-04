const express = require('express');
const indexRouter = express.Router();
// 引入控制器
let { showIndexPage, getAllHeros, likeSearch, deleteHero } = require('../controllers/indexCtrl');

// 显示首页
indexRouter.get('/', showIndexPage);

// 查询所有英雄信息
indexRouter.get('/findAllHeros', getAllHeros);

// 模糊查询英雄
indexRouter.post('/likeSearch', likeSearch);

// 删除英雄
indexRouter.delete('/deleteHero', deleteHero)

// 导出
module.exports = indexRouter;